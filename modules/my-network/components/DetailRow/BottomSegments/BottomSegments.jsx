import PropTypes from 'prop-types'
//Components
import ColumnSegment from './ColumnSegment'
//Styles
import { SegmentGroupHeader, GridColumnDetail, GridRowBottomSegment } from '../DetailRow.style'
/**
 * Segments shows Legal Data, Merketing Data and Verified Data
 * @category My Network
 * @component
 */
const BottomSegmentData = props =>{
  console.log(props)
  return (
  <GridRowBottomSegment>
    <GridColumnDetail>
      <SegmentGroupHeader horizontal $noneBorder>
        {Object.keys(props).map((key, i) => {
          return <ColumnSegment key={i} data={props[key]} titleId={key} blueValue={key === 'verifiedData'} />
        })}
      </SegmentGroupHeader>
    </GridColumnDetail>
  </GridRowBottomSegment>
)}

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
