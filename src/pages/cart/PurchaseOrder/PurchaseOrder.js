import React, { Component } from 'react'
import PropTypes from "prop-types"
import { actions } from 'react-redux-form';
import { NavLink } from 'react-router-dom';
import SummaryTable from "../components/SummaryTable/SummaryTable"
import Shipping from "./components/Shipping"
import ShippingEdit from "./components/ShippingEdit"
import ShippingQuote from "./components/ShippingQuote"
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
    this.props.getCart()
    this.props.getDeliveryAddresses()
    this.props.getPayments()
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
    this.getShippingQuotes(selectedAddress);
  }

  getPayment = (selectedPaymentId) => {
    const {payments} = this.props;
    const selectedPayment = payments.find(i => i.id === selectedPaymentId);
    this.setState({selectedPayment});
  }

  getShippingQuotes = (selectedAddress) => {
    this.props.getShippingQuotes('USA', selectedAddress.address.zip.zip);
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
    const {cart, deliveryAddresses, payments, dispatch, deleteCart, cartIsFetching, postNewDeliveryAddress, putDeliveryAddressEdit, shippingQuotes} = this.props;
    if (cartIsFetching) return <Spinner />
    let index = 0;
    const itemContent = cart.orders.map(cartItem => {
      return (
      <CartItemSummary
        deleteCart={deleteCart}
        cartItem={cartItem}
        key={cartItem.productOffer.id}
        itemIndex={++index}
      />)
    });
    return (
      <div className="app-inner-main">
        <div className="header-top">
          <h1 className='header inv-header'>PURCHASE ORDER</h1>
          <div className="submenu">
            <div className="link">
              <NavLink to="/inventory/all-inventory">
                <i className="arrow-left"></i>
                <b> Back to Product Offerings</b>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="shopping-cart">
          <div className="shopping-cart-body">

          <div>
            {this.state.isShippingEdit ? <ShippingEdit
                toggleShippingEdit={this.toggleShippingEdit}
                selectedAddress={this.state.selectedAddress}
                isNewAddress={this.state.isNewAddress}
                handleIsEdit={this.handleIsEdit}
                postNewDeliveryAddress={postNewDeliveryAddress}
                putDeliveryAddressEdit={putDeliveryAddressEdit}
              />
              : <Shipping
              deliveryAddresses={deliveryAddresses}
              dispatch={dispatch}
              toggleShippingEdit={this.toggleShippingEdit}
              getAddress={this.getAddress}
              selectedAddress={this.state.selectedAddress}
              />}
            <ShippingQuote
              shippingQuotes={shippingQuotes}
              />
            <Payment
              dispatch={dispatch}
              selectedAddress={this.state.selectedAddress}
              selectedPayment={this.state.selectedPayment}
              payments={payments}
              getPayment={this.getPayment}
              />

            <div className="shopping-cart-items">
              <header><h2>4. Terms and Agreement</h2></header>
              <div className="purchase-order-section">
                <div>Legal Language</div>
                <div>Terms and Agreement</div>
                </div>
            </div>

          </div>
          <div className="summary-tables">
            <SummaryTable title="Your Order">
              {itemContent}
            </SummaryTable>
            <SummaryTable title="Summary">
              {this.renderSummary()}
              <footer className="summary-footer">
                  <Button color="blue">Place order</Button>
              </footer>
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
  getCart: PropTypes.func,
  getDeliveryAddresses: PropTypes.func,
  deleteCart: PropTypes.func,
  selectedAddressId: PropTypes.number,
}
