import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Shipping from './Shipping'
import ShippingEdit from './ShippingEdit'
import ShippingQuote from './ShippingQuote'
import Payment from './Payment'
import {
  Container as SemanticContainer,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider
} from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/router'

const FREIGHT_TYPES = {
  ECHO: 'ECHO_FREIGHT',
  OWN: 'OWN_FREIGHT'
}

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

import {
  VerticalUnpaddedColumn,
  StyledRow,
  TopUnpaddedRow,
  GridContainer,
  VerticalUnpaddedRow,
  BottomUnpaddedRow
} from '~/modules/cart/components/StyledComponents'

const RelaxedForm = styled(Form)`
  padding-top: 1.5rem !important;
  padding-bottom: 50px !important;
  overflow-y: auto;
  overflow-x: hidden;
`

const Container = styled(SemanticContainer)`
  padding: 20px 30px 30px 30px !important;
  overflow-x: hidden;
`

const CustomMessage = styled(Message)`
  border-radius: 4px;
  ${props => props.warning && `border: solid 1px #ff9d42;`}
  ${props => props.informative && `border: solid 1px #2599d5;`}
  ${props => props.ownFreight && `border: solid 1px #84c225;`}
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  background-color: #ffffff !important;
  display: block !important;
  i {
    ${props => props.warning && `color: #ff9d42;`}
    ${props => props.informative && `color: #2599d5;`}
    ${props => props.ownFreight && `color: #84c225;`}
  }

  *:not(i) {
    color: black !important;
  }
  & .button {
    float: right;
    bottom: 7px;
    position: relative;
  }
