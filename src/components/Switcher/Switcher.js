import React, { Component } from 'react';
import './Switcher.css';

class Switcher extends Component {
  render() {
    const sliderType = this.props.isRounded ? "slider round" : "slider"
    return (
      <div className="switch-container">
        <div className="switch-container">
          <label className="switch">
            <input 
              type="checkbox"
              {...this.props}
            />
            <span className={sliderType}></span>
          </label>
        </div>
      </div>
    )
  }
}

export default Switcher;




