import React from 'react'
import PropTypes from "prop-types"
import PopupComponent from '../../../../components/PopUp/PopupComponent'

const KeepShopping = ({removePopup, handleContinue}) => {
  return (
    <PopupComponent removePopup={removePopup} handleContinue={handleContinue} footerContinueText="Yes" headerTitle="KEEP SHOPPING?">
      <p>You can only add items from the same merchant and same location to a single purchase order.</p>
      <p>Would you like to continue?</p>
    </PopupComponent>
  )
}

export default KeepShopping

KeepShopping.propTypes = {
    removePopup: PropTypes.func
  }