`

const validationSchema = Yup.object().shape({
  address: Yup.number().required(errorMessages.requiredMessage)
})

class PurchaseOrder extends Component {
  state = {
    modalOpen: false,
    isNewAddress: false,
    otherAddresses: true,
    submitting: false,
    addressId: 'deliveryAddressId',
    shippingQuotes: [],
    selectedAddress: ''
  }
  componentDidMount = async () => {
    const { preFilledValues, clearPreFilledValues, getWarehouses } = this.props
    this.props.getDeliveryAddresses()
    this.props.getPayments()
    this.props.getIdentity()
    await this.props.getCart()

    if (preFilledValues) {
      const warehouses = await getWarehouses()
      const filteredWarehouses = warehouses.value.filter(
        el =>
          getSafe(() => el.deliveryAddress.address.zip.zip, '') === preFilledValues.zip &&
          getSafe(() => el.deliveryAddress.address.country.id, '') === preFilledValues.country
      )

      let selectedAddress = null
      if (filteredWarehouses.length) {
        selectedAddress = filteredWarehouses[0]
        if (selectedAddress.deliveryAddress) {
          selectedAddress = { ...selectedAddress, address: selectedAddress.deliveryAddress.address }
        }

        this.formikProps.setFieldValue('address', filteredWarehouses[0].id)

        this.setState(
          {
            otherAddresses: false,
            addressId: 'warehouseId',
            shippingQuotes: preFilledValues.quotes.rates.map(d => d.shipmentRate),
            selectedAddress: selectedAddress
          },
          () => this.handleQuoteSelect(preFilledValues.freightIndex)
        )
      }

      clearPreFilledValues()
    }
  }

  handleQuoteSelect = index => {
    let { shippingQuoteSelected, shippingQuotes } = this.props
    shippingQuoteSelected({ index, quote: shippingQuotes.rates[index] })
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
      await this.props.getShippingQuotes(address.country.id, address.zip.zip)
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

  handlePurchase = async payload => {
    if (this.state.submitting) return
    this.setState({ submitting: true })
    const { shipmentQuoteId, dwollaBankAccountId, freightType } = payload
    const data = {
      [this.state.addressId]: this.state.selectedAddress.id,
      shipmentQuoteId,
      dwollaBankAccountId,
      freightType
    }

    try {
      await this.props.postPurchaseOrder(data)
      Router.push('/orders?type=purchase')
    } catch (e) {
      console.error(e)
    }
    this.setState({ submitting: false })
  }

  handleManualShipment = async formikProps => {
    let { values, setSubmitting, setFieldTouched } = formikProps
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
      shipping,
      purchaseHazmatEligible
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
      freightType: FREIGHT_TYPES.ECHO
    }

    let weightLimitStr = cart.weightLimit ? `of ${cart.weightLimit}` : ''

    let isAnyItemHazardous = cart.cartItems.some(
      item => getSafe(() => item.productOffer.companyProduct.hazardous, false) === true
    )

    return (
      <Container>
        <Button basic onClick={() => Router.push('/cart')} data-test='purchase_order_back_to_cart_btn'>
          <Icon name='shopping cart' />
          <FormattedMessage id='cart.backToShoppingCart' defaultMessage='Back to Shopping Cart'>
            {text => text}
          </FormattedMessage>
        </Button>
        <RelaxedForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          className='purchase-order'
          enableReinitialize
          render={formikProps => {
            let { values, setFieldValue } = formikProps
            this.formikProps = formikProps
            const echoFreight = values.freightType === FREIGHT_TYPES.ECHO

            return (
              <GridContainer>
                <GridColumn mobile={14} tablet={9} computer={10}>
                  {this.state.modalOpen && (
                    <ShippingEdit
                      onClose={() => this.setState({ modalOpen: false })}
                      savedShippingPreferences={shipping.savedShippingPreferences}
                      selectedAddress={this.state.selectedAddress}
                      isNewAddress={this.state.isNewAddress}
                      shippingChanged={this.props.shippingChanged}
                      postNewDeliveryAddress={this.postNewDeliveryAddress}
                      updateDeliveryAddress={this.updateDeliveryAddress}
                      getStates={this.props.getStates}
                      getProvinces={this.props.getProvinces}
                      states={this.props.states}
                      provinces={this.props.provinces}
                      isFetching={this.props.isFetching}
                      initialValues={this.state.isNewAddress ? null : this.props.initialValues}
                    />
                  )}

                  <Segment>
                    <Grid className='bottom-padded'>
                      <Shipping
                        handleOpen={({ modalOpen, isNewAddress }) => this.setState({ modalOpen, isNewAddress })}
                        otherAddresses={this.state.otherAddresses}
                        deliveryAddresses={deliveryAddresses}
                        getAddress={this.getAddress}
                        selectedAddress={this.state.selectedAddress}
                        getWarehouses={this.props.getWarehouses}
                        warehouses={this.props.warehouses}
                        handleToggleChange={this.handleToggleChange}
                        shippingQuotesAreFetching={this.props.shippingQuotesAreFetching}
                        formikProps={formikProps}
                      />
                    </Grid>
                  </Segment>

                  <Segment>
                    <Grid>
                      <StyledRow verticalAlign='middle' bottomShadow>
                        <VerticalUnpaddedColumn>
                          <Header as='h2'>
                            <FormattedMessage id='cart.2freightSelection' defaultMessage='2. Freight Selection' />
                          </Header>
                        </VerticalUnpaddedColumn>
                      </StyledRow>
                      {this.state.selectedAddress && (
                        <BottomUnpaddedRow>
                          <GridColumn>
                            <CustomMessage informative={echoFreight} ownFreight={!echoFreight}>
                              <Icon size='large' name={echoFreight ? 'info circle' : 'check circle outline'} />
                              {echoFreight ? (
                                <FormattedMessage id='cart.useOwnFreight' defaultMessage='Use my own freight' />
                              ) : (
                                <FormattedMessage
                                  id='cart.usingOwnFreight'
                                  defaultMessage='You are using your own freight'
                                />
                              )}
                              <Button
                                type='button'
                                color={echoFreight && 'blue'}
                                basic
                                onClick={() =>
                                  setFieldValue('freightType', echoFreight ? FREIGHT_TYPES.OWN : FREIGHT_TYPES.ECHO)
                                }>
                                {echoFreight ? (
                                  <>
                                    <Icon name='archive' />
                                    <FormattedMessage id='cart.ownFreight' defaultMessage='Own Freight'>
                                      {text => text}
                                    </FormattedMessage>
                                  </>
                                ) : (
                                  <FormattedMessage id='global.cancel' defaultMessage='!Cancel'>
                                    {text => text}
                                  </FormattedMessage>
                                )}
                              </Button>
                            </CustomMessage>
                          </GridColumn>
                        </BottomUnpaddedRow>
                      )}
                      {!cart.weightLimitExceed && this.state.selectedAddress ? (
                        <ShippingQuote
                          currency={currency}
                          selectedShippingQuote={this.props.cart.selectedShipping}
                          handleQuoteSelect={this.handleQuoteSelect}
                          selectedAddress={this.state.selectedAddress}
                          shippingQuotes={shippingQuotes}
                          shippingQuotesAreFetching={this.props.shippingQuotesAreFetching}
                        />
                      ) : (
                        !this.state.selectedAddress && (
                          <GridRow>
                            <GridColumn>
                              <CustomMessage warning>
                                <Icon size='large' name='warning circle' />
                                <FormattedMessage
                                  id='cart.selectWhOrAddress'
                                  defaultMessage='Please, select delivery address or warehouse first.'>
                                  {text => text}
                                </FormattedMessage>
                              </CustomMessage>
                            </GridColumn>
                          </GridRow>
                        )
                      )}
                      {cart.weightLimitExceed && this.state.selectedAddress && (
                        <>
                          <GridRow>
                            <GridColumn computer={16}>
                              <CustomMessage warning>
                                <CustomMessage.Header>
                                  <Icon name='warning circle' />
                                  {formatMessage({
                                    id: 'cart.weightLimitExceeded.header',
                                    defaultMessage:
                                      'We are sorry, but no matching Shipping Quotes were provided by logistics company.'
                                  })}
                                </CustomMessage.Header>
                                <CustomMessage.Content>
                                  {formatMessage(
                                    {
                                      id: 'cart.weightLimitExceeded.content',
                                      defaultMessage: `Your order weight exceeds weight limit ${weightLimitStr} for automatic shipping quotes. Your shipping quote needs to be processed manually. If you wish to continue, click the "Request Shipping Quote" button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`
                                    },
                                    { limit: weightLimitStr }
                                  )}
                                </CustomMessage.Content>
                              </CustomMessage>
                            </GridColumn>
                          </GridRow>
                        </>
                      )}

                      {getSafe(() => shippingQuotes.rates, []).length === 0 &&
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
                        !shippingQuotesAreFetching &&
                        (cart.weightLimitExceed || getSafe(() => shippingQuotes.rates, []).length === 0) && (
                          <>
                            <TopUnpaddedRow>
                              <VerticalUnpaddedColumn computer={8}>
                                <Button
                                  basic
                                  fluid
                                  loading={this.props.manualShipmentPending}
                                  type='button'
                                  onClick={() => this.handleManualShipment(formikProps)}>
                                  <FormattedMessage
                                    id='cart.requestShippingQuote'
                                    defaultMessage='Request Shipping Quote'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </VerticalUnpaddedColumn>
                            </TopUnpaddedRow>
                            <Divider />
                            <VerticalUnpaddedRow>
                              <VerticalUnpaddedColumn computer={16}>
                                <Header as='h2'>
                                  <FormattedMessage
                                    id='cart.quoteReceived'
                                    defaultMessage='If you already received the shipping quote and agree, please type in the provide Shipping Quote Id and continue with Checkout.'
                                  />
                                </Header>
                              </VerticalUnpaddedColumn>
                            </VerticalUnpaddedRow>
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
                      <StyledRow verticalAlign='middle' bottomShadow>
                        <VerticalUnpaddedColumn>
                          <Header as='h2'>
                            <FormattedMessage id='cart.3payment' defaultMessage='3. Payment' />
                          </Header>
                        </VerticalUnpaddedColumn>
                      </StyledRow>

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

                <GridColumn mobile={14} tablet={6} computer={6}>
                  <CartItemSummary
                    updateHazmatInfo={this.props.updateHazmatInfo}
                    currency={currency}
                    cartItems={cart.cartItems}
                    deleteCart={this.deleteCart}
                  />

                  <Summary
                    additionalContent={
                      <GridRow className='default-padded' centered>
                        <Popup
                          trigger={
                            <GridColumn>
                              <Button
                                disabled={
                                  (!purchaseHazmatEligible && isAnyItemHazardous) || // false
                                  this.state.submitting || // false
                                  !values.payment || // !true
                                  !this.props.logisticsAccount || // !true
                                  !(
                                    this.state.selectedAddress && // true
                                    (this.props.cart.selectedShipping || values.shipmentQuoteId || !echoFreight)
                                  )
                                }
                                loading={this.state.submitting}
                                fluid
                                primary
                                onClick={() => {
                                  this.handlePurchase({
                                    shipmentQuoteId: getSafe(
                                      () => this.props.cart.selectedShipping.quote.quoteId,
                                      values.shipmentQuoteId
                                    ),
                                    dwollaBankAccountId: values.payment,
                                    freightType: values.freightType
                                  })
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
                            !this.props.logisticsAccount ? (
                              <FormattedMessage
                                id='cart.purchaseOrder.logisticAccRequired'
                                defaultMessage='To be able to complete Order, your Company needs to have Logistics account defined. This can be done in Settings.'
                              />
                            ) : (
                              <FormattedMessage
                                id='cart.purchaseOrder.purchaseHazmatEligible'
                                defaultMessage='You are not authorized to purchase this hazardous item.'
                              />
                            )
                          }
                          disabled={
                            this.props.logisticsAccount &&
                            ((purchaseHazmatEligible && isAnyItemHazardous) ||
                              (purchaseHazmatEligible && !isAnyItemHazardous) ||
                              (!purchaseHazmatEligible && !isAnyItemHazardous))
                          }
                        />
                      </GridRow>
                    }
                    logisticsAccount={this.props.logisticsAccount}
                    cart={cart}
                    totalPrice={this.props.cart.cfPriceSubtotal}
                  />
                </GridColumn>
              </GridContainer>
            )
          }}
        />
      </Container>
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
