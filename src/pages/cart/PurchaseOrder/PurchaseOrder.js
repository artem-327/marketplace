import React, { Component } from 'react'
import PropTypes from "prop-types"
import { actions } from 'react-redux-form';
import { NavLink } from 'react-router-dom';
import SummaryTable from "../components/SummaryTable/SummaryTable"
import Shipping from "./components/Shipping"
import ShippingEdit from "./components/ShippingEdit"
import Payment from "./components/Payment"
import CartItemSummary from './components/CartItemSummary'
import Button from '../../../components/Button/Button'
import Spinner from '../../../components/Spinner/Spinner'
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
    this.props.fetchCart()
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
    const {totalPrice} = this.props.cart;
    return (
      <table>
        <tbody>
          <tr><td>Subtotal</td><td>$111</td></tr>
          <tr><td>Estimated Shipping</td><td>$111</td></tr>
          <tr><td>Estimated Tax</td><td>$111</td></tr>
          <tr><td><b>Total</b></td><td>${totalPrice}</td></tr>
        </tbody>
      </table>
    )
  }

  render() {
    const {cart, deliveryAddresses, payments, dispatch, removeProductFromCart, cartIsFetching, createDeliveryAddress} = this.props;
    if (cartIsFetching) return <Spinner />
    const itemContent = cart.orders.map(cartItem => {
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
        <div className="shopping-cart">
          <h1 className='header inv-header'>Purchase Order</h1>
          <div className="shopping-cart-body">

          <div>
            {this.state.isShippingEdit ? <ShippingEdit
                toggleShippingEdit={this.toggleShippingEdit}
                selectedAddress={this.state.selectedAddress}
                isNewAddress={this.state.isNewAddress}
                handleIsEdit={this.handleIsEdit}
                createDeliveryAddress={createDeliveryAddress}
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

            <div className="shopping-cart-items">
              <header><h1>3. Terms and Agreement</h1></header>
              <div className="purchase-order-section">
                <div>Legal Language</div>
                <div>Terms and Agreement</div>
                <footer className="popup-footer">
                  <Button color="blue">Place order</Button>
                </footer>
                </div>
            </div>

          </div>
          <div>
            <SummaryTable title="Summary">
              {this.renderSummary()}
            </SummaryTable>
            <SummaryTable title="Your Cart">
              {itemContent}
            </SummaryTable>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PurchaseOrder;

PurchaseOrder.propTypes = {
  cartItem: PropTypes.object,
  deliveryAddresses: PropTypes.array,
  dispatch: PropTypes.func,
  fetchCart: PropTypes.func,
  fetchDeliveryAddresses: PropTypes.func,
  removeProductFromCart: PropTypes.func,
  selectedAddressId: PropTypes.number,
}
