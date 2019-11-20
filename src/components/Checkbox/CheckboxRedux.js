import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from './Checkbox'
import { actions } from 'react-redux-form'

class CheckboxRedux extends Component {
  handleChange(value) {
    const { model, dispatch } = this.props
    dispatch(actions.change(model, value))
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    return (
      <Checkbox
        label={this.props.label}
        name={this.props.name}
        style={this.props.style}
        defaultValue={this.props.defaultValue}
        onChange={value => this.handleChange(value)}
        data-test='CheckboxRedux_chckb'
      />
    )
  }
}

CheckboxRedux.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.string,
  onChange: PropTypes.func,
  model: PropTypes.string,
  defaultValue: PropTypes.bool,
  dispatch: PropTypes.func
}

export default CheckboxRedux
