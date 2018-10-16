import React from 'react';
import PropTypes from "prop-types";

const CartItemSummary = ({cartItem,  removeProductFromCart}) => {
    const {productOffer} = cartItem;
      //const location = productOffer.warehouse.address.province.name;
    return (
      <div className="cart-item-summary">
        <table>
          <tbody>
            <tr><td><b>{productOffer.product.casIndexName}</b></td><td><span className="remove" onClick={() => removeProductFromCart(productOffer.id)}>remove</span></td></tr>
            <tr><td>Merchant</td><td>{productOffer.merchant.email}</td></tr>
            <tr><td>Location</td><td></td></tr>
            <tr><td>Quantity</td><td>{cartItem.quantity} packs</td></tr>
            <tr><td>Weight</td><td>lbs</td></tr>
            <tr><td>Price per Lb</td><td>{productOffer.pricing.price}$</td></tr>
            <tr><td><b>Product Total</b></td><td><b>$</b></td></tr>
          </tbody>
        </table>
      </div>
    );
};

export default CartItemSummary;

CartItemSummary.propTypes = {
  cartItem: PropTypes.array,
  removeProductFromCart: PropTypes.func
}
