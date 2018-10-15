import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import SummaryTable from "../components/SummaryTable/SummaryTable"
import CartWrapper from "../components/CartWrapper/CartWrapper"
import Shipping from "./components/Shipping"
import CartItem from "../components/CartItem/CartItem"
import Button from '../../../components/Button/Button'
import CartItemSummary from './components/CartItemSummary'
import "./PurchaseOrder.css"

class PurchaseOrder extends Component {
  componentDidMount(){
    this.props.fetchCartItems()
    this.props.fetchDeliveryAddresses()
  }
  //TODO:: same function in Shopping cart, define it just at one place   
  renderSummary() {
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

  renderCartSummary() {
    return (
      <table>
        <tbody>
          <tr><td>Name</td><td>remove</td></tr>
          <tr><td>Merchant</td><td></td></tr>
          <tr><td>Location</td><td></td></tr>
          <tr><td>Quantity</td><td>packs</td></tr>
          <tr><td>Weight</td><td>lbs</td></tr>
          <tr><td>Price per Lb</td><td>$</td></tr>
          <tr><td><b>Product Total</b></td><td><b>$</b></td></tr>
        </tbody>
      </table>
    )
  }

  render() {
    const {cartItems} = this.props;
    const itemContent = cartItems.map(cartItem => <CartItemSummary  cartItem={cartItem}/>);
    return (
      <div className="app-inner-main">
        <div className="submenu">
          <NavLink to="/inventory/all-inventory">
            <div className="submenu-link">
              <i className="fas fa-angle-left"></i>
              <b> Back to Product Offerings</b>
            </div>
          </NavLink>
        </div>
        <CartWrapper mainTitle="Purchase Order">
          <div>
            <Shipping warehouses={this.props.warehouses} dispatch={this.props.dispatch}/>

            <CartItem headerTitle="2. Payment">
              <div className="purchase-order-section">
                <div>Payment Method</div>
                <div>Billing Info</div></div>
            </CartItem>

            <CartItem headerTitle="3. Terms and Agreement">
              <div className="purchase-order-section">
                <div>Legal Language</div>
                <div>Terms and Agreement</div>
                <footer className="add-cart-footer">
                  <Button color="blue">Place order</Button>
                </footer>
                </div>  
            </CartItem>

          </div>
          <div>
            <SummaryTable title="Summary">
              {this.renderSummary()}
            </SummaryTable>
            <SummaryTable title="Your Cart">
              {itemContent}
            </SummaryTable>
          </div>
        </CartWrapper></div>
    )
  }
}

export default PurchaseOrder;
