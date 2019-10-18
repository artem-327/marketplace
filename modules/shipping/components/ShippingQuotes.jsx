import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import moment from 'moment/moment'
import { bool, objectOf, func } from 'prop-types'

import { Modal, Button, Segment, Divider, FormGroup, FormField, Table, Checkbox } from 'semantic-ui-react'
import { Form, Button as FButton, Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import Router from 'next/router'
import * as Yup from "yup";
import { errorMessages } from '~/constants/yupValidation'
import { getSafe } from '~/utils/functions'

const formValidation = () => Yup.object().shape({
  destination: Yup.object().shape({
    zip: Yup.string().trim()
      .min(3, errorMessages.minLength(3))
      .required(errorMessages.requiredMessage),
    quantity: Yup.string()
      .required(errorMessages.requiredMessage),
  })
})

export default class ShippingQuotes extends Component {
  state = {
    selectedIndex: null,
    sQuote: null,
    quantity: '',
    initialValues: {
      destination: {
        quantity: '',
        zip: '',
        maxTransit: 0
      }
    }
  }

  componentDidMount() {
    const { initShipingForm, defaultZip } = this.props

    this.setState({initialValues: {
      ...this.state.initialValues,
      destination: {
        ...this.state.initialValues.destination,
        zip: defaultZip
      }}
    })
    initShipingForm()
  }

  createOrder = async () => {
    let payload = {
      quantity: this.state.quantity,
      productOffer: this.state.sQuote.productOfferId
    }

    try {
      await this.props.addCartItem(payload)
      Router.push('/cart')
    } catch { }
  }

  getShipingQuotes(inputs) {
    const { productOfferIds, getShipingQuotes } = this.props
    const params = {
      productOfferIds: productOfferIds,
      destinationZIP: inputs.destination.zip,
      destinationCountry: 1,
      quantity: parseInt(inputs.destination.quantity),
      maxTransitDays: inputs.destination.maxTransit
    }
    getShipingQuotes(params)
  }

  renderForm() {
    const { loading, zipCodes } = this.props
    const { initialValues } = this.state

    return (
      <Form
        enableReinitialize
        ignoreLoading
        initialValues={initialValues}
        validationSchema={formValidation}
        onSubmit={(values, actions) => {
          this.getShipingQuotes(values)
        }}
      >
        <FormGroup widths='equal' data-test='ShippingQuotes_quantity_inp'>

          <Input
            name='destination.quantity' type='number' label='Shipping Quantity'
            inputProps={{ type: 'number', step: 1, min: 1, onChange: (_, { value }) => this.setState({ quantity: value }) }} />
          <Dropdown name='destination.zip' label='Zip Code' inputProps={{ search: true }} options={zipCodes} data-test='ShippingQuotes_zip_drpdn' />

          <Dropdown
            name='destination.maxTransit'
            label='Max Transit Time'
            options={[
              { value: 0, text: 'No limit' },
              { value: 2, text: '2 days' },
              { value: 3, text: '3 days' },
              { value: 5, text: '5 days' },
              { value: 7, text: '7 days' },
              { value: 14, text: '14 days' }
            ]}
            data-test='ShippingQuotes_maxTransit_drpdn'
          />
          <FormField>
            <label>&nbsp;</label>
            <Button type='submit' fluid loading={loading}
                    data-test='ShippingQuotes_calculate'>Calculate</Button>
          </FormField>
        </FormGroup>
        <div>
          {this.renderShipingQuotes()}
        </div>
      </Form>
    )
  }

  renderShipingQuotes() {
    const { loading } = this.props

    return (
      <Segment basic style={{ padding: 0 }} loading={loading}>
        <Table basic='very'>
          <Table.Header>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Vendor</Table.HeaderCell>
            <Table.HeaderCell>ETD</Table.HeaderCell>
            <Table.HeaderCell>Service Type</Table.HeaderCell>
            <Table.HeaderCell>FOB Price/lb</Table.HeaderCell>
            <Table.HeaderCell>Freight/lb</Table.HeaderCell>
            <Table.HeaderCell>Total Price/lb</Table.HeaderCell>
            <Table.HeaderCell>Total Freight</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {this.props.quotes.map((sQuote, i) => {
              let now = moment()
              let deliveryDate = sQuote.shipmentRate.estimatedDeliveryDate
              let etd = now.diff(deliveryDate, 'days') * -1 + 1

              return (
                <Table.Row key={i}>
                  <Table.Cell>
                    <Checkbox
                      radio
                      checked={this.state.selectedIndex === i}
                      onChange={() => this.setState({ selectedIndex: i, sQuote })}
                      value={i}
                      data-test={`ShippingQuotes_row_${i}_chckb`}
                    />
                  </Table.Cell>
                  <Table.Cell>{sQuote.shipmentRate.carrierName}</Table.Cell>
                  <Table.Cell>{etd + (etd == 1 ? ' Day' : ' Days')}</Table.Cell>
                  <Table.Cell>{sQuote.shipmentRate.serviceType}</Table.Cell>
                  <Table.Cell><NumberFormat
                    value={sQuote.shipmentRate.fobPricePerLb}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={','}
                    decimalSeparator={'.'}
                    decimalScale={2}
                    fixedDecimalScale={true} /></Table.Cell>
                  <Table.Cell><NumberFormat
                    value={sQuote.shipmentRate.freightPricePerLb}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={','}
                    decimalSeparator={'.'}
                    decimalScale={2}
                    fixedDecimalScale={true} /></Table.Cell>
                  <Table.Cell><NumberFormat
                    value={sQuote.shipmentRate.totalPricePerLb}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={','}
                    decimalSeparator={'.'}
                    decimalScale={2}
                    fixedDecimalScale={true} /></Table.Cell>
                  <Table.Cell className='a-right'><NumberFormat
                    value={sQuote.shipmentRate.estimatedPrice}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={','}
                    decimalSeparator={'.'}
                    decimalScale={2}
                    fixedDecimalScale={true} /></Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Segment>
    )
  }

  render() {
    const { closeModal } = this.props.modalProps

    return (
      <Modal closeIcon onClose={closeModal} centered={false} {...this.props.modalProps}>
        <Modal.Header>Shipping Quote</Modal.Header>
        <Modal.Content>
          {this.renderForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} data-test='ShippingQuotes_closeModal'>
            Close
          </Button>
          <Button loading={this.props.isPurchasing} disabled={!(this.state.quantity && this.state.sQuote)} primary onClick={this.createOrder} data-test='ShippingQuotes_createOrder'>
            Purchase
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ShippingQuotes.propTypes = {
  modalProps: objectOf({
    open: bool,
    centered: bool,
    closeModal: func
  })
}

ShippingQuotes.defaultProps = {
  modalProps: {
    open: false,
    centered: false
  }
}