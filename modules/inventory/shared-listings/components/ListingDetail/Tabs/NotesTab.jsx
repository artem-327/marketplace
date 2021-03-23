import React from 'react'
import PropTypes from 'prop-types'
import { GridColumn, GridRow } from 'semantic-ui-react'

//Styles
import {
  DivTableWrapper,
  GridStyledNotes,
  DivNormalText
} from '../ListingDetail.styles'

const NotesTab = ({ row }) => {
  return (
    <DivTableWrapper>
      <GridStyledNotes>
        {row.conditionNotes && (
          <GridRow>
            <GridColumn width={16}>
              <DivNormalText>
                {row.conditionNotes}
              </DivNormalText>
            </GridColumn>
          </GridRow>
        )}
        {row.externalNotes && (
          <GridRow>
            <GridColumn width={16}>
              <DivNormalText>
                {row.externalNotes}
              </DivNormalText>
            </GridColumn>
          </GridRow>
        )}
        {row.internalNotes && (
          <GridRow>
            <GridColumn width={16}>
              <DivNormalText>
                {row.internalNotes}
              </DivNormalText>
            </GridColumn>
          </GridRow>
        )}
      </GridStyledNotes>
    </DivTableWrapper>
  )
}

NotesTab.propTypes = {}

export default NotesTab
