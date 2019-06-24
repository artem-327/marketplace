import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Form, Input, Checkbox as FormikCheckbox, } from 'formik-semantic-ui'
import { Field as FormikField } from 'formik'
import { bool, string, object, func, array } from 'prop-types'
import { debounce } from 'lodash'
import { DateInput } from 'semantic-ui-calendar-react'
import {
  Button, Accordion,
  Segment, FormGroup,
  Icon, FormField,
  Checkbox, Grid,
  GridRow, GridColumn,
  Dropdown
} from 'semantic-ui-react'

import { datagridValues } from '../constants/filter'
import { initialValues, validationSchema } from '../constants/validation'

import SavedFilters from './SavedFilters'
import Notifications from './Notifications'


import {
  FlexSidebar, FlexContent,
  FiltersContainer, AccordionTitle,
  AccordionItem, AccordionContent,
  GraySegment, Title,
  RelaxedRow
} from '../constants/layout'

class Filter extends Component {

  state = {
    savedFiltersActive: false,
    accordion: {
      chemicalType: true
    },
    searchQuery: '',
    isTyping: false
  }

  componentDidMount() {
    const {
      fetchProductConditions,
      fetchProductForms,
      fetchPackagingTypes,
      fetchWarehouseDistances,
      fetchProductGrade
    } = this.props

    Promise.all([
      this.fetchIfNoData(fetchProductConditions, 'productConditions'),
      this.fetchIfNoData(fetchProductForms, 'productForms'),
      this.fetchIfNoData(fetchPackagingTypes, 'packagingTypes'),
      this.fetchIfNoData(fetchWarehouseDistances, 'warehouseDistances'),
      this.fetchIfNoData(fetchProductGrade, 'productGradeTypes')
    ]).finally(() => this.setState({ loaded: true }))
  }

  generateDatagridFilter = (inputs) => {
    let datagridFilter = {
      filters: []
    }

    let keys = Object.keys(inputs)

    keys.forEach((key) => {
      if (inputs[key]) {

        if (!!datagridValues[key].nested) {
          var ids = [], names = []
          // If nested (checkboxes) take their id's and push them to an array
          Object.keys(inputs[key]).forEach(k => {
            if (inputs[key][k]) {
              ids.push(inputs[key][k].id)
              names.push((inputs[key][k].name))
            }
          })

          if (ids.length > 0) datagridFilter.filters.push(datagridValues[key].getFilter(ids, names))
        }
        else {
          try {
            let filter = datagridValues[key].getFilter(inputs[key])
            if (!(filter.values instanceof Array)) filter.values = [filter.values]  // We need values to be an array

            datagridFilter.filters.push(filter)
          } catch (err) {
            console.error(`Key: ${key} is not defined in datagridValues. \n ${err}`)
          }
        }
      }
    })

    return datagridFilter
  }

  handleSubmit = ({ notifications, checkboxes, name, ...rest }) => { // { setSubmitting }
    let { onApply } = this.props

    onApply(this.generateDatagridFilter(rest))
  }

  handleFilterSave = ({ notifications, checkboxes, name, ...rest }) => {
    let dataGridFilter = this.generateDatagridFilter(rest)

    let { notificationMail, notificationPhone } = notifications
    let { notifyMail, notifyPhone, notifySystem, automaticallyApply } = checkboxes

    let requestData = {
      dataGridFilter,
      name,
      notificationEnabled: notifyMail || notifyPhone || notifySystem,
      // notificationPhone not supported by BE, but I guess it should be, may have different property name if implemented
      notificationMail, notificationPhone,
      notifyMail, notifyPhone, notifySystem
    }

    this.props.saveFilter(this.props.savedUrl, requestData)
    if (automaticallyApply) this.props.onApply(this.generateDatagridFilter(rest))
  }

  fetchIfNoData = (fn, propertyName) => {
    return new Promise((resolve) => {
      if (!this.props[propertyName] || this.props[propertyName].length === 0) return fn()
      else resolve()
    })
  }

  toggleFilter = savedFiltersActive => {
    if (this.state.savedFiltersActive !== savedFiltersActive)
      this.setState({ savedFiltersActive })
  }

