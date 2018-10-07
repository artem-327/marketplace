import React from 'react'
import PropTypes from "prop-types"
import PopupComponent from '../PopUp/PopupComponent'

const KeepShopingPopup = ({removePopup}) => {
  return (
    <PopupComponent removePopup={removePopup} footerContinueText="Yes" headerTitle="KEEP SHOPPING?">
      <p>You can only add items from the same merchant and same location to a single purchase order.</p>
      <p>Would you like to continue?</p>
    </PopupComponent>
  )
}

export default KeepShopingPopup

KeepShopingPopup.propTypes = {
    removePopup: PropTypes.func
  }