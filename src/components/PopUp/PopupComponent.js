import React from 'react';
import PropTypes from "prop-types"
import './popupComponent.css'

const PopupComponent = ({removePopup, footerContinueText, headerTitle, children, handleContinue}) => {
    return (
        <div className="popup-component">
        <header className="add-cart-header">
          <h1>{headerTitle}</h1>
          <i className="fas fa-times close-mark" onClick={removePopup} />
        </header>
        <div className="popup-component-body">
          {children}
        </div>

        <footer className="add-cart-footer">
          <button className="button" onClick={removePopup}>
            Cancel
          </button>
          <button className="button green" onClick={handleContinue}>
            {footerContinueText}
          </button>
        </footer>
      </div>
    );
};

export default PopupComponent;


PopupComponent.propTypes = {
    footerContinueText: PropTypes.string,
    headerTitle: PropTypes.string,
    children: PropTypes.node,
    removePopup: PropTypes.func,
    handleContinue: PropTypes.func,
  }

  PopupComponent.defaultProps = {
    footerContinueText: 'Continue'
  }