import React from 'react';
import './Switcher.css';

const Switcher = (props) => {
  const sliderType = props.isrounded ? "slider round" : "slider"
  const partlyColored = props.partly ? "partly-colored" : ""
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox"
          {...props}
        />
        <span className={`${sliderType} ${partlyColored}`}></span>
      </label>
    </div>
  );
};

export default Switcher;
