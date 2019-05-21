import React, { Component } from 'react'
import { string, number } from 'prop-types'

import styled from 'styled-components'
import { FormattedNumber } from 'react-intl'

const LowercaseUnit = styled(FormattedNumber)`
  text-transform: lowercase !important;
`

export default class FormattedUnit extends Component {
  render() {
    let { minimumFractionDigits, value, unit, separator } = this.props
    return (
      <>
        <LowercaseUnit value={value} minimumFractionDigits={minimumFractionDigits} /> {separator} {unit}
      </>
    )
  }
}

FormattedUnit.propTypes = {
  unit: string,
  value: number,
  minimumFractionDigits: number,
  separator: string
}

FormattedUnit.defaultProps = {
  unit: 'lb',
  minimumFractionDigits: 0,
  separator: ' / '
}