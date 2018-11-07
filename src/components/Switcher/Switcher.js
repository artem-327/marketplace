import React from 'react';
import './Switcher.css';

const Switcher = (props) => {
  const sliderType = props.isrounded ? "slider round" : "slider"
  return (
    <div className="switch-container">
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox"
          {...props}
        />
        <span className={sliderType}></span>
      </label>
    </div>
  </div>
  );
};

export default Switcher;
