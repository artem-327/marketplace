import React from 'react';
import PropTypes from "prop-types"

const CartItem = ({ headerTitle, children }) => {
  return (
    <div className="shopping-cart-items">
      <header><h1>{headerTitle}</h1></header>
      {children}
    </div>
  );
};

export default CartItem;

CartItem.propTypes = {
  children: PropTypes.node,
  headerTitle: PropTypes.string
}
