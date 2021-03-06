import moment from 'moment'
import { FormattedNumber, FormattedDate } from 'react-intl'
import { Image } from 'semantic-ui-react'
//Styles
import {
  DivStatusLabel,
  DivCircle,
  DivCircles,
  DivValueTradeCriteria,
  DivTextValueTradeCriteria,
  BMember,
  DivMember,
  SpanDate,
  DivDate,
  DivPercentageIconWrapper
} from './MyNetwork.styles'
//Constants
import { COLORS, CONNECTIONS_STATUSES } from './constants'
import { currency } from '../../constants'
//Services
import { getLocaleDateFormat } from '../../components/date-format'

//Actions
import { buttonActionsDetailRow, connectionsStatuses } from './actions'

//Components
import PercentageIcon from '../../components/percentage-icon/PercentageIcon'

/**
 * @category My Network
 * @method
 * @param {string} status
 */
export const getStatusLabel = status => {
  if (!status) return null
  let lowerCaseText = status.toLowerCase()
  let textLabel = `${lowerCaseText.charAt(0).toUpperCase()}${lowerCaseText.slice(1)}`
  return <DivStatusLabel>{textLabel}</DivStatusLabel>
}

/**
 * @category My Network
 * @method
 * @param {object} criteria
 */
export const getCriteriaLabel = criteria => {
  if (!criteria) return null
  const criteriaKeys = Object.keys(criteria)
  return (
    <DivCircles>
      {criteriaKeys.map((key, i) => {
        return <DivCircle key={i} background={COLORS[criteria[key]?.criteria_match] ?? '#f8f9fb'} />
      })}
    </DivCircles>
  )
}

/**
 * @category My Network
 * @method
 * @param {object} criteria
 */
export const getMetricsValues = values => {
  if (!values) return null
  return {
    'transactions': values[0],
    'averageValue': values[1]
      ? (
          <FormattedNumber
            minimumFractionDigits={0}
            maximumFractionDigits={0}
            style='currency'
            value={values[1]}
            currency={currency}
          />
        )
      : 'N/A'
    ,
    'dateOfLastTransaction': values[2] ? (<FormattedDate value={values[2].split('T')[0]} />) : 'N/A',
    'connections': values[3]
  }
}

/**
 * @category My Network
 * @method
 * @param {string} date
 */
export const getDate = date => {
  if (!date) return null
  return (
    <DivDate>
      <SpanDate>{moment(date).format(getLocaleDateFormat())}</SpanDate>
    </DivDate>
  )
}

/**
 * @category My Network
 * @method
 * @param {object[]} rows
 * @return {{
 *   all: number,
 *   connected: number,
 *  pending: number,
 *  requested: number,
 *  declined: number,
 *  disconnected: number
 * }}
 */
export const getStatuses = rows => {
  if (!rows.length) return
  let result = {
    all: rows.length || 0,
    connected: 0,
    pending: 0,
    requested: 0,
    declined: 0,
    disconnected: 0
  }
  rows.forEach(row => result[CONNECTIONS_STATUSES[row?.status]]++)
  return result
}
/**
 * @category My Network
 * @method
 * @param {object} row
 * @param {object} detailRow
 * @returns {object} Returns object detail row.
 */
export const getRowDetail = (row, detailRow) => {
  if (!row) return

  let r = typeof row?.connectionId !== 'undefined' && detailRow?.connectionId === row?.connectionId ? detailRow : row
  let address = r?.connectedCompany?.primaryAddress
  const comma = address?.streetAddress || address?.city ? ', ' : ''
  const getVerifiedData = (connectedCompany, status) => {
    const { businessDocuments } = connectedCompany;
    let data = {}
    if(businessDocuments) {
      Object.keys(businessDocuments).map((key, i) => {
        if(key === 'formation_articles_of_incorporation') {
          data[key] = businessDocuments[key].status
        } else if(key === 'insurance_general_liability') {
          data[key] = businessDocuments[key].status
        } else if(key === 'formation_w9' && status === 'CONNECTED') {
          data['document'] = businessDocuments[key]
          data[key] = businessDocuments[key].status
        }
      })
    }
    return data
  }

  return {
    ...row,
    id: row?.connectionId || row?.connectedCompany?.tradepassId,
    member: (
      <DivMember key={row?.connectionId || row?.connectedCompany?.tradepassId}>
        {row?.connectedCompany?.logoUrl && <Image verticalAlign='middle' size='mini' spaced={true} src={row.connectedCompany.logoUrl} />}

        <BMember>{row?.connectedCompany?.name}</BMember>
      </DivMember>
    ),
    logo: (row?.connectedCompany?.logoUrl && <Image verticalAlign='middle' size='small' spaced={true} src={row.connectedCompany.logoUrl} />),
    address: address
      ? `${address?.streetAddress || ''} ${address?.city || ''}${comma}${address?.province?.abbreviation || ''} ${
          address?.country?.code || ''
        }`
      : '',
    transactions: row?.connectedCompany?.transactionsCount || 0,
    averageValue: row?.connectedCompany?.averageTransactionValue || 0,
    connectionStatus: getStatusLabel(row?.status),
    riskMatch: (
      <DivPercentageIconWrapper>
        <PercentageIcon value={row?.connectedCompany?.connectionCriteria?.requester_tolerance} />
      </DivPercentageIconWrapper>
    ),
    date: getDate(row?.updatedAt || row?.connectedCompany?.updatedAt),
    buttonActionsDetailRow: buttonActionsDetailRow,
    connectionCriteria: row?.connectedCompany?.connectionCriteria,
    metrics: getMetricsValues([
      row?.connectedCompany?.transactionsCount || 0,
      row?.connectedCompany?.averageTransactionValue || 0,
      row?.connectedCompany?.lastTransactionDate || '',
      row?.connectedCompany?.connectionsCount || 0
    ]),
    legalData: {
      legalBusinessName: r?.connectedCompany?.name,
      ein: r?.connectedCompany?.tin,
      telephoneNumber: r?.connectedCompany?.phone,
      inBusinessSince: r?.connectedCompany?.inBusinessSince,
      numberOfEmployees: r?.connectedCompany?.numberOfEmployees ? (
        <FormattedNumber
          minimumFractionDigits={0}
          maximumFractionDigits={0}
          value={r?.connectedCompany?.numberOfEmployees || 0}
        />
      ) : null
    },
    marketingData: {
      website: r?.connectedCompany?.website,
      facebookHandle: r?.connectedCompany?.socialFacebook,
      instagramHandle: r?.connectedCompany?.socialInstagram,
      linkedInHandle: r?.connectedCompany?.socialLinkedin,
      twitterHandle: r?.connectedCompany?.socialTwitter,
      tradePassConnection: r?.connectedCompany?.connectionsCount || 0
    },
    verifiedData: getVerifiedData(r?.connectedCompany, r?.status)
  }
}
