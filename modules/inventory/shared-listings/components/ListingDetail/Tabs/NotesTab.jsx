import { memo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
//Styles
import {
  DivTableWrapper,
  GridStyledNotes,
  DivNormalText,
  DivTdsTableHeader,
  GridRowNotesContent,
  GridColumnNotesContent,
  GridRowNotesLabel,
  GridColumnNotesLabel
} from '../ListingDetail.styles'

/**
 * NotesTab Component
 * @category Inventory - Shared Listings
 * @component
 */
const NotesTab = ({ row }) => {
  return (
    <DivTableWrapper>
      <GridStyledNotes>
        {row.conditionNotes && (
          <>
            <GridRowNotesLabel>
              <GridColumnNotesLabel>
                <DivTdsTableHeader>
                  <FormattedMessage id={`sharedListings.detailRow.conditionNotes`} defaultMessage='Condition Notes' />
                </DivTdsTableHeader>
              </GridColumnNotesLabel>
            </GridRowNotesLabel>
            <GridRowNotesContent>
              <GridColumnNotesContent width={16}>
                <DivNormalText>{row.conditionNotes}</DivNormalText>
              </GridColumnNotesContent>
            </GridRowNotesContent>
          </>
        )}
        {row.externalNotes && (
          <>
            <GridRowNotesLabel>
              <GridColumnNotesLabel>
                <DivTdsTableHeader>
                  <FormattedMessage id={`sharedListings.detailRow.externalNotes`} defaultMessage='External Notes' />
                </DivTdsTableHeader>
              </GridColumnNotesLabel>
            </GridRowNotesLabel>
            <GridRowNotesContent>
              <GridColumnNotesContent width={16}>
                <DivNormalText>{row.externalNotes}</DivNormalText>
              </GridColumnNotesContent>
            </GridRowNotesContent>
          </>
        )}
        {row.internalNotes && (
          <>
            <GridRowNotesLabel>
              <GridColumnNotesLabel>
                <DivTdsTableHeader>
                  <FormattedMessage id={`sharedListings.detailRow.internalNotes`} defaultMessage='Internal Notes' />
                </DivTdsTableHeader>
              </GridColumnNotesLabel>
            </GridRowNotesLabel>
            <GridRowNotesContent>
              <GridColumnNotesContent width={16}>
                <DivNormalText>{row.internalNotes}</DivNormalText>
              </GridColumnNotesContent>
            </GridRowNotesContent>
          </>
        )}
      </GridStyledNotes>
    </DivTableWrapper>
  )
}

NotesTab.propTypes = {}
NotesTab.defaultProps = {}

const areEqual = (prevProps, nextProps) => {
  return prevProps?.row?.id === nextProps?.row?.id
}

const MemoNotesTab = memo(NotesTab, areEqual)
export default MemoNotesTab
