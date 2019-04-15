import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./ShoppingCart.scss"
import SummaryTable from "../components/SummaryTable/SummaryTable"
import ItemCartBody from "../components/ItemCartBody/ItemCartBody"
import KeepShoppingPopup from "../components/KeepShoppingPopup/KeepShoppingPopup"
import Spinner from '../../../components/Spinner/Spinner'
import {FormattedMessage} from 'react-intl'
import {checkToken} from "../../../utils/auth"
import { Container, Menu, Header, Button, Icon } from "semantic-ui-react"
import Router from 'next/router'

class ShoppingCart extends Component {
  componentDidMount(){
    this.props.getCart()
  }

  handleContinueShopping = () => {
    this.props.removePopup()
    Router.push("/marketplace/all")
  }

  handleContinue = () => {
    if (checkToken(this.props)) return;
    Router.push("/purchase-order")
  }

  keepShopping = () => {
    const {addPopup, removePopup} = this.props;
    addPopup(<KeepShoppingPopup removePopup={removePopup} handleContinue={this.handleContinueShopping}/>)
  };

  renderSummary() {
    const {totalPrice} = this.props.cart;
    const {symbol} = this.props.identity.preferredCurrency
    return (
      <table>
        <tbody>
          <tr>
              <td>
                  <FormattedMessage
                    id='cart.subtotal'
                    defaultMessage='Subtotal'
                  />
              </td>
              <td>{symbol}{totalPrice.formatMoney(3)}</td>
          </tr>
          <tr>
              <td>
                  <FormattedMessage
                    id='cart.estimatedShipping'
                    defaultMessage='Estimated Shipping'
                  />
              </td>
              <td></td>
          </tr>{/* TODO: change the fake price */}
          <tr>
              <td>
                  <FormattedMessage
                    id='cart.estimatedTax'
                    defaultMessage='Estimated Tax'
                  />
              </td><td></td></tr>{/* TODO: change the fake price */}
          <tr className="total">
              <td>
                  <FormattedMessage
                    id='cart.total'
                    defaultMessage='Total'
                  />
              </td>
              <td>{symbol}{totalPrice.formatMoney(3)}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    const {cart, deleteCart, history, addPopup, removePopup, cartIsFetching} = this.props;
    if (cartIsFetching) return <Spinner />
    const itemContent = cart.cartItems && cart.cartItems.map(cartItem => {
      return (
        <ItemCartBody
          addPopup={addPopup}
          removePopup={removePopup}
          history={history}
          location={this.props.location}
          key={cartItem.id}
          cartItem={cartItem}
          deleteCart={deleteCart}
        />)
    });
    const itemsNumber = cart.cartItems ? cart.cartItems.length : 0;
    const headerTitle = <FormattedMessage id='cart.shoppingCartHeader' defaultMessage={`Items (${itemsNumber})`} values={{number: itemsNumber}} />

    return (
      <div className="app-inner-main">
        <div className='header-top'>
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
                  <Button icon basic labelPosition='left' onClick={() => { Router.push('/marketplace/all') }}>
                    <Icon name='chevron left' />
                    <FormattedMessage id='cart.backToProductPurchaseInfo'
                                      defaultMessage='Back to Product/Purchase info' />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Container>
        </div>
        <div className="shopping-cart">
          <div className="shopping-cart-body">
            <div className="shopping-cart-items">
              <header><h2>{headerTitle}</h2></header>
              {itemContent}
            </div>
            <div className="shopping-cart-summary">
              <SummaryTable title="Summary" hasButton={itemsNumber ? true : false} handleContinue={this.handleContinue}>
                {this.renderSummary()}
              </SummaryTable>
              <Button size="large" basic fluid color="blue" onClick={this.keepShopping}>
                <FormattedMessage
                  id='cart.keepShopping'
                  defaultMessage='Keep Shopping'
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart;

ShoppingCart.propTypes = {
  addPopup: PropTypes.func,
  cartItem: PropTypes.array,
  history: PropTypes.object,
  removePopup: PropTypes.func,
  deleteCart: PropTypes.func,
}
