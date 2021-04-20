import moment from 'moment'
import { FormattedNumber } from 'react-intl'
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
  DivDate
} from './MyNetwork.styles'
//Constants
import { COLORS, CONNECTIONS_STATUSES } from './constants'
//Services
import { getLocaleDateFormat } from '../../components/date-format'

//Actions
import { buttonActionsDetailRow, connectionsStatuses } from './actions'

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
export const getTradeCriteriaValues = criteria => {
  if (!criteria) return null
  const criteriaKeys = Object.keys(criteria)
  const arrValCriterias = criteriaKeys.map(key => {
    return {
      [key]: (
        <DivValueTradeCriteria>
          <DivTextValueTradeCriteria>{criteria[key]?.criteria_match_description}</DivTextValueTradeCriteria>
          <DivCircle background={COLORS[criteria[key]?.criteria_match] ?? '#f8f9fb'} />
        </DivValueTradeCriteria>
      )
    }
  })
  //convert array to object
  return Object.assign({}, ...arrValCriterias.map(object => object))
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

  return {
    ...row,
    id: row?.connectionId || row?.connectedCompany?.tradepassId,
    member: (
      <DivMember key={row?.connectionId || row?.connectedCompany?.tradepassId}>
        <Image verticalAlign='middle' size='mini' spaced={true} src={row?.connectedCompany?.base64Logo} />

        <BMember>{row?.connectedCompany?.name}</BMember>
      </DivMember>
    ),
    logo: <Image verticalAlign='middle' size='small' spaced={true} src={row?.connectedCompany?.base64Logo} />,
    address: address
      ? `${address?.streetAddress || ''} ${address?.city || ''}${comma}${address?.province?.abbreviation || ''} ${
          address?.country?.code || ''
        }`
      : '',
    transactions: row?.connectedCompany?.transactionsCount || 0,
    averageValue: row?.connectedCompany?.averageTransactionValue || 0,
    connectionStatus: getStatusLabel(row?.status),
    eligibilityCriteria: getCriteriaLabel(row?.connectionCriteria || row?.connectedCompany?.connectionCriteria),
    date: getDate(row?.updatedAt || row?.connectedCompany?.updatedAt),
    buttonActionsDetailRow: buttonActionsDetailRow,
    tradeCriteria: getTradeCriteriaValues(row?.connectionCriteria || row?.connectedCompany?.connectionCriteria),
    legalData: {
      legalBusinessName: r?.connectedCompany?.name,
      ein: r?.connectedCompany?.tin,
      telephoneNumber: r?.connectedCompany?.phone,
      inBusinessSince: r?.connectedCompany?.inBusinessSince,
      numberOfEmployees: r?.connectedCompany?.numberOfEmployees
        ? (
            <FormattedNumber
              minimumFractionDigits={0}
              maximumFractionDigits={0}
              value={r?.connectedCompany?.numberOfEmployees || 0}
            />
          )
        : null
    },
    marketingData: {
      website: r?.connectedCompany?.website,
      facebookHandle: r?.connectedCompany?.socialFacebook,
      instagramHandle: r?.connectedCompany?.socialInstagram,
      linkedInHandle: r?.connectedCompany?.socialLinkedin,
      twitterHandle: r?.connectedCompany?.socialTwitter,
      tradePassConnection: r?.connectedCompany?.connectionsCount || 0
    },
    verifiedData: {
      articlesIncorporation: r?.connectedCompany?.articlesOfIncorporation === 'VERIFIED' ? 'Verified' : 'Unverified',
      certificateInsurance: r?.connectedCompany?.certificateOfInsurance === 'VERIFIED' ? 'Verified' : 'Unverified',
      linkedBankAccounts: r?.connectedCompany?.linkedBankAccount === 'VERIFIED' ? 'Verified' : 'Unverified',
      tradeOrganization:
        r?.connectedCompany?.tradeOrganizations?.map(org => org?.short_name)?.toString() || 'Unverified'
    }
  }
}
