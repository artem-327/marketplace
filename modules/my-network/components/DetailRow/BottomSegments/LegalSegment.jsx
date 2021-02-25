import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

//Styles
import { DivTitleBottomSegment, DivValue } from '../DetailRow.style'
/**
 * Segment shows Legal Data
 * @component
 */
const LegalSegment = props => {
  return (
    <Segment textAlign='left'>
      <Grid.Row>
        <Grid.Column>
          <DivTitleBottomSegment>
            <FormattedMessage id='myNetworks.detailRow.legalData' defaultMessage='Legal Data' />
          </DivTitleBottomSegment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.legalBusinessName' defaultMessage='Legal Business Name' />
          <DivValue fontSize='14px'> {props.legalData.legalBusinessName}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.ein' defaultMessage='EIN' />
          <DivValue fontSize='14px'> {props.legalData.ein}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.telephoneNumber' defaultMessage='Telephone Number' />
          <DivValue fontSize='14px'> {props.legalData.telephoneNumber}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.inBusinessSince' defaultMessage='In Business Since' />
          <DivValue fontSize='14px'> {props.legalData.inBusinessSince}</DivValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FormattedMessage id='myNetworks.detailRow.numberOfEmployees' defaultMessage='Number of Employes' />
          <DivValue fontSize='14px'>
            <FormattedNumber
              minimumFractionDigits={0}
              maximumFractionDigits={0}
              value={props.legalData.numberOfEmployees}
            />
          </DivValue>
        </Grid.Column>
      </Grid.Row>
    </Segment>
  )
}

LegalSegment.propTypes = {
  legalData: PropTypes.shape({
    legalBusinessName: PropTypes.string,
    ein: PropTypes.string,
    telephoneNumber: PropTypes.string,
    inBusinessSince: PropTypes.number,
    numberOfEmployees: PropTypes.number
  })
}

LegalSegment.defaultProps = {
  legalData: {
    legalBusinessName: '',
    ein: '',
    telephoneNumber: '',
    inBusinessSince: null,
    numberOfEmployees: null
  }
}

export default LegalSegment
