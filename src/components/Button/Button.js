import React from 'react';
import PropTypes from "prop-types"
import classnames from 'classnames';
import "./Button.css"

const Button = ({ size, color, children, rounded, ...props }) => {
    const roundedBtn = rounded ? `rounded-${rounded}` : "";
    const sizeBtn = size ? `size-${size}` : "";

    return (
        <button className={classnames(`button ${color} ${sizeBtn} ${roundedBtn}`)} {...props}>
            {children}
        </button>
    );
};

export default Button;

Button.propTypes = {
    size: PropTypes.oneOf(['medium', 'large', "large-2x"]),
    rounded: PropTypes.oneOf(['down', 'up', 'no']),
};


Button.defaultProps = {
    size: "medium",
}