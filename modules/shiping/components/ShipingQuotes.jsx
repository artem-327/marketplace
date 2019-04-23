import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import moment from 'moment/moment'

import { Modal, Button, Segment, Grid, Divider, FormGroup, FormField, Table, Checkbox } from 'semantic-ui-react'
import { Form, Button as FButton, Input, Dropdown } from 'formik-semantic-ui'

const initialValues = {
  destination: {
    quantity: 500,
    zip: '93308',
    maxTransit: 7
  }
}

class ShipingQuotes extends Component {

  componentDidMount() {
    const {initShipingForm} = this.props

    initShipingForm()
  }

  getShipingQuotes(inputs) {
    // if (checkToken(this.props)) return
    console.log(inputs)
    let params = {}
    params.productOfferIds = this.props.selectedRows
    params.destinationZIP = inputs.destination.zip
    params.destinationCountry = 1
    params.quantity = parseInt(inputs.destination.quantity)
    params.maxTransitDays = inputs.destination.maxTransit

    this.props.getShipingQuotes(params)
  }

  checkBox(value) {
    this.setState({ selectedItem: value })
  }

  renderForm() {
    const sQuotes = this.renderShipingQuotes()

    const { loading, zipCodes } = this.props

    return (
      <Form
        enableReinitialize
        ignoreLoading
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          this.getShipingQuotes(values)
        }}
      >
        <FormGroup widths="equal">

          <Input name="destination.quantity" type="number" label="Shipping Quantity" />
          <Dropdown name="destination.zip" label="Zip Code" inputProps={{search: true}} options={zipCodes} />

          <Dropdown
            name="destination.maxTransit"
            label="Max Transit Time"
            options={[
              { value: 0, text: 'No limit' },
              { value: 2, text: '2 days' },
              { value: 3, text: '3 days' },
              { value: 5, text: '5 days' },
              { value: 7, text: '7 days' },
              { value: 14, text: '14 days' }
            ]}
          />
          <FormField>
            <label>&nbsp;</label>
            <Button type="submit" fluid loading={loading}>Calculate</Button>
          </FormField>
        </FormGroup>

        <Divider />

        {sQuotes}
      </Form>
    )
  }

  renderShipingQuotes() {
    const { loading } = this.props

    return (
      <Segment basic style={{ padding: 0 }} loading={loading}>
        <Table basic="very">
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
                    <Checkbox onChange={(value) => this.checkBox(value)} value={i} />
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
                  <Table.Cell className="a-right"><NumberFormat
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
    return (
      <Modal open centered={false}>
        <Modal.Header>Shiping Quote</Modal.Header>
        <Modal.Content>
          {this.renderForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.removePopup}>
            Close
          </Button>
          <Button primary onClick={this.createOrder}>
            Purchase
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ShipingQuotes