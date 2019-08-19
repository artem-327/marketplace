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
import { Container, Menu, Header, Button, Icon } from 'semantic-ui-react'
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

  editCart = (cartItem) => {
    let { id, quantity } = cartItem
    this.props.getProductOffer(cartItem.productOffer.id, true)
    this.props.sidebarChanged({ isOpen: true, id, quantity })
  }

  render() {
    const { cart, deleteCartItem, history, cartIsFetching, sidebarChanged } = this.props
    let { cartItems, totalPrice } = cart

    if (cartIsFetching) return <Spinner />
    const itemContent = cart.cartItems && cart.cartItems.map(cartItem => {
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
              <ArrayToMultiple values={cartItem.productOffer.product.casProducts.map(d => (d.casProduct.casNumber + ' ' + d.casProduct.chemicalName))} />
            }
          />
        </>
      )
    })
    const itemsNumber = cart.cartItems ? cart.cartItems.length : 0
    const headerTitle = <FormattedMessage id='cart.shoppingCartHeader' defaultMessage={`Items (${itemsNumber})`} values={{ number: itemsNumber }} />

    return (
      <div className='app-inner-main flex stretched'>
        <div className='header-top' style={{padding: '0 32px', zIndex: 10, backgroundColor: '#FFF'}}>
          <Container fluid>
            <Menu secondary>
              <Menu.Item header>
                <Header as='h1' size='medium'>
                  <FormattedMessage id='cart.shoppingCart'
                    defaultMessage='SHOPPING CART' />
                </Header>
              </Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item>
                  <Button icon basic labelPosition='left' data-test="shopping_cart_back_btn" onClick={() => { Router.push('/marketplace/all') }}>
                    <Icon name='chevron left' />
                    <FormattedMessage id='cart.backToProductPurchaseInfo'
                      defaultMessage='Back to Product/Purchase info' />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Container>
        </div>
        <div className='shopping-cart flex stretched' style={{overflow: 'auto'}}>
          <div className='shopping-cart-body'>
            <div className='shopping-cart-items'>
              <header><h2>{headerTitle}</h2></header>
              {itemContent}
            </div>
            <div>

              <Summary cart={this.props.cart} totalPrice={totalPrice} />

              {cartItems.length > 0 ?
                <MargedButton fluid primary data-test="shopping_cart_continue" onClick={this.handleContinue}>
                  <FormattedMessage
                    id='global.continue'
                    defaultMessage='Continue'
                  />
                </MargedButton>
                : null}

              <KeepShoppingPopup
                handleClose={() => this.setState({ modalOpen: false })}
                handleContinue={this.handleContinueShopping}
                open={this.state.modalOpen}
                trigger={
                  <Button size='large' basic fluid color='blue' data-test="shopping_cart_keep_shopping_btn" onClick={() => this.props.sidebarChanged({ isOpen: !this.props.sidebar.isOpen })}>
                    <FormattedMessage
                      id='cart.keepShopping'
                      defaultMessage='Keep Shopping'
                    />
                  </Button>
                } />
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
  deleteCartItem: func,
}
