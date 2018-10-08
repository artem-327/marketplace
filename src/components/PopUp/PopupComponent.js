import React from 'react';
import PropTypes from "prop-types"
import PopupFooter from './PopupFooter'
import PopupHeader from './PopupHeader'
import './popupComponent.css'

const PopupComponent = ({removePopup, footerContinueText, headerTitle, children}) => {
    return (
        <div className="add-cart">
        <PopupHeader title={headerTitle} removePopup={removePopup} />
        <div className="add-cart-body">
          {children}
        </div>
        <PopupFooter continueText={footerContinueText} removePopup={removePopup} />
      </div>
    );
};

export default PopupComponent;


PopupComponent.propTypes = {
    continueText: PropTypes.string,
    headerTitle: PropTypes.string,
    children: PropTypes.node,
    removePopup: PropTypes.func
  }

  PopupComponent.defaultProps = {
    continueText: 'Continue'
  }