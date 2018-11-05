import React from 'react';
import './Switcher.css';

const Switcher = (props) => {
  const sliderType = props.isrounded ? "slider round" : "slider"
  const partlyBrcColored = props.partlyBrc ? "partlyBrc-colored" : ""
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox"
          {...props}
        />
        <span className={`${sliderType} ${partlyBrcColored}`}></span>
      </label>
    </div>
  );
};

export default Switcher;
