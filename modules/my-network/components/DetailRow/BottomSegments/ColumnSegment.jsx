import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Styles
import { DivTitleBottomSegment, DivValue } from '../DetailRow.style'
/**
 * Segment shows Legal, Marketing and Verified Data
 * @component
 */
const ColumnSegment = ({ data, titleId }) => (
  <Segment textAlign='left'>
    <Grid.Row>
      <Grid.Column>
        <DivTitleBottomSegment>
          <FormattedMessage id={`myNetworks.detailRow.${titleId}`} defaultMessage='Title' />
        </DivTitleBottomSegment>
      </Grid.Column>
    </Grid.Row>
    {Object.keys(data).map(key => {
      return (
        <Grid.Row>
          <Grid.Column>
            <FormattedMessage id={`myNetworks.detailRow.${key}`} defaultMessage='Title' />
            <DivValue fontSize='14px'> {data[key]}</DivValue>
          </Grid.Column>
        </Grid.Row>
      )
    })}
  </Segment>
)

ColumnSegment.propTypes = {
  titleId: PropTypes.string,
  data: PropTypes.object
}

ColumnSegment.defaultProps = {
  titleId: '',
  data: null
}

export default ColumnSegment
