import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
//Components
import Header from './header'
import Content from './content'

function DetailRow({ row }) {
  return (
    <>
      <Header row={row} />
      <Content row={row} />
    </>
  )
}

DetailRow.propTypes = {
  row: PropTypes.object
}

DetailRow.defaultProps = {
  row: {}
}

export default injectIntl(DetailRow)
