import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { actions } from 'react-redux-form'

import Shipping from './components/Shipping'
import ShippingEdit from './components/ShippingEdit'
import ShippingQuote from './components/ShippingQuote'
import Payment from './components/Payment'
import { Container, Menu, Header, Button, Icon, Grid, GridColumn, GridRow, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import Spinner from '../../../components/Spinner/Spinner'
import './PurchaseOrder.scss'
import { FormattedMessage, injectIntl } from 'react-intl'
import { checkToken } from '../../../utils/auth'
import Router from 'next/router'
import { currency } from '~/constants/index'

import CartItemSummary from '~/components/summary/CartItemSummary'
import Summary from '~/components/summary/Summary'

import confirm from '../../../components/Confirmable/confirm'

import './PurchaseOrder.scss'

const RelaxedGrid = styled(Grid)`
  margin-top: 1.5rem !important;
  padding-bottom: 50px !important;
`

class PurchaseOrder extends Component {
  componentDidMount() {
    this.props.getCart()
    this.props.getDeliveryAddresses()
    this.props.getPayments()
  }

  // handleIsEdit = (value) => {

  //   value === "isNew"
  //     ? this.props.dispatch(actions.reset('forms.shippingEdit'))
  //     : this.props.dispatch(actions.merge('forms.shippingEdit', {
  //       firstName: selectedAddress["first name"],
  //       lastName: selectedAddress["last name"],
  //       address: {
  //         streetAddress: selectedAddress.address.streetAddress,
  //         city: selectedAddress.address.city,
  //         province: selectedAddress.address.province.name
  //       },
  //       zipCode: selectedAddress.address.zip.zip,
  //       email: selectedAddress.email,
  //       phoneNumber: selectedAddress["phone number"]
  //     }));
  // }

  handleQuoteSelect = index => {
    let { shippingQuoteSelected, shippingQuotes } = this.props
    shippingQuoteSelected({ index, quote: shippingQuotes[index] })
  }

  getAddress = selectedAddressId => {
    let { deliveryAddresses } = this.props
    let selectedAddress = deliveryAddresses.find(i => i.id === selectedAddressId)

    this.props.shippingChanged({ selectedAddress })
    this.getShippingQuotes(selectedAddress)
  }

  getPayment = selectedPaymentId => {
    const { payments } = this.props
    const selectedPayment = payments.find(i => i.id === selectedPaymentId)
    this.props.shippingChanged({ selectedPayment })
  }

  getShippingQuotes = selectedAddress => {
    // TODO:: 'USA' to ID and variable
    this.props.getShippingQuotes(1, selectedAddress.address.zip.zip)
  }

  // toggleRadio = (name = 'isNewAddress') => {
  //   this.setState(prevState => ({
  //     [name]: !prevState[name]
  //   }))
  // }

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

  handlePurchase() {
    // TODO: do purchase
  }

  render() {
    const { dispatch, postNewDeliveryAddress, updateDeliveryAddress } = this.props
    let { cart, deliveryAddresses, payments, cartIsFetching, shippingQuotes, shipping } = this.props

    if (cartIsFetching) return <Spinner />

    return (
      <div className='app-inner-main'>
        <div className='header-top'>
          <Container fluid>
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
                    data-test='cart_purchase_back_btn'>
                    <Icon name='chevron left' />
                    <FormattedMessage id='cart.backToShoppingCart' defaultMessage='Back to Shopping Cart' />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Container>
        </div>

        <RelaxedGrid centered className='purchase-order'>
          <GridColumn computer={8}>
            {shipping.isShippingEdit ? (
              <ShippingEdit
                savedShippingPreferences={shipping.savedShippingPreferences}
                selectedAddress={shipping.selectedAddress}
                isNewAddress={shipping.isNewAddress}
                shippingChanged={this.props.shippingChanged}
                postNewDeliveryAddress={postNewDeliveryAddress}
                updateDeliveryAddress={updateDeliveryAddress}
                getStates={this.props.getStates}
                getProvinces={this.props.getProvinces}
                location={this.props.location}
                isFetching={this.props.isFetching}
              />
            ) : (
              <>
                <Shipping
                  deliveryAddresses={deliveryAddresses}
                  dispatch={dispatch}
                  shippingChanged={this.props.shippingChanged}
                  getAddress={this.getAddress}
                  selectedAddress={shipping.selectedAddress}
                />
              </>
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

                <ShippingQuote
                  currency={{ code: currency }}
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
          </GridColumn>

          <GridColumn computer={5}>
            <CartItemSummary cartItems={cart.cartItems} deleteCart={this.deleteCart} />

            <Summary
              additionalContent={
                <GridRow centered>
                  <GridColumn>
                    <Button fluid primary onClick={this.handleContinue} data-test='cart_purchase_place_order_btn'>
                      <FormattedMessage id='cart.placeOrder' defaultMessage='Place Order1' />
                    </Button>
                  </GridColumn>
                </GridRow>
              }
              handleContinue={this.handlePurchase}
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
  deleteCart: PropTypes.func,
  selectedAddressId: PropTypes.number,
  shippingQuotes: PropTypes.array
}
