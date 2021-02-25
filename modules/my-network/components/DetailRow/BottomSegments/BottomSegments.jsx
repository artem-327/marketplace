import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
//Components
import LegalSegment from './LegalSegment'
import MarketingSegment from './MarketingSegment'
import VerifiedSegment from './VerifiedSegment'
//Styles
import { SegmentGroupHeader, GridColumnDetail } from '../DetailRow.style'
/**
 * Segments shows Legal Data, Merketing Data and Verified Data
 * @component
 */
const BottomSegmentData = props => {
  return (
    <Grid.Row>
      <GridColumnDetail>
        <SegmentGroupHeader horizontal noneBorder>
          <LegalSegment legalData={props.legalData} />
          <MarketingSegment marketingData={props.marketingData} />
          <VerifiedSegment verifiedData={props.verifiedData} />
        </SegmentGroupHeader>
      </GridColumnDetail>
    </Grid.Row>
  )
}

BottomSegmentData.propTypes = {
  legalData: PropTypes.object,
  marketingData: PropTypes.object,
  verifiedData: PropTypes.object
}

BottomSegmentData.defaultProps = {
  legalData: null,
  marketingData: null,
  verifiedData: null
}

export default BottomSegmentData
