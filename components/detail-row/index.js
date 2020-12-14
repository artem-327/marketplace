import React, { Component } from 'react'
import PropTypes from 'prop-types'
//Components
import Header from './header'
import Content from './content'
import Buttons from './Buttons'
//Styles
import { StyledGrid, DetailMessage } from './styles'
function DetailRow({ row, items, headerAttributes, contentAttributes, buttons }) {
  return (
    <DetailMessage>
      <StyledGrid>
        <Header row={row} attributes={headerAttributes} />
        <Content items={items} attributes={contentAttributes} />
        <Buttons row={row} buttons={buttons} />
      </StyledGrid>
    </DetailMessage>
  )
}

DetailRow.propTypes = {
  row: PropTypes.object,
  items: PropTypes.array,
  headerAttributes: PropTypes.array,
  contentAttributes: PropTypes.array,
  buttons: PropTypes.array
}

DetailRow.defaultProps = {
  row: {},
  items: [],
  headerAttributes: [],
  contentAttributes: [],
  buttons: []
}

export default DetailRow
