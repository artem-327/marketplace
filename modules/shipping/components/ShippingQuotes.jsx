import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import moment from 'moment/moment'
import { bool, objectOf, func, array } from 'prop-types'

import { Modal, Button, Segment, Divider, FormGroup, FormField, Table, Checkbox } from 'semantic-ui-react'
import { Form, Button as FButton, Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import Router from 'next/router'
import * as Yup from 'yup'
import { errorMessages, quantityValidation } from '~/constants/yupValidation'
import { getSafe } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'
import { currency } from '~/constants/index'
import { FormattedNumber } from 'react-intl'
import styled from 'styled-components'
import { debounce } from 'lodash'

const CustomHr = styled.hr`
  opacity: 0.4;
`

const formValidation = (min, split) =>
  Yup.object().shape({
    destination: Yup.object().shape({
      zip: Yup.string()
        .trim()
        .min(3, errorMessages.minLength(3))
        .required(errorMessages.requiredMessage),
      quantity: quantityValidation(min, split)
    })
  })

export default class ShippingQuotes extends Component {
  state = {
    selectedIndex: null,
    sQuote: null,
    quantity: 1,
    min: 1,
    split: 1,
    country: 0,
    initialValues: {
      destination: {
        quantity: 1,
        zip: '',
        country: 1,
        maxTransit: -1
      }
    },
    allZips: []
  }

  componentDidMount() {
    const { initShipingForm, defaultZip, defaultCountry, zipCodes, getCountries } = this.props
    getCountries()
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        destination: {
          ...this.state.initialValues.destination,
          zip: defaultZip,
          country: defaultCountry
        }
      },
      allZips: zipCodes.some(zipObj => zipObj.value === defaultZip)
        ? [...zipCodes]
        : [...zipCodes, { value: defaultZip, text: defaultZip, key: new Date().getTime() }]
    })
    initShipingForm()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { defaultZip, defaultCountry, zipCodes } = this.props
    if (!prevProps.modalProps.open && this.props.modalProps.open) {
      this.setState({
        selectedIndex: null,
        sQuote: null,
        min: 1,
        split: 1,
        initialValues: {
          destination: {
            quantity: 1,
            maxTransit: -1,
            zip: defaultZip,
            country: defaultCountry
          }
        },
        allZips: zipCodes.some(zipObj => zipObj.value === defaultZip)
          ? [...zipCodes]
          : [...zipCodes, { value: defaultZip, text: defaultZip, key: new Date().getTime() }]
      })
      this.props.clearShippingQuotes()
    }

    if (prevProps.zipCodes !== this.props.zipCodes || this.state.country !== prevState.country) {
      const { defaultZip, defaultCountry, zipCodes } = this.props

      this.setState({
        allZips:
          this.state.country === defaultCountry && !zipCodes.some(zipObj => zipObj.value === defaultZip)
            ? [...zipCodes, { value: defaultZip, text: defaultZip, key: new Date().getTime() }]
            : [...zipCodes]
      })
    }
  }

  createOrder = async () => {
    let payload = {
      pkgAmount: Number(this.state.quantity),
      productOffer: this.state.sQuote.productOfferId
    }

    try {
      await this.props.addCartItem(payload)
      Router.push('/cart')
    } catch {}
  }

  getShipingQuotes = async (inputs, setFieldTouched) => {
    const { productOfferIds, getShipingQuotes } = this.props
    const params = {
      productOfferIds: productOfferIds,
      destinationZIP: inputs.destination.zip,
      destinationCountry: inputs.destination.country,
      quantity: parseInt(inputs.destination.quantity),
      maxTransitDays: inputs.destination.maxTransit
    }
    getShipingQuotes(params)
    await this.setState({ selectedIndex: null, sQuote: null, min: 1, split: 1 })
    setFieldTouched('destination.quantity', true, true)
  }

  handleQuoteSelect = async (i, sQuote, setFieldTouched) => {
    const { productOffersSelected } = this.props
    const po = productOffersSelected[i]

    await this.setState({
      selectedIndex: i,
      sQuote,
      split: po.split,
      min: po.min
    })
    setFieldTouched('destination.quantity', true, true)
  }

  handleSearchZipCode = debounce(({ searchQuery }, country) => {
    const queryParams = searchQuery
      ? {
          countryId: country,
          pattern: searchQuery,
          limit: 5
        }
      : { countryId: country }

    this.props.getZipCodes(queryParams)
  }, 250)

  handleCountryChange = (country, setFieldValue) => {
    this.setState({ country })
    setFieldValue('destination.zip', '')
    this.props.getZipCodes({ countryId: country })
  }

  renderForm() {
    const { loading, loadingZip, loadingCountries, countries } = this.props
    const { loading, echoProducts, zipCodes, defaultZip } = this.props
    const { initialValues, min, split, allZips } = this.state

    // comparison if state has all zips from zipCodes
    if (zipCodes.length > allZips.length - 1) {
      this.setState({
        allZips: zipCodes.includes(defaultZip)
          ? [...zipCodes]
          : [...zipCodes, { value: defaultZip, text: defaultZip, key: zipCodes.length + 1 }]
      })
    }
    const { closeModal } = this.props.modalProps

    return (
      <Form
        enableReinitialize
        ignoreLoading
        initialValues={initialValues}
        validationSchema={formValidation(min, split)}
        onSubmit={(values, actions) => {
          //this.getShipingQuotes(values)
        }}>
        {({ values, errors, setFieldValue, validateForm, setFieldTouched, submitForm }) => {
          let quantity = Number(values.destination.quantity)
          let disableCalcButton =
            loading ||
            (errors.destination && errors.destination.zip) ||
            !quantity ||
            !Number.isInteger(quantity) ||
            !values.destination.zip

          return (
            <>
              <div>{`Product Info: ${getSafe(() => echoProducts[0].name, '')}`}</div>
              <CustomHr />
              <FormGroup widths='equal' data-test='ShippingQuotes_quantity_inp'>
                <Input
                  name='destination.quantity'
                  type='number'
                  label={
                    <FormattedMessage id='shippingQuote.shippingQuantity' defaultMessage='Shipping Quantity'>
                      {text => text}
                    </FormattedMessage>
                  }
                  inputProps={{
                    type: 'number',
                    step: 1,
                    min: 1,
                    onChange: (_, { value }) => this.setState({ quantity: value })
                  }}
                />
                <Dropdown
                  name='destination.country'
                  label={
                    <FormattedMessage id='global.country' defaultMessage='Country'>
                      {text => text}
                    </FormattedMessage>
                  }
                  options={countries}
                  inputProps={{
                    search: true,
                    loading: loadingCountries,
                    onChange: (_, { value }) => this.handleCountryChange(value, setFieldValue),
                    'data-test': 'ShippingQuotes_country_drpdn'
                  }}
                />
                <Dropdown
                  name='destination.zip'
                  label={
                    <FormattedMessage id='shippingQuote.destinationZipCode' defaultMessage='Destination Zip Code'>
                      {text => text}
                    </FormattedMessage>
                  }
                  options={allZips}
                  inputProps={{
                    allowAdditions: true,
                    additionLabel: (
                      <FormattedMessage id='global.dropdown.add' defaultMessage='Add '>
                        {text => text}
                      </FormattedMessage>
                    ),
                    search: true,
                    onAddItem: (e, { value }) => {
                      const newValue = { text: value, value: value, key: new Date().getTime() }
                      allZips.push(newValue)
                      this.setState({ allZips: allZips })
                    },
                    onSearchChange: (e, data) => {
                      this.handleSearchZipCode(data, values.destination.country)
                    },
                    noResultsMessage: (
                      <FormattedMessage
                        id='global.dropdown.startTyping'
                        defaultMessage='Start typing to add {typeName}.'
                        values={{ typeName: <FormattedMessage id='global.ZipCode' defaultMessage='ZIP Code' /> }}
                      />
                    ),
                    loading: loadingZip,
                    'data-test': 'ShippingQuotes_zip_drpdn'
                  }}
                />
                <Dropdown
                  name='destination.maxTransit'
                  label={
                    <FormattedMessage id='shippingQuote.maxTransitTime' defaultMessage='Max Transit Time'>
                      {text => text}
                    </FormattedMessage>
                  }
                  options={[
                    {
                      value: -1,
                      text: (
                        <FormattedMessage id='shippingQuote.noLimit' defaultMessage='No limit'>
                          {text => text}
                        </FormattedMessage>
                      )
                    },
                    {
                      value: 2,
                      text: (
                        <FormattedMessage id='shippingQuote.2Days' defaultMessage='2 days'>
                          {text => text}
                        </FormattedMessage>
                      )
                    },
                    {
                      value: 3,
                      text: (
                        <FormattedMessage id='shippingQuote.3Days' defaultMessage='3 days'>
                          {text => text}
                        </FormattedMessage>
                      )
                    },
                    {
                      value: 5,
                      text: (
                        <FormattedMessage id='shippingQuote.5Days' defaultMessage='5 days'>
                          {text => text}
                        </FormattedMessage>
                      )
                    },
                    {
                      value: 7,
                      text: (
                        <FormattedMessage id='shippingQuote.7Days' defaultMessage='7 days'>
                          {text => text}
                        </FormattedMessage>
                      )
                    },
                    {
                      value: 14,
                      text: (
                        <FormattedMessage id='shippingQuote.14Days' defaultMessage='14 days'>
                          {text => text}
                        </FormattedMessage>
                      )
                    }
                  ]}
                  data-test='ShippingQuotes_maxTransit_drpdn'
                />
                <FormField>
                  <label>&nbsp;</label>
                  <Button
                    type='button'
                    fluid
                    disabled={disableCalcButton}
                    onClick={() => this.getShipingQuotes(values, setFieldTouched)}
                    data-test='ShippingQuotes_calculate'>
                    <FormattedMessage id='shippingQuote.calculate' defaultMessage='Calculate'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </FormField>
              </FormGroup>
              <div>{this.renderShipingQuotes(setFieldTouched)}</div>
            </>
          )
        }}
      </Form>
    )
  }

  renderShipingQuotes(setFieldTouched) {
    const { loading } = this.props

    return (
      <Segment basic style={{ padding: 0 }} loading={loading}>
        <Table basic='very'>
          <Table.Header>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.vendor' defaultMessage='Vendor'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.Etd' defaultMessage='ETD'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.serviceType' defaultMessage='Service Type'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.fobPriceLb' defaultMessage='FOB Price/lb'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.freightLb' defaultMessage='Freight/lb'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.totalPriceLb' defaultMessage='Total Price/lb'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.totalFreight' defaultMessage='Total Freight'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
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
                      onChange={() => this.handleQuoteSelect(i, sQuote, setFieldTouched)}
                      value={i}
                      data-test={`ShippingQuotes_row_${i}_chckb`}
                    />
                  </Table.Cell>
                  <Table.Cell>{sQuote.shipmentRate.carrierName}</Table.Cell>
                  <Table.Cell>{etd + (etd == 1 ? ' Day' : ' Days')}</Table.Cell>
                  <Table.Cell>{sQuote.shipmentRate.serviceType}</Table.Cell>
                  <Table.Cell>
                    <FormattedNumber
                      style='currency'
                      currency={currency}
                      value={getSafe(() => sQuote.shipmentRate.fobPricePerLb, 0)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <FormattedNumber
                      style='currency'
                      currency={currency}
                      value={getSafe(() => sQuote.shipmentRate.freightPricePerLb, 0)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <FormattedNumber
                      style='currency'
                      currency={currency}
                      value={getSafe(() => sQuote.shipmentRate.totalPricePerLb, 0)}
                    />
                  </Table.Cell>
                  <Table.Cell className='a-right'>
                    <FormattedNumber
                      style='currency'
                      currency={currency}
                      value={getSafe(() => sQuote.shipmentRate.estimatedPrice, 0)}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        {this.props.quotes.length === 0 && !loading && (
          <div className='dx-g-bs4-fixed-block'>
            <big className='text-muted'>
              <FormattedMessage
                id='global.noShippingOptions'
                defaultMessage='No shipping options available based on parameters provided.'
              />
            </big>
          </div>
        )}
      </Segment>
    )
  }

  render() {
    const { closeModal } = this.props.modalProps
    const { min, split, allZips } = this.state

    let quantity = Number(this.state.quantity)
    let disableSubmitButton = !(
      quantity &&
      this.state.sQuote &&
      Number.isInteger(quantity) &&
      quantity >= min &&
      quantity % split === 0
    )

    return (
      <Modal closeIcon onClose={closeModal} centered={false} {...this.props.modalProps}>
        <Modal.Header>
          <FormattedMessage id='shippingQuote.header' defaultMessage='Shipping Quote'>
            {text => text}
          </FormattedMessage>
        </Modal.Header>
        <Modal.Content>{this.renderForm()}</Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} data-test='ShippingQuotes_closeModal'>
            <FormattedMessage id='global.close' defaultMessage='Close'>
              {text => text}
            </FormattedMessage>
          </Button>
          <Button
            loading={this.props.isPurchasing}
            disabled={disableSubmitButton}
            primary
            onClick={this.createOrder}
            data-test='ShippingQuotes_createOrder'>
            <FormattedMessage id='shippingQuote.purchase' defaultMessage='Purchase'>
              {text => text}
            </FormattedMessage>
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
  }),
  echoProducts: array
}

ShippingQuotes.defaultProps = {
  modalProps: {
    open: false,
    centered: false
  },
  echoProducts: []
}
