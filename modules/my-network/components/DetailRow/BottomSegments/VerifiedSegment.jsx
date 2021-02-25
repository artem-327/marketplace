import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

//Styles
import { DivTitleBottomSegment, DivValue, DivEmpty } from '../DetailRow.style'
/**
 * Segment shows Verified Data
 * @component
 */
const VerifiedSegment = props => {
  return (
    <Segment textAlign='left'>
      <Grid.Row>
        <Grid.Column>
          <DivTitleBottomSegment>
            <FormattedMessage id='myNetworks.detailRow.verifiedData' defaultMessage='Verified Data' />
          </DivTitleBottomSegment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage
            id='myNetworks.detailRow.articlesIncorporation'
            defaultMessage='Articles of Incorporation'
          />
          <DivValue fontSize='14px'> {props.verifiedData.articlesIncorporation}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.certificateInsurance' defaultMessage='Certificate of Insurance' />
          <DivValue fontSize='14px'> {props.verifiedData.certificateInsurance}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.linkedBankAccounts' defaultMessage='Linked Bank Accounts' />
          <DivValue fontSize='14px'> {props.verifiedData.linkedBankAccounts}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.tradeOrganization' defaultMessage='Trade Organization' />
          <DivValue fontSize='14px'> {props.verifiedData.tradeOrganization}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <DivEmpty></DivEmpty>
        </Grid.Column>
      </Grid.Row>
    </Segment>
  )
}

VerifiedSegment.propTypes = {
  verifiedData: PropTypes.shape({
    articlesIncorporation: PropTypes.string,
    certificateInsurance: PropTypes.string,
    linkedBankAccounts: PropTypes.string,
    tradeOrganization: PropTypes.string
  })
}

VerifiedSegment.defaultProps = {
  verifiedData: {
    articlesIncorporation: '',
    certificateInsurance: '',
    linkedBankAccounts: '',
    tradeOrganization: ''
  }
}

export default VerifiedSegment
