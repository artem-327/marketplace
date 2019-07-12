import React, { Component } from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'


const CapitalizedText = styled.span`
  text-transform: capitalize;
`


export default class UnitOfPackaging extends Component {

  render() {
    let { value } = this.props

    if(!value) return 'N/A'

    return (
      <CapitalizedText>{value}</CapitalizedText>
    )
  }
}


UnitOfPackaging.propTypes = {
  value: string
}

UnitOfPackaging.defaultProps = {
  value: null,
}