import React from 'react';
import PropTypes from "prop-types"

const InputControlled = ({name, value, handleChange, ...props}) => {
    return (
        <input 
          name={name} 
          value={value} 
          onChange={(e => handleChange(e))}
          {...props}
        />
    );
};

export default InputControlled;

InputControlled.propTypes = {
    handleChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
};
