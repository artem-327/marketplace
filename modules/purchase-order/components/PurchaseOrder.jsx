import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Shipping from './Shipping'
import ShippingEdit from './ShippingEdit'
import ShippingQuote from './ShippingQuote'
import Payment from './Payment'
import { Container, Menu, Header, Button, Icon, Grid, GridColumn, GridRow, Segment, Popup } from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/router'

import CartItemSummary from '~/components/summary/CartItemSummary'
import Summary from '~/components/summary/Summary'

import Spinner from '../../../src/components/Spinner/Spinner'
import confirm from '~/src/components/Confirmable/confirm'
import { checkToken } from '../../../src/utils/auth'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import * as Yup from 'yup'

import '../styles/PurchaseOrder.scss'
import { errorMessages } from '~/constants/yupValidation'

const RelaxedForm = styled(Form)`
  padding-top: 1.5rem !important;
  padding-bottom: 50px !important;
  overflow: auto;
`

const validationSchema = Yup.object().shape({
  address: Yup.number().required(errorMessages.requiredMessage)
})

class PurchaseOrder extends Component {
  state = {
    otherAddresses: true,
    submitting: false,
    addressId: 'deliveryAddressId',
    shippingQuotes: [],
    selectedAddress: ''
  }
  componentDidMount() {
    this.props.getCart()
    this.props.getDeliveryAddresses()
    this.props.getPayments()
    this.props.getIdentity()
  }

  handleQuoteSelect = index => {
    let { shippingQuoteSelected, shippingQuotes } = this.props
    shippingQuoteSelected({ index, quote: this.state.shippingQuotes[index] })
  }

  getAddress = selectedAddressId => {
    let { deliveryAddresses, warehouses, branches, cart } = this.props
    let addresses = this.state.otherAddresses ? deliveryAddresses : warehouses //branches
    let selectedAddress = addresses.find(i => i.id === selectedAddressId)

    if (selectedAddress.deliveryAddress) {
      selectedAddress = { ...selectedAddress, address: selectedAddress.deliveryAddress.address }
    }

    this.setState(
      { selectedAddress, addressId: this.state.otherAddresses ? 'deliveryAddressId' : 'warehouseId' },
      () => {
        this.props.shippingChanged(this.state.selectedAddress)
        if (!cart.weightLimitExceed) this.getShippingQuotes(this.state.selectedAddress)
      }
    )
  }

  getPayment = selectedPaymentId => {
    const { payments } = this.props
    const selectedPayment = payments.find(i => i.id === selectedPaymentId)
    this.props.shippingChanged({ selectedPayment })
  }

  getShippingQuotes = async selectedAddress => {
    let { address } = selectedAddress
    try {
      const shippingQuotes = await this.props.getShippingQuotes(address.country.id, address.zip.zip)
      this.setState({ shippingQuotes: shippingQuotes.value })
    } catch (error) {
      console.error(error)
    }
  }

  postNewDeliveryAddress = async payload => {
    try {
      const response = await this.props.postNewDeliveryAddress(payload)
      this.getAddress(response.value.id)
    } catch (e) {
      console.error(e)
    }
  }

  updateDeliveryAddress = async payload => {
    try {
      const response = await this.props.updateDeliveryAddress(payload)
      this.getAddress(response.value.id)
    } catch (e) {
      console.error(e)
    }
  }

  handleToggleChange = otherAddresses => {
    return new Promise(resolve => {
      this.setState({ otherAddresses, selectedAddress: null }, resolve)
    })
  }

  deleteCart = id => {
    if (checkToken(this.props)) return
    let { cart } = this.props

    let { formatMessage } = this.props.intl

    if (cart.cartItems.length === 1) {
      return confirm(
        formatMessage({
          id: 'order.deleteHeader',
          defaultMessage: 'Delete Order'
        }),
        formatMessage({
          id: 'order.deleteBody',
          defaultMessage:
            'You are about to delete last item of order. Doing so will redirect you to Shopping cart. Do you wish to continue?'
        })
      ).then(() => {
        this.props.deleteCart()
        Router.push('/cart')
      })
    } else {
      this.props.deleteCartItem(id)
    }
  }

