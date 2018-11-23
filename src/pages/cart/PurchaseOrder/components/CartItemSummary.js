import React from 'react';
import PropTypes from "prop-types";

const CartItemSummary = ({cartItem,  removeProductFromCart, itemIndex}) => {
    const {productOffer} = cartItem;
    const location =`${productOffer.warehouse.address.city}, ${productOffer.warehouse.address.province.name}`;
    return (
      <div className="cart-item-summary">
        <table>
          <tbody>
            <tr><td className="title">Item {itemIndex}</td><td className="action"><span className="headerAddtext" onClick={() => removeProductFromCart(productOffer.id)}>remove</span></td></tr>
            <tr><td className="subtitle" colspan="2">{productOffer.product.casIndexName}</td></tr>
            <tr><td>Merchant</td><td>{productOffer.merchant.email}</td></tr>
            <tr><td>Location</td><td>{location}</td></tr>
            <tr><td>Quantity</td><td>{cartItem.quantity} packs</td></tr>
            <tr><td>Weight</td><td>{cartItem.quantity * productOffer.packaging.capacity} lbs</td></tr>
            <tr><td>Price per Lb</td><td>{productOffer.pricing.price}$</td></tr>
            <tr className="total"><td>Product Total</td><td>{cartItem.selectedOfferPrice}$</td></tr>
          </tbody>
        </table>
      </div>
    );
};

export default CartItemSummary;

CartItemSummary.propTypes = {
  cartItem: PropTypes.object,
  removeProductFromCart: PropTypes.func
}