  generateCheckboxes = (data, values, groupName = null) => {
    if (!data) return []
    let group = null

    if (groupName) group = `${groupName}.`

    let tmp = []
    var getCheckbox = (el, i) => {
      let name = el.name.toLowerCase().replace(/ /g, '')
      let path = `${group}${name}`

      return (
        <FormField key={i}>
          <FormikField
            onChange={(e, data) => {
              let { setFieldValue } = data.form
              setFieldValue(path, data.checked ? { id: el.id, name: el.name } : null)
            }}
            component={Checkbox}
            checked={!!values[groupName] && values[groupName][name]}
            name={path} label={el.name} />
        </FormField>
      )
    }

    for (let i = 0; i < (data.length / 2 - data.length % 2); i++) {
      tmp.push(
        <FormGroup widths='equal'>
          {/* First/Last Item Increasing/Decreasing according to index */}
          {[data[i], data[data.length - (i + 1)]].map((el, j) => getCheckbox(el, i + j))}
        </FormGroup>
      )
    }

    // Add last item, which is at index = middle of an array
    if (data.length % 2 === 1) {
      tmp.push(<FormGroup widths='equal'>{getCheckbox(data[Math.round(data.length / 2) - 1])}</FormGroup>)
    }


    return tmp
  }

  toggleAccordion = (name) => {
    let { accordion } = this.state
    let active = !!accordion[name]
    this.setState({ accordion: { ...this.state.accordion, [name]: !active } })
  }

