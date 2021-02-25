import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

//Components
import BottomSegments from './BottomSegments/BottomSegments'
import TradeCriteria from '../../../../components/detail-row/header'
import Header from './Header'
//Styles
import { StyledGrid } from '../../../../components/detail-row/styles'
import { DivTitleTradeCriteria, GridColumnDetail } from './DetailRow.style'

const DetailRow = props => {
  return (
    <StyledGrid>
      <Header logo='URL:LOGO' transactions={47} averageValue={14149} button={{ text: 'Disconect' }} />
      <Grid.Row>
        <GridColumnDetail>
          <DivTitleTradeCriteria>
            <FormattedMessage id='title.settings.tradeCriteria' defaultMessage='Trade Criteria' />
          </DivTitleTradeCriteria>
        </GridColumnDetail>
      </Grid.Row>
      <TradeCriteria
        row={{
          insuranceRequirement: '$2,000,000 Generaly Liability',
          daysBeyondTerm: '> 15',
          creditRisk: 'Low',
          violations: '0',
          socialPresence: '>3 SocialHandles'
        }}
        attributes={['insuranceRequirement', 'daysBeyondTerm', 'creditRisk', 'violations', 'socialPresence']}
      />
      <BottomSegments
        legalData={{
          legalBusinessName: 'Univar Solution',
          ein: '72-456789',
          telephoneNumber: '(123) 897-66546',
          inBusinessSince: 1987,
          numberOfEmployees: 1245
        }}
        marketingData={{
          website: 'www.aa.cz',
          facebookHandle: 'facebook.com/aa',
          linkedInHandle: 'linkedin.com/aa',
          twitterHandle: 'twitter.com/aa',
          tradePassConnection: 1245
        }}
        verifiedData={{
          articlesIncorporation: 'Verified',
          certificateInsurance: 'Verified',
          linkedBankAccounts: 'Verified',
          tradeOrganization: 'NACD'
        }}
      />
    </StyledGrid>
  )
}

DetailRow.propTypes = {
  row: PropTypes.object
}

DetailRow.defaultProps = {
  row: null
}

export default DetailRow
