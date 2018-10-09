import React from 'react';
import PropTypes from "prop-types"

const CartHeader = ({removePopup, title}) => {
    return (
        <header className="add-cart-header">
          <h1>{title}</h1>
          <i className="fas fa-times close-mark" onClick={removePopup} />
        </header>
    );
};

export default CartHeader;

CartHeader.propTypes = {
    title: PropTypes.string,
    removePopup: PropTypes.func
  }