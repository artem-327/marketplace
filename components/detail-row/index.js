import { Component } from 'react'
import PropTypes from 'prop-types'
//Components
import Header from './header'
import Content from './content'
import Buttons from './Buttons'
//Styles
import { StyledGrid, DetailMessage } from './styles'
function DetailRow({ row, items, headerAttributes, contentAttributes, buttons, separatedRows, renderSubDetail, hiddenDetailContentHeader, onDetailRowClick }) {
  return (
    <DetailMessage>
      <StyledGrid>
        <Header row={row} attributes={headerAttributes} />
        <Content items={items} attributes={contentAttributes} separatedRows={separatedRows} renderSubDetail={renderSubDetail} hiddenDetailContentHeader={hiddenDetailContentHeader} onDetailRowClick={onDetailRowClick} />
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
  buttons: PropTypes.array,
  separatedRows: PropTypes.bool,
  hiddenDetailContentHeader: PropTypes.bool,
  renderSubDetail: PropTypes.func,
  onDetailRowClick: PropTypes.func
}

DetailRow.defaultProps = {
  row: {},
  items: [],
  headerAttributes: [],
  contentAttributes: [],
  buttons: [],
  separatedRows: false,
  hiddenDetailContentHeader: false,
  renderSubDetail: () => {},
  onDetailRowClick: () => {}
}

export default DetailRow