  handlePurchase = async (shipping, shipmentQuoteId) => {
    if (this.state.submitting) return
    this.setState({ submitting: true })

    const { toastManager } = this.props
    const data = {
      [this.state.addressId]: this.state.selectedAddress.id,
      shipmentQuoteId
    }

    try {
      await this.props.postPurchaseOrder(data)

      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='notifications.purchaseOrderSuccess.header' defaultMessage='Order Placed' />,
          <FormattedMessage
            id='notifications.purchaseOrderSuccess.content'
            defaultMessage='Order has been successfully placed.'
          />
        ),
        {
          appearance: 'success'
        }
      )
      Router.push('/orders?type=purchase')
    } catch (e) {
      console.error(e)

      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='notifications.purchaseOrderError.header' defaultMessage='Order Error' />,
          <FormattedMessage
            id='notifications.purchaseOrderError.contentWithText'
            defaultMessage='Error occurred while placing an order:'
            values={{ clientMessage: e.clientMessage }}>
            {text => text.split('\n').map((item, i) => <p key={i}>{item}</p>)}
          </FormattedMessage>
        ),
        {
          appearance: 'error'
        }
      )
    }
    this.setState({ submitting: false })
  }

  handleManualShipment = async formikProps => {
    let { values, setSubmitting, errors, validateForm, setFieldTouched } = formikProps
    let {
      requestManualShipment,
      shipping: { selectedAddress },
      toastManager
    } = this.props
    setFieldTouched('address')
    setSubmitting(false)

    if (values.address) {
      let payload = {
        destinationCountryId: this.state.selectedAddress.address.country.id,
        destinationZIP: this.state.selectedAddress.address.zip.zip
      }
      await requestManualShipment(payload)
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage
            id='notifications.manualShippingQuote.header'
            defaultMessage='Request succesfully submitted'
          />,
          <FormattedMessage
            id='notifications.manualShippingQuote.content'
            defaultMessage='Request for Shipment Quote has been successful'
          />
        ),
        { appearance: 'success' }
      )
    }
  }

  render() {
    const {
      billingInfo,
      dispatch,
      postNewDeliveryAddress,
      updateDeliveryAddress,
      preferredBankAccountId,
      intl: { formatMessage }
    } = this.props
    let {
      cart,
      deliveryAddresses,
      payments,
      cartIsFetching,
      shippingQuotes,
      shippingQuotesAreFetching,
      shipping
    } = this.props

    if (cartIsFetching) return <Spinner />
    if (cart.cartItems.length === 0) Router.push('/cart')

    //let currency = cart.cartItems[0].productOffer.pricingTiers[0].price.currency.code
    //let currency = getSafe(() => cartItems[0].productOffer.pricingTiers[0].pricePerUOM.currency.code, currency)  // ! !

    let payment = null
    if (payments.length === 1) payment = payments[0].id
    else if (preferredBankAccountId) payment = preferredBankAccountId

    let initialValues = {
      payment,
      address: '',
      shipmentQuoteId: '',
    }

    let weightLimitStr = cart.weightLimit ? `of ${cart.weightLimit}` : ''

    return (
      <div className='app-inner-main flex stretched'>
        <div className='header-top' style={{ zIndex: 10, backgroundColor: '#FFF' }}>
          <Container fluid style={{ padding: '0 32px' }}>
            <Menu secondary>
              <Menu.Item header>
                <Header as='h1' size='medium'>
                  <FormattedMessage id='cart.checkout' defaultMessage='Checkout' />
                </Header>
              </Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item>
                  <Button
                    icon
                    basic
                    labelPosition='left'
                    onClick={() => Router.push('/cart')}
                    data-test='purchase_order_back_to_cart_btn'>
                    <Icon name='chevron left' />
                    <FormattedMessage id='cart.backToShoppingCart' defaultMessage='Back to Shopping Cart'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Container>
        </div>

        <RelaxedForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          className='purchase-order'
          render={formikProps => {
            let { values } = formikProps

            return (
              <Grid centered>
                <GridColumn mobile={14} tablet={9} computer={8}>
                  {shipping.isShippingEdit && (
                    <ShippingEdit
                      savedShippingPreferences={shipping.savedShippingPreferences}
                      selectedAddress={this.state.selectedAddress}
                      isNewAddress={shipping.isNewAddress}
                      shippingChanged={this.props.shippingChanged}
                      postNewDeliveryAddress={this.postNewDeliveryAddress}
                      updateDeliveryAddress={this.updateDeliveryAddress}
                      getStates={this.props.getStates}
                      getProvinces={this.props.getProvinces}
                      states={this.props.states}
                      provinces={this.props.provinces}
                      isFetching={this.props.isFetching}
                      initialValues={this.props.initialValues}
                    />
                  )}
                  {!shipping.isShippingEdit && (
                    <Segment>
                      <Grid className='bottom-padded'>
                        <Shipping
                          otherAddresses={this.state.otherAddresses}
                          deliveryAddresses={deliveryAddresses}
                          dispatch={dispatch}
                          shippingChanged={this.props.shippingChanged}
                          getAddress={this.getAddress}
                          selectedAddress={this.state.selectedAddress}
                          getBranches={this.props.getBranches}
                          branchesAreFetching={this.props.branchesAreFetching}
                          branches={this.props.branches}
                          getWarehouses={this.props.getWarehouses}
                          warehousesFetching={this.props.warehousesFetching}
                          warehouses={this.props.warehouses}
                          handleToggleChange={this.handleToggleChange}
                          shippingQuotesAreFetching={this.props.shippingQuotesAreFetching}
                          formikProps={formikProps}
                          weightLimitExceed={cart.weightLimitExceed}
                        />
                      </Grid>
                    </Segment>
                  )}

                  <Segment>
                    <Grid className='bottom-padded'>
                      <GridRow className='header'>
                        <GridColumn>
                          <Header as='h2'>
                            <FormattedMessage id='cart.2freightSelection' defaultMessage='2. Freight Selection' />
                          </Header>
                        </GridColumn>
                      </GridRow>
                      {!cart.weightLimitExceed && this.state.selectedAddress ? (
                        <ShippingQuote
                          currency={currency}
                          selectedShippingQuote={this.props.cart.selectedShipping}
                          handleQuoteSelect={this.handleQuoteSelect}
                          selectedAddress={this.state.selectedAddress}
                          shippingQuotes={this.state.shippingQuotes}
                          shippingQuotesAreFetching={this.props.shippingQuotesAreFetching}
                        />
                      ) : (
                        !this.state.selectedAddress && (
                          <GridRow>
                            <GridColumn>
                              <FormattedMessage
                                id='cart.selectWhOrAddress'
                                defaultMessage='Please, select delivery address or warehouse first.'
                              />
                            </GridColumn>
                          </GridRow>
                        )
                      )}
                      {cart.weightLimitExceed && this.state.selectedAddress && (
                        <>
                          <GridRow>
                            <GridColumn computer={16}>
                              <FormattedMessage
                                id='cart.weightLimitExceeded'
                                defaultMessage={`Your order weight exceeds weight limit ${weightLimitStr} for automatic shipping quotes. Your shipping quote needs to be processed manually. If you wish to continue, click the "Request Shipping Quote" button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`}
                                values={{ limit: weightLimitStr }}
                              />
                            </GridColumn>
                          </GridRow>
                        </>
                      )}

                      {this.state.shippingQuotes.length === 0 &&
                        this.state.selectedAddress &&
                        !shippingQuotesAreFetching &&
                        !cart.weightLimitExceed && (
                          <GridRow>
                            <GridColumn computer={16}>
                              <FormattedMessage
                                id='cart.noShippingQuotes.processManually'
                                defaultMessage={`It was not possible to retrieve any automated shipping quotes for you order. Your shipping quote might need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`}
                              />
                            </GridColumn>
                          </GridRow>
                        )}
                      {this.state.selectedAddress &&
                        // shippingQuotes.length === 0 &&
                        !shippingQuotesAreFetching &&
                        (cart.weightLimitExceed || shippingQuotes.length === 0) && (
                          <>
                            <GridRow>
                              <GridColumn computer={16}>
                                <Button
                                  loading={this.props.manualShipmentPending}
                                  type='button'
                                  onClick={() => this.handleManualShipment(formikProps)}>
                                  <FormattedMessage
                                    id='cart.requestShippingQuote'
                                    defaultMessage='Request Shipping Quote'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </GridColumn>
                            </GridRow>
                            <GridRow>
                              <GridColumn computer={16}>
                                <FormattedMessage
                                  id='cart.quoteReceived'
                                  defaultMessage='If you already received the shipping quote and agree, please type in the provide Shipping Quote Id and continue with Checkout.'
                                />
                              </GridColumn>
                            </GridRow>
                            <GridRow>
                              <GridColumn computer={8}>
                                <Input
                                  name='shipmentQuoteId'
                                  label={
                                    <FormattedMessage id='cart.shippingQuoteId' defaultMessage='Shipping Quote ID' />
                                  }
                                />
                              </GridColumn>
                            </GridRow>
                          </>
                        )}
                    </Grid>
                  </Segment>

                  <Segment>
                    <Grid className='bottom-padded'>
                      <GridRow className='header'>
                        <GridColumn>
                          <Header as='h2'>
                            <FormattedMessage id='cart.3payment' defaultMessage='3. Payment' />
                          </Header>
                        </GridColumn>
                      </GridRow>

                      <Payment
                        dispatch={dispatch}
                        billingInfo={billingInfo}
                        selectedPayment={shipping.selectedPayment}
                        payments={payments}
                        getPayment={this.getPayment}
                        companyName={this.props.companyName}
                      />
                    </Grid>
                  </Segment>
                </GridColumn>

                <GridColumn mobile={14} tablet={6} computer={5}>
                  <CartItemSummary
                    updateHazmatInfo={this.props.updateHazmatInfo}
                    currency={currency}
                    cartItems={cart.cartItems}
                    deleteCart={this.deleteCart}
                  />

                  <Summary
                    additionalContent={
                      <GridRow centered>
                        <Popup
                          trigger={
                            <GridColumn>
                              <Button
                                disabled={
                                  this.state.submitting ||
                                  !values.payment ||
                                  !this.props.logisticsAccount ||
                                  !(
                                    this.state.selectedAddress &&
                                    (this.props.cart.selectedShipping || values.shipmentQuoteId)
                                  )
                                }
                                loading={this.state.submitting}
                                fluid
                                primary
                                onClick={() => {
                                  this.handlePurchase(
                                    shipping,
                                    getSafe(
                                      () => this.props.cart.selectedShipping.quote.quoteId,
                                      values.shipmentQuoteId
                                    )
                                  )
                                }}
                                data-test='purchase_order_place_order_btn'>
                                {/* <FormattedMessage id='cart.placeOrder' defaultMessage='Place Order1' /> */}
                                {formatMessage({
                                  id: 'cart.placeOrder',
                                  defaultMessage: 'Place Order'
                                })}
                              </Button>
                            </GridColumn>
                          }
                          content={
                            <FormattedMessage
                              id='cart.purchaseOrder.logisticAccRequired'
                              defaultMessage='To be able to complete Order, your Company needs to have Logistics account defined. This can be done in Settings.'
                            />
                          }
                          disabled={this.props.logisticsAccount}
                        />
                      </GridRow>
                    }
                    logisticsAccount={this.props.logisticsAccount}
                    cart={cart}
                    totalPrice={this.props.cart.cfPriceSubtotal}
                  />
                </GridColumn>
              </Grid>
            )
          }}
        />
      </div>
    )
  }
}

export default injectIntl(withToastManager(PurchaseOrder))

PurchaseOrder.propTypes = {
  cartItem: PropTypes.object,
  deliveryAddresses: PropTypes.array,
  dispatch: PropTypes.func,
  getCart: PropTypes.func,
  getDeliveryAddresses: PropTypes.func,
  postPurchaseOrder: PropTypes.func,
  deleteCart: PropTypes.func,
  selectedAddressId: PropTypes.number,
  shippingQuotes: PropTypes.array
}
