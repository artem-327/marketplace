import React, { Component } from 'react';
import './Switcher.css';

class Switcher extends Component {
  state = {
    checked: false
  }

  componentWillMount() {
    const checked = this.props.value;
    this.setState({ checked: checked });
  }

  componentWillReceiveProps(nextProps) {
    const checked = nextProps.value;
    this.setState({ checked: checked });
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked })
    if (this.props.onChange)
      this.props.onChange(this.state.checked);
  }

  render() {
    const sliderType = this.props.isRounded ? "slider round" : "slider"
    return (
      <div className="switch-container">
        <div className="switch-container">
          <label className="switch">
            <input type="checkbox" onChange={this.handleChange} checked={this.state.checked} />
            <span className={sliderType}></span>
          </label>
        </div>
      </div>
    )
  }
}

export default Switcher;




