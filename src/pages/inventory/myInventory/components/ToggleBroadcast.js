import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class ToggleBroadcast extends Component {
  state = {
    active: this.props.broadcasted
  };

  toggleBroadcasted = offerId => {
    //axios.post(`api/broadcast-rules/enable-broadcast/${offerId}`);
    this.setState(prevState => ({
      active: !prevState.active
    }));
  };

  render() {
    const { offerId } = this.props;
    return (
      <div className="brc-radio-wrapper">
        <div className="label">{this.state.active ? "On" : "Off"}</div>
        <div className="switch-container">
          <label className="switch">
          <span
              onClick={() => this.toggleBroadcasted(offerId)}
              className={`slider round ${this.state.active ? "brc-radio active" : "brc-radio"} `}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default ToggleBroadcast;

ToggleBroadcast.propTypes = {
  offerId: PropTypes.number
};
