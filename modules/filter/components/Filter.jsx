import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Form, Input, Checkbox as FormikCheckbox, Dropdown } from 'formik-semantic-ui'
import { Field as FormikField } from 'formik'
import { bool, string, object, func, array } from 'prop-types'
import { debounce } from 'lodash'
import { DateInput } from 'semantic-ui-calendar-react' //'~/components/custom-formik'
import {
  Button, Accordion,
  Segment, FormGroup,
  Icon, FormField,
  Checkbox, Grid,
  GridRow, GridColumn,
  Input as SemanticInput
} from 'semantic-ui-react'

import { datagridValues } from '../constants/filter'
import { initialValues } from '../constants/validation'

import {
  FlexSidebar, FlexContent,
  FiltersContainer, AccordionTitle,
  AccordionItem, AccordionContent,
  GraySegment, Title,
  RelaxedRow
} from '../constants/layout'

const countryOptions = [
  { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  { key: 'bm', value: 'bm', flag: 'bm', text: 'Bermuda' },
  { key: 'bt', value: 'bt', flag: 'bt', text: 'Bhutan' },
  { key: 'bo', value: 'bo', flag: 'bo', text: 'Bolivia' },
  { key: 'ba', value: 'ba', flag: 'ba', text: 'Bosnia' },
  { key: 'bw', value: 'bw', flag: 'bw', text: 'Botswana' },
  { key: 'bv', value: 'bv', flag: 'bv', text: 'Bouvet Island' },
  { key: 'br', value: 'br', flag: 'br', text: 'Brazil' },
  { key: 'vg', value: 'vg', flag: 'vg', text: 'British Virgin Islands' },
  { key: 'bn', value: 'bn', flag: 'bn', text: 'Brunei' },
  { key: 'bg', value: 'bg', flag: 'bg', text: 'Bulgaria' },
  { key: 'bf', value: 'bf', flag: 'bf', text: 'Burkina Faso' },
  { key: 'bi', value: 'bi', flag: 'bi', text: 'Burundi' },
  { key: 'tc', value: 'tc', flag: 'tc', text: 'Caicos Islands' },
  { key: 'kh', value: 'kh', flag: 'kh', text: 'Cambodia' },
  { key: 'cm', value: 'cm', flag: 'cm', text: 'Cameroon' },
  { key: 'ca', value: 'ca', flag: 'ca', text: 'Canada' },
]


class Filter extends Component {

  state = {
    savedFiltersActive: false,
    accordion: {}
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
    console.log({rest})
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

    this.props.onSave(requestData)
    if (automaticallyApply) this.handleSubmit(rest)
  }

  fetchIfNoData = (fn, propertyName) => {
    return new Promise((resolve) => {
      if (!this.props[propertyName] || this.props[propertyName].length === 0) return fn()
      else resolve()
    })
  }

  toggleFilter = () => {
    let { savedFiltersActive } = this.state
    this.setState({ savedFiltersActive: !savedFiltersActive })
  }

  generateCheckboxes = (data, groupName = null) => {
    if (!data) return []
    let group = null

    if (groupName) group = `${groupName}.`

    let tmp = []
    var getCheckbox = (el, i) => (
      <FormField key={i}>
        <FormikField onChange={(e, data) => {
          let { setFieldValue } = data.form
          setFieldValue(`${group}${el.name.toLowerCase()}`, data.checked ? { id: el.id, name: el.name } : null)
        }} component={Checkbox} name={`${group}${el.name.toLowerCase()}`} label={el.name} />
      </FormField>
    )

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
    if (searchQuery.length > 3) this.props.searchProducts(searchQuery)
  }, 250)

  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      <Icon name={this.state.accordion[name] ? 'chevron down' : 'chevron up'} color={this.state.accordion[name] ? 'blue' : 'black'} />
      {text}
    </AccordionTitle>
  )


  formMarkup = (values, setFieldValue) => {
    let {
      productConditions, productForms, packagingTypes,
      productGradeTypes, intl, filterSaving,
      searchedProducts, searchedProductsLoading
    } = this.props

    const { formatMessage } = intl

    let packagingTypesRows = this.generateCheckboxes(packagingTypes, 'packagingTypes')
    let productConditionRows = this.generateCheckboxes(productConditions, 'productConditions')
    let productGradeRows = this.generateCheckboxes(productGradeTypes, 'productGrades')
    let productFormsRows = this.generateCheckboxes(productForms, 'productForms')

    let dropdownInputProps = {
      search: true,
      selection: true,
      multiple: true,
      loading: searchedProductsLoading,
      onSearchChange: (_, data) => this.handleSearch(data),
      onChange: () => console.log('onChange')
    }

    if (!searchedProductsLoading) dropdownInputProps.icon = null

    return (
      <Accordion>
        <Segment basic>

          <AccordionItem>
            {this.accordionTitle('chemicalType', <FormattedMessage id='filter.chemicalType' />)}
            <AccordionContent active={this.state.accordion.chemicalType}>
              <Dropdown
                inputProps={dropdownInputProps}
                fieldProps={{ width: 16 }}
                fluid
                options={searchedProducts.map((product) => ({
                  key: product.id,
                  text: product.name,
                  value: { id: product.id, name: product.name }
                }))}
                label={<FormattedMessage id='filter.ChemicalNameCAS' />}
                name='search' />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('quantity', <FormattedMessage id='filter.quantity' />)}
            <AccordionContent active={this.state.accordion.quantity}>
              <FormGroup widths='equal'>
                <Input type='number' label={<FormattedMessage id='filter.FromQuantity' defaultMessage='From Quantity' />} name='quantityFrom' />
                <Input type='number' label={<FormattedMessage id='filter.ToQuantity' defaultMessage='To Quantity' />} name='quantityTo' />
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('price', <FormattedMessage id='filter.price' />)}
            <AccordionContent active={this.state.accordion.price}>
              <FormGroup widths='equal'>
                <Input type='number' label={<FormattedMessage id='filter.FromPrice' defaultMessage='From Price' />} name='priceFrom' />
                <Input type='number' label={<FormattedMessage id='filter.ToPrice' defaultMessage='To Price' />} name='priceTo' />
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
                <FormField width={8}>
                  <DateInput
                    onChange={(e, { name, value }) => setFieldValue(name, value)}
                    closable
                    value={values.dateFrom}
                    closeOnMouseLeave={false}
                    dateFormat='DD-MM-YYYY'
                    animation='none'
                    label={<FormattedMessage id='filter.From' defaultMessage='From' />}
                    name='dateFrom' />
                </FormField>
                <FormField width={8}>
                  <DateInput
                    onChange={(e, { name, value }) => setFieldValue(name, value)}
                    closable
                    value={values.dateTo}
                    dateFormat='DD-MM-YYYY'
                    animation='none'
                    closeOnMouseLeave={false}
                    label={<FormattedMessage id='filter.To' defaultMessage='To' />}
                    name='dateTo' />
                </FormField>
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('assay', <FormattedMessage id='filter.assay' />)}
            <AccordionContent active={this.state.accordion.assay}>
              <FormGroup widths='equal'>
                <Input type='number' label={<FormattedMessage id='filter.Minimum(%)' defaultMessage='Minimum' />} name='assayFrom' />
                <Input type='number' label={<FormattedMessage id='filter.Maximum(%)' defaultMessage='Maximum' />} name='assayTo' />
              </FormGroup>
            </AccordionContent>
          </AccordionItem>


          <Grid verticalAlign='middle'>

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

              <Button onClick={(e) => {
                e.preventDefault()
                this.handleFilterSave(values)
              }} positive basic loading={filterSaving}>Save</Button>
            </GridRow>

            <GridRow>
              <GridColumn>
                <FormikCheckbox
                  label={formatMessage({ id: 'filter.automaticallyApply', defaultMessage: 'Automatically apply' })}
                  name='checkboxes.automaticallyApply'
                />
              </GridColumn>
            </GridRow>

            {/* Notifications content */}
            <GridRow>
              <GridColumn computer={7}>
                <FormikCheckbox
                  name='checkboxes.notifyMail'
                  label={formatMessage({ id: 'filter.notifications.email', defaultMessage: 'Email Notifications:' })} />
              </GridColumn>
              {
                values.checkboxes && values.checkboxes.notifyMail && (
                  <GridColumn computer={9}>
                    <Input
                      fluid
                      inputProps={{ placeholder: ' Email' }}
                      type='text'
                      name='notifications.notificationMail' />
                  </GridColumn>
                )
              }
            </GridRow>

            <GridRow>
              <GridColumn computer={7}>
                <FormikCheckbox
                  name='checkboxes.notifyPhone'
                  label={formatMessage({ id: 'filter.notifications.mobile', defaultMessage: 'Mobile Notifications:' })} />
              </GridColumn>
              {
                values.checkboxes && values.checkboxes.notifyPhone && (
                  <GridColumn computer={9}>
                    <Input
                      fluid
                      type='text'
                      name='notifications.notificationPhone'
                      inputProps={{ placeholder: ' Phone Number' }} />
                  </GridColumn>
                )
              }
            </GridRow>
            <GridRow>
              <GridColumn>
                <FormikCheckbox
                  name='checkboxes.notifySystem'
                  label={formatMessage({ id: 'filter.notifications.system', defaultMessage: 'System Notifications:' })} />
              </GridColumn>
            </GridRow>
          </Grid>
        </Segment>
      </Accordion>
    )
  }

  render() {
    let {
      isOpen,
      width,
      direction,
      animation,
      additionalSidebarProps,
      filterApplying
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
              <Button onClick={this.toggleFilter} primary={!this.state.savedFiltersActive}>
                <FormattedMessage
                  id='filter.setFilters'
                  defaultMessage='SET FILTERS'
                />
              </Button>

              <Button onClick={this.toggleFilter} primary={this.state.savedFiltersActive}>
                <FormattedMessage
                  id='filter.savedFilter'
                  defaultMessage='SAVED FILTERS'
                />
              </Button>
            </FiltersContainer>
            <Form initialValues={initialValues} onSubmit={(values, { setSubmitting }) => {
              this.handleSubmit(values)
              setSubmitting(false)
            }}>
              {({ submitForm, values, setFieldValue }) => {
                this.submitForm = submitForm
                return this.formMarkup(values, setFieldValue)
              }}
            </Form>
          </Segment>
        </FlexContent>

        <GraySegment basic>
          <Grid>
            <GridRow columns={2}>
              <GridColumn>
                <Button fluid onClick={this.props.onClear}> <FormattedMessage id='filter.clearFilter' defaultMessage='Clear Filter' /></Button>
              </GridColumn>
              <GridColumn>
                <Button loading={filterApplying} primary fluid onClick={() => this.submitForm()}><FormattedMessage id='global.apply' defaultMessage='Apply' /></Button>
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
  onSave: func,
  onClear: func,
  searchProducts: func,
  searchedProducts: array
}

Filter.defaultProps = {
  isOpen: false,
  width: 'very wide',
  direction: 'right',
  animation: 'overlay',
  additionalSidebarProps: {},
  onApply: () => alert('onApply function not supplied!'),
  onSave: () => alert('onSave function not supplied!'),
  onClear: () => alert('onClear function not supplied!'),
  searchProducts: () => alert('searchProducts not supplied!'),
  searchedProducts: [],
}

export default injectIntl(Filter)