import React, { Component } from 'react'
import PropTypes from "prop-types"


import Shipping from "./Shipping"
import ShippingEdit from './ShippingEdit'
import ShippingQuote from "./ShippingQuote"
import Payment from './Payment'
import { Container, Menu, Header, Button, Icon, Grid, GridColumn, GridRow, Segment, Popup } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/router'

import CartItemSummary from '~/components/summary/CartItemSummary'
import Summary from '~/components/summary/Summary'

import Spinner from '../../../src/components/Spinner/Spinner'
import confirm from '~/src/components/Confirmable/confirm'
import { checkToken } from '../../../src/utils/auth'

import '../styles/PurchaseOrder.scss'


const RelaxedGrid = styled(Grid)`
  padding-top 1.5rem !important;
  padding-bottom: 50px !important;
  overflow: auto;
`


class PurchaseOrder extends Component {
  state = {
    otherAddresses: true
  }
  componentDidMount() {
    this.props.getCart()
    this.props.getDeliveryAddresses()
    this.props.getPayments()
  }

  handleQuoteSelect = (index) => {
    let { shippingQuoteSelected, shippingQuotes } = this.props
    shippingQuoteSelected({ index, quote: shippingQuotes[index] })
  }

  getAddress = (selectedAddressId) => {
    let { deliveryAddresses, warehouses, branches } = this.props
    let addresses = this.state.otherAddresses ? deliveryAddresses : warehouses //branches
    let selectedAddress = addresses.find(i => i.id === selectedAddressId)

    this.props.shippingChanged({ selectedAddress })
    this.getShippingQuotes(selectedAddress)
  }

  getPayment = (selectedPaymentId) => {
    const { payments } = this.props
    const selectedPayment = payments.find(i => i.id === selectedPaymentId)
    this.props.shippingChanged({ selectedPayment })
  }

  getShippingQuotes = (selectedAddress) => {
    let { address } = selectedAddress

    this.props.getShippingQuotes(address.country.id, address.zip.zip);
  }


  handleToggleChange = (otherAddresses) => {
    return new Promise((resolve) => {
      this.setState({ otherAddresses }, resolve)
    })
  }

  deleteCart = (id) => {
    if (checkToken(this.props)) return
    let { cart } = this.props

    let { formatMessage } = this.props.intl

    if (cart.cartItems.length === 1) {
      return confirm(
        formatMessage(({
          id: 'order.deleteHeader',
          defaultMessage: 'Delete Order'
        })),
        formatMessage(({
          id: 'order.deleteBody',
          defaultMessage: 'You are about to delete last item of order. Doing so will redirect you to Shopping cart. Do you wish to continue?'
        }))
      ).then(() => {
        this.props.deleteCart()
        Router.push('/cart')
      })
    } else {
      this.props.deleteCartItem(id)
    }
  }

  handlePurchase(shipping) {
    const data = {
      deliveryAddressId: shipping.selectedAddress.id,
      //shipmentQuoteId: shipping.selectedShippingQuote
      shipmentQuoteId: 'someId'  // ! ! TODO - when data is available from BE
    }
    this.props.postPurchaseOrder(data)
  }

