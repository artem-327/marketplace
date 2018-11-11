import React, { Component } from "react";
import PropTypes from "prop-types"
import axios from "axios";

class ToggleBroadcast extends Component {
  state = { 
    active: this.props.broadcasted 
  };

  toggleBroadcasted = offerId => {
    axios.post(`api/broadcast-rules/enable-broadcast/${offerId}`);
    this.setState(prevState => ({
      active: !prevState.active
    }));
  };

  render() {
    const { offerId } = this.props;
    return (
      <div className="brc-radio-wrapper">
        <div
          onClick={() => this.toggleBroadcasted(offerId)}
          className={this.state.active ? "brc-radio active" : "brc-radio"}
        />
      </div>
    );
  }
}

export default ToggleBroadcast;

ToggleBroadcast.propTypes = {
  offerId: PropTypes.number
};
