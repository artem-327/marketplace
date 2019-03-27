import React from 'react';
import PropTypes from "prop-types"
import './popupComponent.scss'
import PerfectScrollbar from 'react-perfect-scrollbar';

const PopupComponent = ({removePopup, headerTitle, children, footerComponent}) => {
    return (
        <div className="popup-component">
        <header>
          <h1>{headerTitle}</h1>
          <i className="fas fa-times close-mark" onClick={removePopup} />
        </header>
        <div className="popup-component-body">
          <PerfectScrollbar>
            {children}
          </PerfectScrollbar>
        </div>

        <footer className="popup-footer">
          {footerComponent}
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
    headerTitle: ''
  }