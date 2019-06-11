import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Form, Input, Checkbox as FormikCheckbox } from 'formik-semantic-ui'
import { Field as FormikField } from 'formik'
import { bool, string, object, func } from 'prop-types'
import { DateInput } from '~/components/custom-formik'
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

    Object.keys(inputs)
      .forEach((key) => {
        if (inputs[key]) {

          if (!!datagridValues[key].nested) {
            var values = []
            // If nested (checkboxes) take their id's and push them to an array
            Object.keys(inputs[key]).forEach(k => {
              if (inputs[key][k]) values.push(inputs[key][k])
            })

            if (values.length > 0) datagridFilter.filters.push(datagridValues[key].getFilter(values))
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
          setFieldValue(`${group}${el.name.toLowerCase()}`, data.checked ? el.id : null)
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

  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      <Icon name={this.state.accordion[name] ? 'chevron down' : 'chevron up'} color={this.state.accordion[name] ? 'blue' : 'black'} />
      {text}
    </AccordionTitle>
  )


  formMarkup = (values) => {
    let { productConditions, productForms, packagingTypes, productGradeTypes, intl, filterSaving } = this.props

    const { formatMessage } = intl

    let packagingTypesRows = this.generateCheckboxes(packagingTypes, 'packagingTypes')
    let productConditionRows = this.generateCheckboxes(productConditions, 'productConditions')
    let productGradeRows = this.generateCheckboxes(productGradeTypes, 'productGrades')
    let productFormsRows = this.generateCheckboxes(productForms, 'productForms')

    return (
      <Accordion>
        <Segment basic>

          <AccordionItem>
            {this.accordionTitle('chemicalType', <FormattedMessage id='filter.chemicalType' />)}
            <AccordionContent active={this.state.accordion.chemicalType}>
              {/* TODO SEARCH ! */}
              <Input fieldProps={{ width: 8 }} label={<FormattedMessage id='filter.ChemicalNameCAS' />} name='search' />
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
                    label={<FormattedMessage id='filter.From' defaultMessage='From' />}
                    inputProps={{ closeOnMouseLeave: false, animation: 'none' }} name='dateFrom' />
                </FormField>
                <FormField width={8}>
                  <DateInput
                    label={<FormattedMessage id='filter.To' defaultMessage='To' />}
                    inputProps={{ closeOnMouseLeave: false, animation: 'none' }} name='dateTo' />
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
                      name='notifications.notificationMail'/>
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
        // TODO handle calendar on click so it does not hide sidebar...
        // onHide={() => toggleFilter()}
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
              {({ submitForm, values }) => {
                this.submitForm = submitForm
                return this.formMarkup(values)
              }}
            </Form>
          </Segment>
        </FlexContent>

        <GraySegment basic>
          <Grid>
            <GridRow columns={2}>
              <GridColumn>
                {/* TODO Clear filter implementation */}
                <Button fluid> <FormattedMessage id='filter.clearFilter' defaultMessage='Clear Filter' /></Button>
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
  onSave: func
}

Filter.defaultProps = {
  isOpen: false,
  width: 'very wide',
  direction: 'right',
  animation: 'overlay',
  onApply: () => alert('onApply function not supplied!'),
  onSave: () => alert('onSave function not supplied!'),
  additionalSidebarProps: {}
}

export default injectIntl(Filter)