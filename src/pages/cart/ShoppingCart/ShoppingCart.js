import React, { Component } from 'react'
import PropTypes from "prop-types";
import "./ShoppingCart.css"
import SummaryTable from "../components/SummaryTable/SummaryTable"
import CartWrapper from "../components/CartWrapper/CartWrapper"
import Button from '../../../components/Button/Button'
import CartItem from "../components/CartItem/CartItem"
import ItemCartBody from "../components/ItemCartBody/ItemCartBody"
import KeepShoppingPopup from "../components/KeepShoppingPopup/KeepShoppingPopup"

class ShoppingCart extends Component {
  componentDidMount(){
    this.props.fetchCartItems()
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

  renderSummary(){
    return (
      <table>
        <tbody>
          <tr><td>Subtotal</td><td>$111</td></tr>
          <tr><td>Estimated Shipping</td><td>$111</td></tr>
          <tr><td>Estimated Tax</td><td>$111</td></tr>
          <tr><td><b>Total</b></td><td>$111</td></tr>
        </tbody>
      </table>
    )
  }

  render() {
    const {cartItems, removeProductFromCart} = this.props;
    const itemContent = cartItems.map(cartItem => <ItemCartBody key={cartItem.productOffer.id} cartItem={cartItem} removeProductFromCart={removeProductFromCart}/>);
    const itemsNumber = cartItems.length;
    const headerTitle = `Items (${itemsNumber})`
    return (
      <div className="app-inner-main">
      <div className="submenu">
        <div className="submenu-link">
          <i className="fas fa-angle-left"></i>
          <b> Back to Product/Purchase info</b>
        </div>
      </div>
      <CartWrapper mainTitle="PRODUCT OFFERINGS">
        <CartItem headerTitle={headerTitle}>
          {itemContent}
        </CartItem>
        <div>
          <SummaryTable title="Summary" hasButton={true} handleContinue={this.handleContinue}>
            {this.renderSummary()}
          </SummaryTable>
          <Button size="large" color="light-blue"onClick={this.keepShopping}>Keep Shopping</Button>
        </div>
      </CartWrapper>
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
  removeProductFromCart: PropTypes.func,
}
