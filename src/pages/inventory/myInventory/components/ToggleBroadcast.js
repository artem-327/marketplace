import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class ToggleBroadcast extends Component {
  state = {
    active: this.props.broadcasted
  }

  toggleBroadcasted = offerId => {
    this.setState(
      prevState => ({
        active: !prevState.active
      }),
      () => axios.patch(`/prodex/api/product-offers/${offerId}/broadcast?broadcasted=${this.state.active}`)
    )
  }

  render() {
    const { offerId } = this.props
    return (
      <div className='brc-radio-wrapper'>
        <div className='label'>{this.state.active ? 'On' : 'Off'}</div>
        <div className='switch-container'>
          <label className='switch'>
            <span
              onClick={() => this.toggleBroadcasted(offerId)}
              className={`slider round ${this.state.active ? 'brc-radio active' : 'brc-radio'} `}
              data-test='my_inventory_toggle_broadcast_switch'
            />
          </label>
        </div>
      </div>
    )
  }
}

export default ToggleBroadcast

ToggleBroadcast.propTypes = {
  offerId: PropTypes.number
}
