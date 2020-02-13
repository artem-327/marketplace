import React, { Component } from 'react'
import { Button, Accordion, Segment, FormGroup, Icon } from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { DateInput } from '~/components/custom-formik'
import { filterPresets, operators, paths, orderFilterDescription, datagridValues } from '../constants/filter'

import {
  FlexSidebar,
  FlexContent,
  AccordionTitle,
  GraySegment,
  AccordionItem,
  AccordionContent,
  TopButtons,
  BottomButtons
  // FiltersContainer, WhiteSegment,
  // Title, BottomMargedDropdown,
  // LessPaddedRow, SaveFilterRow,
  // SaveFilterTitle, SaveFilterClose
} from '../constants/layout'
import { func, oneOf } from 'prop-types'
import moment from 'moment'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'

const RightAlignedDiv = styled.div`
  text-align: right !important;
`

const formatDate = date => getStringISODate(date)

const initialValues = {
  orderFrom: {
    operator: operators.GREATER_THAN_OR_EQUAL_TO,
    path: paths.orders.orderDate,
    value: '',
    formatValue: value => [formatDate(value)]
  },
  orderTo: {
    operator: operators.LESS_THAN_OR_EQUAL_TO,
    path: paths.orders.orderDate,
    value: '',
    formatValue: value => [formatDate(value)]
  }
}

const validationSchema = {}

class OrderFilter extends Component {
  state = {
    inactiveAccordion: {}
  }

  componentWillUnmount() {
    this.props.applyFilter({ filters: [] })
  }

  toDatagrid = values => {
    let { sortDirection, sortPath, applyDatagridFilter } = this.props
    let payload = {
      filters: [],
      sortDirection,
      sortPath
    }

    Object.keys(values).forEach(key => {
      let input = values[key]
      if (input.value) {
        const inputValue = input.formatValue ? input.formatValue(input.value) : [input.value]
        payload.filters.push({
          operator: input.operator,
          path: input.path,
          values: inputValue,
          ...(inputValue
            ? {
                tagDescription: datagridValues[key].tagDescription(inputValue),
                valuesDescription: datagridValues[key].valuesDescription(inputValue)
              }
            : {})
        })
      }
    })

    if (!payload.sortDirection) delete payload.sortDirection
    if (!payload.sortPath) delete payload.sortPath
    this.props.applyFilter(payload) // ! ! tady je to jinak nez v My Inventory / Marketplace
    applyDatagridFilter(payload)
    this.props.onApply(payload)
  }

  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      {text}
      <Icon
        name={!this.state.inactiveAccordion[name] ? 'chevron down' : 'chevron right'}
        color={'blue'}
      />
    </AccordionTitle>
  )

  toggleAccordion = name => {
    let { inactiveAccordion } = this.state
    let inactive = inactiveAccordion[name]
    this.setState({ inactiveAccordion: { ...this.state.inactiveAccordion, [name]: !inactive } })
  }

  render() {
    let {
      ordersIsOpen,
      width,
      direction,
      animation,
      toggleFilter,
      intl: { formatMessage },
      ordersType
    } = this.props

    let sales = ordersType === 'sales'

    return (
      <Form
        enableReinitialize
        initialValues={{
          ...initialValues,
          vendor: {
            operator: operators.LIKE,
            path: sales ? paths.orders.vendorSales : paths.orders.vendorPurchase,
            value: ''
          }
        }}
        render={({ values }) => {
          return (
            <FlexSidebar>
              <FlexContent>
                <Accordion>
                  <AccordionItem>
                    {this.accordionTitle(
                      'orderDate',
                      <FormattedMessage id='filter.orderDate' defaultMessage='Order Date'>
                        {text => text}
                      </FormattedMessage>
                    )}
                    <AccordionContent active={!this.state.inactiveAccordion.orderDate}>
                      <FormGroup widths='equal' data-test='filter_assay_inp'>
                        <DateInput
                          inputProps={{
                            fluid: true,
                            placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }),
                            clearable: true
                          }}
                          label={<FormattedMessage id='global.from' defaultMessage='From' />}
                          name='orderFrom.value'
                        />
                        <DateInput
                          inputProps={{
                            fluid: true,
                            placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }),
                            clearable: true
                          }}
                          label={<FormattedMessage id='global.to' defaultMessage='To' />}
                          name='orderTo.value'
                        />
                      </FormGroup>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem>
                    {this.accordionTitle(
                      'vendor',
                      <FormattedMessage id='global.vendor' defaultMessage='Vendor'>
                        {text => text}
                      </FormattedMessage>
                    )}
                    <AccordionContent active={!this.state.inactiveAccordion.vendor}>
                      <FormGroup widths='equal' data-test='filter_assay_inp'>
                        <Input
                          inputProps={{
                            fluid: true,
                            placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                          }}
                          label={<FormattedMessage id='global.vendorName' defaultMessage='Vendor Name' />}
                          name='vendor.value'
                        />
                      </FormGroup>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </FlexContent>

              <GraySegment basic>
                <RightAlignedDiv>
                  <Button
                    type='button'
                    onClick={() => {
                      toggleFilter(false, filterPresets.ORDERS)
                    }}
                    data-test='filter_clear'>
                    <FormattedMessage id='filter.clearFilter' defaultMessage='Clear'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                  <Button type='button' primary onClick={() => this.toDatagrid(values)}>
                    <FormattedMessage id='global.apply' defaultMessage='Apply'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </RightAlignedDiv>
              </GraySegment>
            </FlexSidebar>
          )
        }}
      />
    )
  }
}

OrderFilter.propTypes = {
  onApply: func.isRequired,
  onClear: func,
  ordersType: oneOf(['sales', 'purchase'])
}

OrderFilter.defaultProps = {
  width: 'very wide',
  direction: 'right',
  animation: 'overlay',
  sortPath: '',
  sortDirection: '',
  ordersType: 'sales',
  onApply: filter => {},
  onClear: () => {},
}

export default injectIntl(OrderFilter)
