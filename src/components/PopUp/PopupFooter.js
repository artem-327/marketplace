import React from 'react'
import PropTypes from 'prop-types'

const PopupFooter = ({continueText, removePopup, handleContinue}) => {
  return (
    <footer className="add-cart-footer">
      <button className="button" onClick={removePopup}>
        Cancel
      </button>
      <button className="button green" onClick={handleContinue}>
        {continueText}
      </button>
    </footer>
  )
}

export default PopupFooter

PopupFooter.propTypes = {
  continueText: PropTypes.string,
  removePopup: PropTypes.func,
  handleContinue: PropTypes.func
}

PopupFooter.defaultProps = {
  continueText: 'Continue'
}
