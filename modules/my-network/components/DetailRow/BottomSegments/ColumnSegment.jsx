import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Styles
import { DivTitleBottomSegment, DivValue, GridColumnDetail, SegmentBottom } from '../DetailRow.style'
/**
 * Segment shows Legal, Marketing and Verified Data
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

    {Object.keys(data).length ?
      Object.keys(data).map((key, i) => {
        let docNameTemp = key.split('_')
        docNameTemp.map((t, i) => {
          docNameTemp[i] = t.charAt(0).toUpperCase() + t.slice(1);
        })
        const docName = docNameTemp.join(' ')

        let value = data[key]
        if(blueValue) value = value.replace('_', ' ')

        return (
          <Grid.Row key={i} data-test='component-column-segment-row'>
            <GridColumnDetail>
              <FormattedMessage id={`myNetworks.detailRow.${key}`} defaultMessage={docName} />
              <DivValue
                $minHeight='19px'
                fontSize='14px'
                $color={blueValue ? '#00c7f9' : null}
                lineHeight='1.42857'
                data-test='component-column-segment-value'
              >{value}</DivValue>
            </GridColumnDetail>
          </Grid.Row>
        )
      })
    :
      <Grid.Row data-test='component-column-segment-row'>
        <GridColumnDetail>
          <FormattedMessage
            id='myNetworks.detailRow.noFilesUploaded'
            defaultMessage='No files uploaded'
            data-test='component-column-segment-value'
          />
        </GridColumnDetail>
      </Grid.Row>
    }

  </SegmentBottom>
)

ColumnSegment.propTypes = {
  titleId: PropTypes.string,
  blueValue: PropTypes.string,
  data: PropTypes.object
}

ColumnSegment.defaultProps = {
  titleId: '',
  blueValue: '',
  data: {}
}

export default ColumnSegment
