/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { number, string, bool, array, object, func } from 'prop-types'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { Image, Loader, Dimmer, GridRow, GridColumn, Divider } from 'semantic-ui-react'

// Components
import TradeCriteria from '../../../../components/detail-row/header'
import BottomSegments from '../../../my-network/components/DetailRow/BottomSegments/BottomSegments'

//Constants
import { currency } from '../../../../constants'
import { ATTRIBUTES_TRADE_CRITERIA } from './MyTradePass.constants'

// Styles
import {
  DivPageWrapper,
  StyledGrid,
  SegmentGroupHeader,
  SegmentCustom,
  SegmentSlogan,
  DivCollectionStat,
  DivGreyText,
  DivLeftAligned,
  DivValue,
  DivTitleTradeCriteria
} from './MyTradePass.styles'

// Services
import { getTradeCriteriaValues } from './MyTradePass.services'
import { getMyTradePass } from '../../actions'

/**
 * Displays detail information about company
 * @category My TradePass
 * @component
 */
const MyTradePass = props => {
  const { getMyTradePass, myTradePass, loading, address, slogan, criteria, legalData, marketingData, verifiedData } = props

  useEffect(() => {
    getMyTradePass()
  }, [])

  return (
    <DivPageWrapper>
      <Dimmer active={loading} inverted>
        <Loader size='large' />
      </Dimmer>
      <StyledGrid>
        <GridRow>
          <GridColumn>
            <SegmentGroupHeader horizontal $alignItems={'align-items: flex-start !important'}>
              <SegmentCustom textAlign='left'>
                <Image verticalAlign='middle' spaced={false} src={myTradePass?.base64Logo} />
                <DivGreyText>{address}</DivGreyText>
              </SegmentCustom>
              <SegmentCustom textAlign='right'>
                <DivCollectionStat>
                  <DivLeftAligned $flexWidth='60%'>
                    <FormattedMessage id='company.myTradePassId' defaultMessage='My Trade Pass ID' />
                    <DivValue>{myTradePass?.tradepassId}</DivValue>
                  </DivLeftAligned>
                  <DivLeftAligned $leftBorder $flexWidth='20%'>
                    <FormattedMessage id='myNetworks.detailRow.transactions' defaultMessage='Transactions' />
                    <DivValue>{myTradePass?.transactionsCount || 0}</DivValue>
                  </DivLeftAligned>
                  <DivLeftAligned $leftBorder $flexWidth='20%'>
                    <FormattedMessage id='myNetworks.detailRow.averageValue' defaultMessage='Average Value' />
                    <DivValue>
                      {myTradePass?.averageTransactionValue ? (
                        <FormattedNumber
                          minimumFractionDigits={0}
                          maximumFractionDigits={0}
                          style='currency'
                          value={myTradePass.averageTransactionValue}
                          currency={currency}
                        />
                      ) : (
                        'N/A'
                      )}
                    </DivValue>
                  </DivLeftAligned>
                </DivCollectionStat>
              </SegmentCustom>
              <SegmentSlogan>
                {slogan}
              </SegmentSlogan>
            </SegmentGroupHeader>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <DivTitleTradeCriteria>
              <FormattedMessage id='title.settings.tradeCriteria' defaultMessage='Trade Criteria' />
            </DivTitleTradeCriteria>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <TradeCriteria as='div' row={criteria} attributes={ATTRIBUTES_TRADE_CRITERIA} />
          </GridColumn>
        </GridRow>
        <BottomSegments legalData={legalData} marketingData={marketingData} verifiedData={verifiedData} />
      </StyledGrid>
    </DivPageWrapper>
  )
}

MyTradePass.propTypes = {
  itemsCount: number,
  getMyTradePass: func,
  myTradePass: object,
  loading: bool,
  address: object,
  criteria: object,
  legalData: object,
  marketingData: object,
  verifiedData: object
}

MyTradePass.defaultProps = {
  itemsCount: 0,
  getMyTradePass: () => {},
  myTradePass: null,
  loading: false,
  address: null,
  criteria: null,
  legalData: null,
  marketingData: null,
  verifiedData: null
}

function mapStateToProps({ settings }) {
  const myTradePass = settings.myTradePass
  const address = myTradePass?.primaryAddress
  const comma = address?.streetAddress || address?.city ? ', ' : ''
  return {
    loading: settings.loading,
    myTradePass,
    address: address
      ? `${address?.streetAddress || ''} ${address?.city || ''}${comma}${address?.province?.abbreviation || ''} ${
          address?.country?.code || ''
        }`
      : '',
    slogan: myTradePass?.tagline,
    criteria: getTradeCriteriaValues(myTradePass?.companyCriteria ? myTradePass.companyCriteria : {}),
    legalData: {
      legalBusinessName: myTradePass?.name,
      ein: myTradePass?.tin,
      telephoneNumber: myTradePass?.phone,
      inBusinessSince: myTradePass?.inBusinessSince,
      numberOfEmployees: myTradePass?.numberOfEmployees
        ? (
            <FormattedNumber
              minimumFractionDigits={0}
              maximumFractionDigits={0}
              value={myTradePass?.numberOfEmployees || 0}
            />
          )
        : null
    },
    marketingData: {
      website: myTradePass?.website,
      facebookHandle: myTradePass?.socialFacebook,
      instagramHandle: myTradePass?.socialInstagram,
      linkedInHandle: myTradePass?.socialLinkedin,
      twitterHandle: myTradePass?.socialTwitter,
      tradePassConnection: myTradePass?.connectionsCount || 0
    },
    verifiedData: {
      articlesIncorporation: myTradePass?.articlesOfIncorporation === 'VERIFIED' ? 'Verified' : 'Unverified',
      certificateInsurance: myTradePass?.certificateOfInsurance === 'VERIFIED' ? 'Verified' : 'Unverified',
      linkedBankAccounts: myTradePass?.linkedBankAccount === 'VERIFIED' ? 'Verified' : 'Unverified',
      tradeOrganization: myTradePass?.tradeOrganizations?.map(org => org?.short_name)?.toString() || 'Unverified'
    }
  }
}

export default injectIntl(connect(mapStateToProps, { getMyTradePass })(MyTradePass))
