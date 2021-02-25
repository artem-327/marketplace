import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment, List, GridColumn, Table, Button } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

//Styles
import { DivTitleTradeCriteria, SegmentGroupHeader, DivTitleBottomSegment, DivValue } from '../DetailRow.style'
import { StyledGrid, ColumnDetail } from '../../../../../components/detail-row/styles'
/**
 * Segment shows Marketing Data
 * @component
 */
const MarketingSegment = props => {
  return (
    <Segment textAlign='left'>
      <Grid.Row>
        <Grid.Column>
          <DivTitleBottomSegment>
            <FormattedMessage
              id='myNetworks.detailRow.marketingSocialMedia'
              defaultMessage='Marketing & Social Media'
            />
          </DivTitleBottomSegment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.website' defaultMessage='Website' />
          <DivValue fontSize='14px'> {props.marketingData.website}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.facebookHandle' defaultMessage='Facebook Handle' />
          <DivValue fontSize='14px'> {props.marketingData.facebookHandle}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.linkedInHandle' defaultMessage='LinkedIn Handle' />
          <DivValue fontSize='14px'> {props.marketingData.linkedInHandle}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.twitterHandle' defaultMessage='Twitter Handle' />
          <DivValue fontSize='14px'> {props.marketingData.twitterHandle}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.tradePassConnection' defaultMessage='TradePass Connections' />
          <DivValue fontSize='14px'>
            <DivValue fontSize='14px'> {props.marketingData.tradePassConnection}</DivValue>
          </DivValue>
        </Grid.Column>
      </Grid.Row>
    </Segment>
  )
}

MarketingSegment.propTypes = {
  marketingData: PropTypes.shape({
    website: PropTypes.string,
    facebookHandle: PropTypes.string,
    linkedInHandle: PropTypes.string,
    twitterHandle: PropTypes.string,
    tradePassConnection: PropTypes.number
  })
}

MarketingSegment.defaultProps = {
  marketingData: {
    website: '',
    facebookHandle: '',
    linkedInHandle: '',
    twitterHandle: '',
    tradePassConnection: null
  }
}

export default MarketingSegment
