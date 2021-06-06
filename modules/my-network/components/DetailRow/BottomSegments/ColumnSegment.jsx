import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Styles
import { DivTitleBottomSegment, DivValue, GridColumnDetail, SegmentBottom } from '../DetailRow.style'
//Services
import { isEmptyObject } from '../../../../../services'

/**
 * Segment shows Legal, Marketing and Verified Data
 * @category My Network
 * @component
 */
const ColumnSegment = ({ data, titleId, blueValue }) => (
  <SegmentBottom textAlign='left'>
    <Grid.Row>
      <GridColumnDetail>
        <DivTitleBottomSegment>
          <FormattedMessage
            id={`myNetworks.detailRow.${titleId}`}
            defaultMessage='Title'
            data-test='component-column-segment-title'
          />
        </DivTitleBottomSegment>
      </GridColumnDetail>
    </Grid.Row>

    {!isEmptyObject(data)
      ? Object.keys(data).map((key, i) => {
          return (
            <Grid.Row key={i} data-test='component-column-segment-row'>
              <GridColumnDetail>
                <FormattedMessage id={`myNetworks.detailRow.${key}`} defaultMessage={key} />
                <DivValue
                  data-test='component-column-segment-value'
                  $minHeight='19px'
                  fontSize='14px'
                  $color={blueValue ? '#00c7f9' : null}
                  lineHeight='1.42857'>
                  {data[key]}
                </DivValue>
              </GridColumnDetail>
            </Grid.Row>
          )
        })
      : null}
  </SegmentBottom>
)

ColumnSegment.propTypes = {
  titleId: PropTypes.string,
  blueValue: PropTypes.string,
  data: PropTypes.object.isRequired
}

ColumnSegment.defaultProps = {
  titleId: '',
  blueValue: '',
  data: null
}

export default ColumnSegment
