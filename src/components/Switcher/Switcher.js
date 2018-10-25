import React, { Component } from 'react';
import './Switcher.css';

class Switcher extends Component {
  state = {
    checked: false
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.defaultValue){
          this.setState({checked: nextProps.defaultValue})
      }
  }

  handleChange = () => {
      this.setState({checked: !this.state.checked}, ()=>{
          this.props.onChange(this.state.checked);
      });
  }

  render() {
    const sliderType = this.props.isRounded ? "slider round" : "slider"
    return (
      <div className="switch-container">
        <div className="switch-container">
          <label className="switch">
            <input type="checkbox" onChange={(e) => {this.handleChange(e)}} checked={this.state.checked} />
            <span className={sliderType}></span>
          </label>
        </div>
      </div>
    )
  }
}

export default Switcher;




