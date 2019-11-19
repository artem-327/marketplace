import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Control, actions } from 'react-redux-form'
import ComboBox from './ComboBox'

class ComboBoxRedux extends Component {
  handleChange(value) {
    const { model, dispatch } = this.props
    dispatch(actions.change(model, value))
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    return (
      <Control
        className={this.props.className}
        limit={this.props.limit}
        label={this.props.label}
        model={this.props.model}
        placeholder={this.props.placeholder}
        component={ComboBox}
        disabled={this.props.disabled}
        validators={this.props.validators}
        onChange={value => this.handleChange(value)}
        data-test='ComboBoxRedux_control'
        {...this.props}
      />
    )
  }
}

ComboBoxRedux.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired,
  getObject: PropTypes.func,
  className: PropTypes.string,
  limit: PropTypes.number,
  label: PropTypes.string,
  currentValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  model: PropTypes.string,
  dispatch: PropTypes.func
}

export default ComboBoxRedux
