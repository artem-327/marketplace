import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class WarningLabel extends Component {
  render() {
    return this.props.isVisible ? (
      <div className='warningLabel'>
        <span className='warningBody'>
          <span className='warning-icon'>!</span>
          <label>{this.props.warningText}</label>
          <div className='clearfix'></div>
        </span>
      </div>
    ) : null
  }
}

WarningLabel.propTypes = {
  warningText: PropTypes.string,
  isVisible: PropTypes.bool
}