  handleSearch = debounce(({ searchQuery, name }) => {
    if (searchQuery.length > 1) this.props.getAutocompleteData(this.props.searchUrl(searchQuery))
  }, 250)


  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      <Icon name={this.state.accordion[name] ? 'chevron up' : 'chevron right'} color={this.state.accordion[name] ? 'blue' : 'black'} />
      {text}
    </AccordionTitle>
  )




  formMarkup = ({ values, setFieldValue, errors, setFieldError }) => {
    let {
      productConditions, productForms, packagingTypes,
      productGradeTypes, intl, isFilterSaving,
      autocompleteData, autocompleteDataLoading
    } = this.props

    const { formatMessage } = intl

    let packagingTypesRows = this.generateCheckboxes(packagingTypes, values, 'packagingTypes')
    let productConditionRows = this.generateCheckboxes(productConditions, values, 'productConditions')
    let productGradeRows = this.generateCheckboxes(productGradeTypes, values, 'productGrades')
    let productFormsRows = this.generateCheckboxes(productForms, values, 'productForms')

    var noResultsMessage = null

    if (this.state.searchQuery.length <= 1) noResultsMessage = <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search...' />
    if (autocompleteDataLoading) noResultsMessage = <FormattedMessage id='global.loading' defaultMessage='Loading' />

    let dropdownProps = {
      search: true,
      selection: true,
      multiple: true,
      fluid: true,
      options: autocompleteData.map((product) => {
        if (product.casNumberCombined) var text = `${product.productName} (${product.casNumberCombined})`
        else var text = product.productName

        return {
          key: product.id,
          text,
          value: JSON.stringify({ id: product.id, name: product.productName, casNumberCombined: product.casNumberCombined || null }),
        }
      }),
      label: <FormattedMessage id='filter.ChemicalNameCAS' />,
      loading: autocompleteDataLoading,
      name: 'search',
      placeholder: <FormattedMessage id='filter.searchProducts' defaultMessage='Search Products' />,
      noResultsMessage,
      onSearchChange: (_, data) => {
        this.handleSearch(data)
      },
      value: values.search,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null),
    }

    if (!autocompleteDataLoading) dropdownProps.icon = null

    return (
      <Accordion>
        <Segment basic>
          <AccordionItem>
            {this.accordionTitle('chemicalType', <FormattedMessage id='filter.chemicalType' />)}
            <AccordionContent active={this.state.accordion.chemicalType}>
              <Dropdown {...dropdownProps} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('quantity', <FormattedMessage id='filter.quantity' />)}
            <AccordionContent active={this.state.accordion.quantity}>
              <FormGroup widths='equal'>
                <Input inputProps={{
                  type: 'number',
                  placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                }}
                  label={<FormattedMessage id='filter.FromQuantity' defaultMessage='From' />}
                  name='quantityFrom' />
                <Input inputProps={{
                  type: 'number',
                  placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                }}
                  label={<FormattedMessage id='filter.ToQuantity' defaultMessage='To' />}
                  name='quantityTo' />
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('price', <FormattedMessage id='filter.price' />)}
            <AccordionContent active={this.state.accordion.price}>
              <FormGroup>
                <FormField width={8}>

                  <Input inputProps={{
                    label: this.props.preferredCurrency,
                    labelPosition: 'left',
                    type: 'number',
                    step: 0.01,
                    placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                  }}
                    label={<FormattedMessage id='filter.FromPrice' defaultMessage='From Price' />}
                    name='priceFrom' />
                </FormField>

                <FormField width={8}>
                  <Input inputProps={{
                    label: this.props.preferredCurrency,
                    labelPosition: 'left',
                    type: 'number',
                    step: 0.01,
                    placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                  }}
                    label={<FormattedMessage id='filter.ToPrice' defaultMessage='To Price' />}
                    name='priceTo' />
                </FormField>
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('packaging', <FormattedMessage id='filter.packaging' />)}
            <AccordionContent active={this.state.accordion.packaging}>
              {packagingTypesRows}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('productGrades', <FormattedMessage id='filter.grade' defaultMessage='Grade' />)}
            <AccordionContent active={this.state.accordion.productGrades}>
              {productGradeRows}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('condition', <FormattedMessage id='filter.condition' defaultMessage='Condition' />)}
            <AccordionContent active={this.state.accordion.condition}>
              {productConditionRows}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('productForms', <FormattedMessage id='filter.form' defaultMessage='Form' />)}
            <AccordionContent active={this.state.accordion.productForms}>
              {productFormsRows}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('expiration', <FormattedMessage id='filter.expiration' defaultMessage='Expiration' />)}
            <AccordionContent active={this.state.accordion.expiration}>
              <FormGroup widths='equal'>
                <FormField error={errors.dateFrom} width={8}>
                  <DateInput
                    onChange={(e, { name, value }) => setFieldValue(name, value)}
                    closable
                    inputProps={{ placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                    value={values.dateFrom}
                    closeOnMouseLeave={false}
                    dateFormat='YYYY-MM-DD'
                    animation='none'
                    label={<label><FormattedMessage id='filter.dateFrom' defaultMessage='Date From' /></label>}
                    name='dateFrom' />
                  {errors.dateFrom && <span className='sui-error-message'>{errors.dateFrom}</span>}
                </FormField>
                <FormField error={errors.dateTo} width={8}>
                  <DateInput
                    onChange={(e, { name, value }) => setFieldValue(name, value)}
                    closable
                    inputProps={{ placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                    value={values.dateTo}
                    dateFormat='YYYY-MM-DD'
                    animation='none'
                    closeOnMouseLeave={false}
                    label={<label><FormattedMessage id='filter.dateTo' defaultMessage='Date To' /></label>}
                    name='dateTo' />
                  {errors.dateTo && <span className='sui-error-message'>{errors.dateTo}</span>}
                </FormField>
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('assay', <FormattedMessage id='filter.assay' />)}
            <AccordionContent active={this.state.accordion.assay}>
              <FormGroup widths='equal'>
                <Input
                  inputProps={{ type: 'number', placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                  label={<FormattedMessage id='filter.Minimum(%)' defaultMessage='Minimum' />} name='assayFrom' />
                <Input
                  inputProps={{ type: 'number', placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                  label={<FormattedMessage id='filter.Maximum(%)' defaultMessage='Maximum' />} name='assayTo' />
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <Grid verticalAlign='top'>

            {/* Save Filter */}
            <GridRow>
              <GridColumn>
                <Title><FormattedMessage id='filter.saveFilter' defaultMessage='Save Filter' /></Title>
              </GridColumn>
            </GridRow>

            <RelaxedRow>
              <GridColumn>
                <label> <FormattedMessage id='filter.enterFilterName' defaultMessage='Enter Filter Name' /></label>
              </GridColumn>
            </RelaxedRow>

            <GridRow>
              <GridColumn computer={12}>
                <Input name='name' fluid />
              </GridColumn>

              <GridColumn>
                <Button onClick={(e) => {
                  e.preventDefault()
                  if (!values.name) setFieldError('name', <FormattedMessage id='validation.required' />)
                  else this.handleFilterSave(values)
                }} positive basic loading={isFilterSaving}>Save</Button>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn>
                <FormikCheckbox
                  label={formatMessage({ id: 'filter.automaticallyApply', defaultMessage: 'Automatically apply' })}
                  name='checkboxes.automaticallyApply'
                />
              </GridColumn>
            </GridRow>
            <Notifications values={values} />
          </Grid>
        </Segment>
      </Accordion >
    )
  }

  render() {
    let {
      isOpen,
      width,
      direction,
      animation,
      additionalSidebarProps,
      isFilterApplying
    } = this.props

    const {
      toggleFilter
    } = this.props

    return (
      <FlexSidebar
        visible={isOpen}
        width={width}
        direction={direction}
        animation={animation}
        onHide={(e) => {
          // Workaround, close if you haven't clicked on calendar item or filter icon
          if (e && (!(e.path[0] instanceof HTMLTableCellElement) && !(e.path[1] instanceof HTMLTableCellElement) && !e.target.className.includes('submenu-filter'))) {
            toggleFilter(false)
          }
        }}
        {...additionalSidebarProps}>

        <FlexContent>
          <Segment basic>
            <FiltersContainer>
              <Button onClick={() => this.toggleFilter(false)} primary={!this.state.savedFiltersActive}>
                <FormattedMessage
                  id='filter.setFilters'
                  defaultMessage='SET FILTERS'
                />
              </Button>

              <Button onClick={() => this.toggleFilter(true)} primary={this.state.savedFiltersActive}>
                <FormattedMessage
                  id='filter.savedFilter'
                  defaultMessage='SAVED FILTERS'
                />
              </Button>
            </FiltersContainer>
            <Form
              enableReinitialize={true}
              initialValues={initialValues}
              validateOnChange={true}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                this.handleSubmit(values)
                setSubmitting(false)
              }}>
              {(props) => {
                this.submitForm = props.submitForm
                this.resetForm = props.resetForm
                this.setFieldValue = props.setFieldValue

                return (
                  !this.state.savedFiltersActive && this.formMarkup(props)
                )
              }}
            </Form>
            {this.state.savedFiltersActive &&
              <SavedFilters
                savedFilters={this.props.savedFilters}
                savedFiltersLoading={this.props.savedFiltersLoading}
                getSavedFilters={() => this.props.getSavedFilters(this.props.savedUrl)} />
            }
          </Segment>
        </FlexContent>

        <GraySegment basic>
          <Grid>
            <GridRow columns={2}>
              <GridColumn>
                <Button fluid onClick={(e, data) => {
                  this.resetForm({ ...initialValues })
                  toggleFilter(false)
                  this.props.onClear(e, data)
                }}> <FormattedMessage id='filter.clearFilter' defaultMessage='Clear Filter' /></Button>
              </GridColumn>
              <GridColumn>
                <Button loading={isFilterApplying}
                  primary fluid
                  onClick={() => this.submitForm()}>
                  <FormattedMessage id='global.apply' defaultMessage='Apply' />
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </GraySegment>
      </FlexSidebar>
    )
  }
}

Filter.propTypes = {
  isOpen: bool,
  width: string,
  direction: string,
  animation: string,
  additionalSidebarProps: object,
  onApply: func,
  onClear: func,
  filters: array,
  getAutocompleteData: func,
  autocompleteData: array,
  savedFilters: array,
  getSavedFilters: func,
  savedFiltersLoading: bool,
  savedUrl: string,
  searchUrl: func
}

Filter.defaultProps = {
  isOpen: false,
  width: 'very wide',
  direction: 'right',
  animation: 'overlay',
  additionalSidebarProps: {},
  filters: [],
  onApply: () => console.warn('onApply function not supplied!'),
  onClear: () => console.warn('onClear function not supplied!'),
  getAutocompleteData: (searchUrl, text) => console.warn('getAutocompleteData not supplied!'),
  autocompleteData: [],
  savedFilters: [],
  getSavedFilters: console.warn('getSavedFilters function not supplied!'),
  savedFiltersLoading: false

}

export default injectIntl(Filter)