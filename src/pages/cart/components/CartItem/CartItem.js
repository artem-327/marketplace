import React from 'react';
import PropTypes from "prop-types"

const CartItem = ({ headerTitle, children, edit, toggleShippingEdit }) => {
  return (
    <div className="shopping-cart-items">
      <header><h1>{headerTitle}<span className="headerAddtext" onClick={toggleShippingEdit}>{edit}</span></h1></header>
      {children}
    </div>
  );
};

export default CartItem;

CartItem.propTypes = {
  children: PropTypes.node,
  headerTitle: PropTypes.string,
  toggleShippingEdit: PropTypes.func,
  edit: PropTypes.string
}
