import React from 'react'
import PropTypes from "prop-types"

const CartFooter = ({continueText, removePopup}) => {
  return (
    <footer className="add-cart-footer">
      <button className="button" onClick={removePopup}>
        Cancel
      </button>
      <button className="button green">{continueText}</button>
    </footer>
  )
}

export default CartFooter

CartFooter.propTypes = {
  continueText: PropTypes.string,
  removePopup: PropTypes.func
}

CartFooter.defaultProps = {
  continueText: 'Continue'
}
