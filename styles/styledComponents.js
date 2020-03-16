import React, { Component } from 'react'
import { Input as FormikInput } from 'formik-semantic-ui-fixed-validation'

import { getSafe } from '~/utils/functions'

class PriceField extends Component {
  render() {
    const { Input } = this.props
    const inputProps = {
      type: 'number',
      ...this.props.inputProps,
      onKeyDown: e => {
        // Dont change value when up/down arrow key pressed
        if (e.keyCode === 38 || e.keyCode === 40) {
          e.preventDefault()
        }
        let onKeyDown = getSafe(() => this.props.inputProps.onKeyDown)
        if (onKeyDown) onKeyDown(e)
      }
    }
    const fieldProps = {
      className: 'price-input',
      ...this.props.fieldProps
    }

    return <Input {...this.props} inputProps={inputProps} fieldProps={fieldProps} />
  }
}

PriceField.defaultProps = {
  Input: FormikInput,
  inputProps: {},
  fieldProps: {}
}

export { PriceField }
