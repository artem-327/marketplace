import React from 'react';
import './Switcher.scss';

const Switcher = (props) => {
  const sliderType = props.isrounded ? "slider round" : "slider"
  const partlybrcColored = props.partlybrc ? "partlybrc-colored" : ""
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox"
          {...props}
        />
        <span className={`${sliderType} ${partlybrcColored}`}></span>
      </label>
    </div>
  );
};

export default Switcher;
