import React, { Component } from 'react'
import { Button, Accordion, Segment, FormGroup, Icon } from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { DateInput } from '~/components/custom-formik'
import { filterPresets, operators, paths } from '../constants/filter'

import {
  FlexSidebar, FlexContent,
  AccordionTitle, GraySegment,
  AccordionItem, AccordionContent,
  // FiltersContainer, WhiteSegment, 
  // Title, BottomMargedDropdown,
  // LessPaddedRow, SaveFilterRow,
  // SaveFilterTitle, SaveFilterClose
} from '../constants/layout'
import { func, oneOf } from 'prop-types'
import moment from 'moment'

const RightAlignedDiv = styled.div`
  text-align: right !important;
`

const formatDate = (date) => moment(date).utc().format()

const initialValues = {
  orderFrom: {
    operator: operators.GREATER_THAN_OR_EQUAL_TO,
    path: paths.orders.orderDate,
    value: '',
    formatValue: formatDate

  },
  orderTo: {
    operator: operators.LESS_THAN_OR_EQUAL_TO,
    path: paths.orders.orderDate,
    value: '',
    formatValue: formatDate
  },

}

const validationSchema = {}

class OrderFilter extends Component {
  state = {
    inactiveAccordion: {}
  }


  toDatagrid = (values) => {
    let { sortDirection, sortPath } = this.props
    let payload = {
      filters: [],
      sortDirection, sortPath
    }

    Object.keys(values)
      .forEach((key) => {
        if (values[key].value) payload.filters.push({ operator: values[key].operator, path: values[key].path, values: values[key].formatValue ? values[key].formatValue([values[key].value]) : [values[key].value] })
      })

    if (!payload.sortDirection) delete payload.sortDirection
    if (!payload.sortPath) delete payload.sortPath

    this.props.onApply(payload)
  }

  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      <Icon name={!this.state.inactiveAccordion[name] ? 'chevron down' : 'chevron right'} color={!this.state.inactiveAccordion[name] ? 'blue' : 'black'} />
      {text}
    </AccordionTitle>
  )

  toggleAccordion = (name) => {
    let { inactiveAccordion } = this.state
    let inactive = inactiveAccordion[name]
    this.setState({ inactiveAccordion: { ...this.state.inactiveAccordion, [name]: !inactive } })
  }

  render() {
    let {
      ordersIsOpen, width,
      direction, animation,
      toggleFilter, intl: { formatMessage },
      ordersType } = this.props

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
            <FlexSidebar
              visible={ordersIsOpen}
              width={width}
              direction={direction}
              animation={animation}
              onHide={(e) => {
                // Workaround, close if you haven't clicked on calendar item or filter icon
                try {
                  if (e && (!(e.path[0] instanceof HTMLTableCellElement) && !(e.path[1] instanceof HTMLTableCellElement) && (!e.target || !e.target.className.includes('submenu-filter')))) {
                    toggleFilter(false)
                  }
                } catch (e) {
                  console.error(e)
                }
              }}>

              <FlexContent>
                <Accordion>
                  <Segment basic>
                    <AccordionItem>
                      {this.accordionTitle('orderDate', <FormattedMessage id='filter.orderDate' defaultMessage='!Order Date'>{text => text}</FormattedMessage>)}
                      <AccordionContent active={!this.state.inactiveAccordion.orderDate}>
                        <FormGroup widths='equal' data-test='filter_assay_inp'>
                          <DateInput
                            inputProps={{ fluid: true, placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                            label={<FormattedMessage id='global.from' defaultMessage='From' />} name='orderFrom.value' />
                          <DateInput
                            inputProps={{ fluid: true, placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                            label={<FormattedMessage id='global.to' defaultMessage='To' />} name='orderTo.value' />
                        </FormGroup>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                      {this.accordionTitle('vendor', <FormattedMessage id='global.vendor' defaultMessage='Vendor'>{text => text}</FormattedMessage>)}
                      <AccordionContent active={!this.state.inactiveAccordion.vendor}>
                        <FormGroup widths='equal' data-test='filter_assay_inp'>
                          <Input
                            inputProps={{ fluid: true, placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                            label={<FormattedMessage id='global.vendorName' defaultMessage='Vendor Name' />} name='vendor.value' />

                        </FormGroup>
                      </AccordionContent>
                    </AccordionItem>

                  </Segment>
                </Accordion>
              </FlexContent>

              <GraySegment basic>
                <RightAlignedDiv>
                  <Button type='button' onClick={() => toggleFilter(false, filterPresets.ORDERS)}>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{text => text}</FormattedMessage>
                  </Button>
                  <Button type='button' primary onClick={() => this.toDatagrid(values)}>
                    <FormattedMessage id='global.apply' defaultMessage='Apply'>{text => text}</FormattedMessage>
                  </Button>
                </RightAlignedDiv>
              </GraySegment>
            </FlexSidebar>
          )
        }} />
    )
  }
}

OrderFilter.propTypes = {
  onApply: func.isRequired,
  ordersType: oneOf(['sales', 'purchase'])
}

OrderFilter.defaultProps = {
  width: 'very wide',
  direction: 'right',
  animation: 'overlay',
  sortPath: '',
  sortDirection: '',
  ordersType: 'sales'
}

export default injectIntl(OrderFilter)