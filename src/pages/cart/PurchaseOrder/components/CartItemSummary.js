import React from 'react';

const CartItemSummary = ({cartItem}) => {
    const {productOffer} = cartItem;
      //const location = productOffer.warehouse.address.province.name;
    return (
        <table>
        <tbody>
          <tr><td><b>{productOffer.product.casIndexName}</b></td><td>remove</td></tr>
          <tr><td>Merchant</td><td>{productOffer.merchant.email}</td></tr>
          <tr><td>Location</td><td></td></tr>
          <tr><td>Quantity</td><td>{cartItem.quantity} packs</td></tr>
          <tr><td>Weight</td><td>lbs</td></tr>
          <tr><td>Price per Lb</td><td>{productOffer.pricing.price}$</td></tr>
          <tr><td><b>Product Total</b></td><td><b>$</b></td></tr>
        </tbody>
      </table>
    );
};

export default CartItemSummary;