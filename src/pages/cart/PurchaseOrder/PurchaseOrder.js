import React, { Component } from 'react'
import PropTypes from "prop-types"
import { actions } from 'react-redux-form';
import { NavLink } from 'react-router-dom';
import SummaryTable from "../components/SummaryTable/SummaryTable"
import CartWrapper from "../components/CartWrapper/CartWrapper"
import Shipping from "./components/Shipping"
import ShippingEdit from "./components/ShippingEdit"
import Payment from "./components/Payment"
import CartItem from "../components/CartItem/CartItem"
import Button from '../../../components/Button/Button'
import CartItemSummary from './components/CartItemSummary'
import "./PurchaseOrder.css"

class PurchaseOrder extends Component {
  //TODO: maybe move internal state to redux? decide it later 
  state = {
    selectedAddress: {},
    selectedPayment: {},
    isShippingEdit: false,
    isNewAddress: "isNew"
  }

  componentDidMount(){
    this.props.fetchCartItems()
    this.props.fetchDeliveryAddresses()
    this.props.fetchPayments()
  }

  handleIsEdit = (value) => {
    const {selectedAddress} = this.state;
    this.setState({isNewAddress: value});

    value === "isNew"
    ? this.props.dispatch(actions.reset('forms.shippingEdit'))
    : this.props.dispatch(actions.merge('forms.shippingEdit', {
      firstName: selectedAddress["first name"],
      lastName: selectedAddress["last name"],
      address: {
        streetAddress: selectedAddress.address.streetAddress,
        city: selectedAddress.address.city,
        province: selectedAddress.address.province.name
      },
      zipCode: selectedAddress.address.zip.zip,
      email: selectedAddress.email,
      phoneNumber: selectedAddress["phone number"]
  }));
  }

  getAddress = (selectedAddressId) => {
    const {deliveryAddresses} = this.props;
    const selectedAddress = deliveryAddresses.find(i => i.id === selectedAddressId);
    this.setState({selectedAddress});
  }

  getPayment = (selectedPaymentId) => {
    const {payments} = this.props;
    const selectedPayment = payments.find(i => i.id === selectedPaymentId);
    this.setState({selectedPayment});
  }

  toggleShippingEdit = () => {
    this.setState(prevState => ({
      isShippingEdit: !prevState.isShippingEdit
    }));
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
    const {cartItems, deliveryAddresses, payments, dispatch, removeProductFromCart} = this.props;
    const itemContent = cartItems.map(cartItem => {
      return (
      <CartItemSummary 
        removeProductFromCart={removeProductFromCart} 
        cartItem={cartItem}
        key={cartItem.productOffer.id}
      />)
    });
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
            {this.state.isShippingEdit ? <ShippingEdit
                toggleShippingEdit={this.toggleShippingEdit}
                selectedAddress={this.state.selectedAddress}
                isNewAddress={this.state.isNewAddress}
                handleIsEdit={this.handleIsEdit}
              />
              : <Shipping
              deliveryAddresses={deliveryAddresses}
              dispatch={dispatch}
              toggleShippingEdit={this.toggleShippingEdit}
              getAddress={this.getAddress}
              selectedAddress={this.state.selectedAddress}
              />}
            <Payment
              dispatch={dispatch}
              selectedAddress={this.state.selectedAddress}
              selectedPayment={this.state.selectedPayment}
              payments={payments}
              getPayment={this.getPayment}
              />

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

PurchaseOrder.propTypes = {
  cartItem: PropTypes.object,
  deliveryAddresses: PropTypes.array,
  dispatch: PropTypes.func,
  fetchCartItems: PropTypes.func,
  fetchDeliveryAddresses: PropTypes.func,
  removeProductFromCart: PropTypes.func,
  selectedAddressId: PropTypes.number,
}
