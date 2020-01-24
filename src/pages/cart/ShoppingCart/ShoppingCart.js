import './ShoppingCart.scss'

import React, { Component } from 'react'
import { func, array, object } from 'prop-types'

import ItemCartBody from '../components/ItemCartBody/ItemCartBody'
import AddCart from '../components/AddCart'
import Summary from '~/components/summary/Summary'
import KeepShoppingPopup from '../components/KeepShoppingPopup/KeepShoppingPopup'
import Spinner from '../../../components/Spinner/Spinner'

import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { checkToken } from '../../../utils/auth'
import { Container, Menu, Header, Button } from 'semantic-ui-react'
import Router from 'next/router'
import { ArrayToMultiple } from '~/components/formatted-messages'

const MargedButton = styled(Button)`
  margin: 14px 0px 14px 0px !important;
`

export default class ShoppingCart extends Component {
  state = {
    modalOpen: false
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleContinueShopping = () => {
    this.props.removePopup()
    Router.push('/marketplace/all')
  }

  handleContinue = () => {
    if (checkToken(this.props)) return
    Router.push('/purchase-order')
  }

  editCart = cartItem => {
    let { id, pkgAmount } = cartItem
    this.props.getProductOffer(cartItem.productOffer.id, true)
    this.props.sidebarChanged({ isOpen: true, id, pkgAmount })
  }

  render() {
    const { cart, deleteCartItem, history, cartIsFetching, sidebarChanged } = this.props
    let { cartItems, cfPriceSubtotal } = cart

    if (cartIsFetching) return <Spinner />
    const itemContent =
      cart.cartItems &&
      cart.cartItems.map(cartItem => {
        return (
          <>
            <ItemCartBody
              editCart={this.editCart}
              sidebarChanged={sidebarChanged}
              history={history}
              location={this.props.location}
              key={cartItem.id}
              cartItem={cartItem}
              deleteCartItem={deleteCartItem}
              casNumberChemName={
                <ArrayToMultiple
                  values={cartItem.productOffer.companyProduct.echoProduct.elements.map(d => {
                    return d.proprietary ? d.displayName : d.displayName + ' - ' + d.casProduct.casNumber
                  })}
                />
              }
            />
          </>
        )
      })
    const itemsNumber = cart.cartItems ? cart.cartItems.length : 0
    const headerTitle = (
      <FormattedMessage
        id='cart.shoppingCartHeader'
        defaultMessage={`Items (${itemsNumber})`}
        values={{ number: itemsNumber }}
      />
    )

    return (
      <div className='app-inner-main flex stretched'>
        <div className='shopping-cart flex stretched' style={{ overflow: 'auto' }}>
          <div className='shopping-cart-body' style={{ width: '83.25%' }}>
            <div className='shopping-cart-items'>
              <header style={{ backgroundColor: '#e7e7e7', padding: '14px 24px' }}>
                <div className='ui header'>{headerTitle}</div>
              </header>
              {itemContent}
            </div>
            <div>
              <Summary cart={this.props.cart} totalPrice={cfPriceSubtotal} />

              {cartItems.length > 0 ? (
                <MargedButton fluid primary data-test='shopping_cart_continue' onClick={this.handleContinue}>
                  <FormattedMessage id='global.continue' defaultMessage='Continue'>
                    {text => text}
                  </FormattedMessage>
                </MargedButton>
              ) : null}

              <KeepShoppingPopup
                handleClose={() => this.setState({ modalOpen: false })}
                handleContinue={this.handleContinueShopping}
                open={this.state.modalOpen}
                trigger={
                  <Button
                    basic
                    fluid
                    primary
                    data-test='shopping_cart_keep_shopping_btn'
                    onClick={() => Router.push('/marketplace/all')}>
                    <FormattedMessage id='cart.keepShopping' defaultMessage='Keep Shopping'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                }
              />
            </div>
            {this.props.sidebar && this.props.sidebar.id ? <AddCart isEdit={true} /> : null}
          </div>
        </div>
      </div>
    )
  }
}

ShoppingCart.propTypes = {
  addPopup: func,
  cartItem: array,
  history: object,
  deleteCartItem: func
}
