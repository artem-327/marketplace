import React, { Component } from 'react'
import "./ShoppingCart.css"
import SummaryTable from "../SummaryTable/SummaryTable"
import CartItem from "../CartItem/CartItem"
import Button from '../../../components/Button/Button'

class ShoppingCart extends Component {
  componentDidMount(){
    this.props.fetchCartItems()
  }
  render() {
    const {cartItems} = this.props;
    const CartItems = cartItems.map(cartItem => <CartItem key={cartItem.productOffer.id} cartItem={cartItem}/>);
    const itemsNumber = cartItems.length;
    return (
      <React.Fragment>
      <div className="submenu">
        <div className="submenu-link"> 
          <i className="fas fa-angle-left"></i>
          <b> Back to Product/Purchase info</b>
        </div>
      </div>
      <div className="shopping-cart">
        <h1 className='header inv-header'>PRODUCT OFFERINGS</h1>
        <div className="shopping-cart-body">
          <div className="shopping-cart-items">
            <header><h1>Items ({itemsNumber})</h1></header>
            {CartItems}
          </div>
          <div>
            <SummaryTable />
            <Button size="large" color="light-blue">Keep Shopping</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
    )
  }
}


export default ShoppingCart;