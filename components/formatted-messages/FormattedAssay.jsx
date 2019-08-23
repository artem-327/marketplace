import React, { Component } from 'react'
import { string, number } from "prop-types";

export default class FormattedAssay extends Component {
  render() {
    let { min, max, delimiter } = this.props

    return (
      min !== null ?
        max !== null ? `${min}${delimiter}${max}`
          :
          `> ${min}`
        :
        max !== null ? `< ${max}`
          : null
    )
  }
}

FormattedAssay.propTypes = {
  min: number,
  max: number,
  delimiter: string
}

FormattedAssay.defaultProps = {
  min: null,
  max: null,
  delimiter: '/'
}