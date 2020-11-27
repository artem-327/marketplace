import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
import { GridRow, GridColumn, List } from 'semantic-ui-react'

import { StyledGrid } from './styles'

function Content({ row }) {
  console.log('row===Content=================================')
  console.log(row)
  console.log('====================================')
  return (
    <StyledGrid>
      <GridRow>
        <GridColumn width={16}>Content</GridColumn>
      </GridRow>
    </StyledGrid>
  )
}

Content.propTypes = {
  row: PropTypes.object
}

Content.defaultProps = {
  row: {}
}

export default injectIntl(Content)
