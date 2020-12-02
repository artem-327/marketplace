import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
//Components
import Header from './header'
import Content from './content'
import { HEADER_ATTRIBUTES, CONTENT_ATTRIBUTES } from './constants'

function DetailRow({ row, headerAttributes, contentAttributes }) {
  return (
    <>
      <Header row={row} attributes={headerAttributes.length ? headerAttributes : HEADER_ATTRIBUTES} />
      <Content items={row.orderItems} attributes={contentAttributes.length ? contentAttributes : CONTENT_ATTRIBUTES} />
    </>
  )
}

DetailRow.propTypes = {
  row: PropTypes.object,
  headerAttributes: PropTypes.array,
  contentAttributes: PropTypes.array
}

DetailRow.defaultProps = {
  row: {},
  headerAttributes: [],
  contentAttributes: []
}

export default injectIntl(DetailRow)
