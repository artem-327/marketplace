import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
//Components
import ColumnSegment from './ColumnSegment'
//Styles
import { SegmentGroupHeader, GridColumnDetail } from '../DetailRow.style'
/**
 * Segments shows Legal Data, Merketing Data and Verified Data
 * @component
 */
const BottomSegmentData = props => (
  <Grid.Row>
    <GridColumnDetail>
      <SegmentGroupHeader horizontal noneBorder>
        {Object.keys(props).map(key => {
          return <ColumnSegment data={props[key]} titleId={key} />
        })}
      </SegmentGroupHeader>
    </GridColumnDetail>
  </Grid.Row>
)

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
