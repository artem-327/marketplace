import React from 'react';
import './threeDots.css';
import PropTypes from "prop-types";

const ThreeDots = props => {
        return <div className="open-menu"><span className={"threeDots " + (props.className || '')}></span></div>
};

ThreeDots.propTypes = {
    className: PropTypes.string,
};

export default ThreeDots;