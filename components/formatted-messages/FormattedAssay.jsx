import React, { Component } from 'react'
import { string } from "prop-types";

export default class FormattedAssay extends Component {
  render() {
    let { min, max, delimiter } = this.props

    return (
      min ?
        max ? `${min}${delimiter}${max}`
          :
          `> ${min}`
        :
        max ? `< ${max}`
          : null
    )
  }
}

FormattedAssay.propTypes = {
  min: string,
  max: string,
  delimiter: string
}

FormattedAssay.defaultProps = {
  min: null,
  max: null,
  delimiter: '/'
}