  render() {
    const { dispatch, postNewDeliveryAddress, updateDeliveryAddress, preferredBankAccountId, intl: { formatMessage } } = this.props
    let { cart, deliveryAddresses, payments, cartIsFetching, shippingQuotes, shipping } = this.props

    if (cartIsFetching) return <Spinner />
    if (cart.cartItems.length === 0) Router.push('/cart')

    let currency = cart.cartItems[0].productOffer.price.currency.code


    let payment = null
    if (payments.length === 1) payment = payments[0].id
    else if (preferredBankAccountId) payment = preferredBankAccountId

    let initialValues = {
      payment
    }

    return (
      <div className="app-inner-main flex stretched">
        <div className="header-top" style={{ zIndex: 10, backgroundColor: '#FFF' }}>
          <Container fluid style={{ padding: '0 32px' }}>
            <Menu secondary>
              <Menu.Item header>
                <Header as='h1' size='medium'>
                  <FormattedMessage id='cart.checkout' defaultMessage='Checkout' />
                </Header>
              </Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item>
                  <Button icon basic labelPosition='left' onClick={() => Router.push('/cart')} data-test='purchase_order_back_to_cart_btn'>
                    <Icon name='chevron left' />
                    <FormattedMessage id='cart.backToShoppingCart' defaultMessage='Back to Shopping Cart'>{(text) => text}</FormattedMessage>
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Container>
        </div>

        <RelaxedGrid centered className='purchase-order'>

          <GridColumn computer={8}>

            {shipping.isShippingEdit &&
              <ShippingEdit
                savedShippingPreferences={shipping.savedShippingPreferences}
                selectedAddress={shipping.selectedAddress}
                isNewAddress={shipping.isNewAddress}
                shippingChanged={this.props.shippingChanged}
                postNewDeliveryAddress={postNewDeliveryAddress}
                updateDeliveryAddress={updateDeliveryAddress}
                getStates={this.props.getStates}
                getProvinces={this.props.getProvinces}
                states={this.props.states}
                provinces={this.props.provinces}
                isFetching={this.props.isFetching}
                initialValues={this.props.initialValues}
              />
            }
            <Form initialValues={initialValues}>
              {!shipping.isShippingEdit &&
                <Shipping
                  otherAddresses={this.state.otherAddresses}
                  deliveryAddresses={deliveryAddresses}
                  dispatch={dispatch}
                  shippingChanged={this.props.shippingChanged}
                  getAddress={this.getAddress}
                  selectedAddress={shipping.selectedAddress}
                  getBranches={this.props.getBranches}
                  branchesAreFetching={this.props.branchesAreFetching}
                  branches={this.props.branches}
                  getWarehouses={this.props.getWarehouses}
                  warehousesFetching={this.props.warehousesFetching}
                  warehouses={this.props.warehouses}
                  handleToggleChange={this.handleToggleChange}
                  shippingQuotesAreFetching={this.props.shippingQuotesAreFetching}
                />
              }
              <Segment>
                <Grid className='bottom-padded'>
                  <GridRow className='header'>
                    <GridColumn>
                      <Header as='h2'>
                        <FormattedMessage id='cart.2freightSelection' defaultMessage='2. Freight Selection' />
                      </Header>
                    </GridColumn>
                  </GridRow>

                  <ShippingQuote
                    currency={currency}
                    selectedShippingQuote={this.props.cart.selectedShipping}
                    handleQuoteSelect={this.handleQuoteSelect}
                    selectedAddress={shipping.selectedAddress}
                    shippingQuotes={shippingQuotes}
                    shippingQuotesAreFetching={this.props.shippingQuotesAreFetching}
                  />
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
                    selectedAddress={shipping.selectedAddress}
                    selectedPayment={shipping.selectedPayment}
                    payments={payments}
                    getPayment={this.getPayment}
                  />
                </Grid>
              </Segment>

            </Form>
          </GridColumn>

          <GridColumn computer={5}>
            <CartItemSummary
              updateHazmatInfo={this.props.updateHazmatInfo}
              currency={currency}
              cartItems={cart.cartItems}
              deleteCart={this.deleteCart}
            />

            <Summary
              additionalContent={
                <GridRow centered>
                  <Popup trigger={
                    <GridColumn>
                      <Button disabled={!this.props.logisticsAccount || !(shipping.selectedAddress /* ! ! Add Freight Selection checking when available -> && shipping.selectedShippingQuote */)}
                              fluid primary onClick={() => this.handlePurchase(shipping)} data-test='purchase_order_place_order_btn'>
                        {/* <FormattedMessage id='cart.placeOrder' defaultMessage='Place Order1' /> */}
                        {formatMessage({ id: 'cart.placeOrder', defaultMessage: 'Place Order1' })}
                      </Button>
                    </GridColumn>
                  } content={
                    <FormattedMessage
                      id='cart.purchaseOrder.logisticAccRequired'
                      defaultMessage='To !be able to complete Order, your Company needs to have Logistics account defined. This can be done in Settings.' />}
                    disabled={this.props.logisticsAccount} />
                </GridRow>
              }
              logisticsAccount={this.props.logisticsAccount}
              cart={cart}
              totalPrice={this.props.cart.totalPrice}
            />

          </GridColumn>
        </RelaxedGrid>

      </div>
    )
  }
}

export default injectIntl(PurchaseOrder)

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