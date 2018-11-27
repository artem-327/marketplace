import React, { Component } from 'react'
import PropTypes from "prop-types";
import "./ShoppingCart.css"
import SummaryTable from "../components/SummaryTable/SummaryTable"
import ItemCartBody from "../components/ItemCartBody/ItemCartBody"
import KeepShoppingPopup from "../components/KeepShoppingPopup/KeepShoppingPopup"
import Spinner from '../../../components/Spinner/Spinner'
import Button from '../../../components/Button/Button'
import {NavLink} from 'react-router-dom'

class ShoppingCart extends Component {
  componentDidMount(){
    this.props.getCart()
  }

  handleContinueShopping = () => {
    this.props.removePopup()
    this.props.history.push("/inventory/all-inventory")
  }

  handleContinue = () => {
    this.props.history.push("/cart/purchase-order")
  }

  keepShopping = () => {
    const {addPopup, removePopup} = this.props
    addPopup(<KeepShoppingPopup removePopup={removePopup} handleContinue={this.handleContinueShopping}/>)
  }

  renderSummary() {
    const {totalPrice} = this.props.cart;
    return (
      <table>
        <tbody>
          <tr><td>Subtotal</td><td>${totalPrice}</td></tr>
          <tr><td>Estimated Shipping</td><td></td></tr>{/* TODO: change the fake price */}
          <tr><td>Estimated Tax</td><td></td></tr>{/* TODO: change the fake price */}
          <tr className="total"><td>Total</td><td>${totalPrice}</td></tr>
        </tbody>
      </table>
    )
  }

  render() {
    const {cart, deleteCart, history, addPopup, cartIsFetching} = this.props;
    if (cartIsFetching) return <Spinner />
    const itemContent = cart.orders && cart.orders.map(cartItem => {
    return (
      <ItemCartBody
        addPopup={addPopup}
        history={history}
        key={cartItem.id}
        cartItem={cartItem}
        deleteCart={deleteCart}
        />)
  });
    const itemsNumber = cart.orders ? cart.orders.length : 0;
    const headerTitle = `Items (${itemsNumber})`
    return (
      <div className="app-inner-main">
      <div className='header-top'>
          <h1 className='header inv-header'>PRODUCT OFFERINGS</h1>
          <div className="submenu">
              <div className="link">
                  <NavLink to={'/inventory/all-inventory'}>
                      <i className="arrow-left"></i>
                      <b>Back to Product/Purchase info</b>
                  </NavLink>
              </div>
          </div>
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
                <Button size="large" color="light-blue"onClick={this.keepShopping}>Keep Shopping</Button>
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
