import moment from 'moment'
import { FormattedNumber } from 'react-intl'
import { Image } from 'semantic-ui-react'
//Styles
import {
  DivStatusLabel,
  DivCircle,
  DivCircles,
  DivValueTradeCriteria,
  DivTextValueTradeCriteria
} from './MyNetwork.styles'
//Constants
import { COLORS, CONNECTIONS_STATUSES } from './constants'
//Services
import { getLocaleDateFormat } from '../../components/date-format'
//Components
import Logo from '../../assets/images/nav/logo-bluepallet.png' //DELETE
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
        return <DivCircle key={i} background={COLORS[criteria[key]?.match] ?? '#f8f9fb'} />
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
          <DivTextValueTradeCriteria>{criteria[key]?.actualValue}</DivTextValueTradeCriteria>
          <DivCircle background={COLORS[criteria[key]?.match] ?? '#f8f9fb'} />
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
  return moment(date).format(getLocaleDateFormat())
}

/**
 * @category My Network
 * @method
 * @param {object[]} rows
 * @return {{
 *   all: number,
 *   active: number,
 *   pending: number,
 *   requested: number
 * }}
 */
export const getStatuses = rows => {
  if (!rows.length) return
  let result = {
    all: rows.length || 0,
    active: 0,
    pending: 0,
    requested: 0
  }
  rows.forEach(row => result[CONNECTIONS_STATUSES[row?.status]]++)
  return result
}
/**
 * @category My Network
 * @method
 * @param {object} row
 * @returns {object} Returns object detail row.
 */
export const getRowDetail = row => {
  if (!row) return
  let address = row?.connectedCompany?.primaryAddress
  return {
    ...row,
    id: row?.connectionId || row?.connectedCompany?.tradepassId,
    member: (
      <div key={row?.connectionId || row?.connectedCompany?.tradepassId}>
        <Image verticalAlign='middle' size='mini' spaced={true} src={row?.connectedCompany?.logo} />

        <b>{row?.connectedCompany?.name}</b>
      </div>
    ),
    logo: <Image verticalAlign='middle' size='small' spaced={true} src={row?.connectedCompany?.logo} />,
    address: `${address?.streetAddress} ${address?.city}, ${address?.province?.abbreviation} ${address?.country?.code}`,
    transactions: row?.connectedCompany?.transactionsCount || 0,
    averageValue: row?.connectedCompany?.averageTransactionValue || 0,
    connectionStatus: getStatusLabel(row?.status),
    eligibilityCriteria: getCriteriaLabel(row?.criteria || row?.connectedCompany?.criteria),
    date: getDate(row?.updatedAt || row?.connectedCompany?.updatedAt),
    buttonActionsDetailRow: buttonActionsDetailRow,
    tradeCriteria: getTradeCriteriaValues(row?.criteria || row?.connectedCompany?.criteria),
    legalData: {
      legalBusinessName: row?.connectedCompany?.name,
      ein: row?.connectedCompany?.tin,
      telephoneNumber: row?.connectedCompany?.phone,
      inBusinessSince: row?.connectedCompany?.inBusinessSince,
      numberOfEmployees: (
        <FormattedNumber
          minimumFractionDigits={0}
          maximumFractionDigits={0}
          value={row?.connectedCompany?.numberOfEmployees || 0}
        />
      )
    },
    marketingData: {
      website: row?.connectedCompany?.website,
      facebookHandle: row?.connectedCompany?.socialFacebook,
      instagramHandle: row?.connectedCompany?.socialInstagram,
      linkedInHandle: row?.connectedCompany?.socialLinkedin,
      twitterHandle: row?.connectedCompany?.socialTwitter,
      tradePassConnection: row?.connectedCompany?.connectionsCount || 0
    },
    verifiedData: {
      articlesIncorporation: row?.connectedCompany?.articlesOfIncorporation === 'VERIFIED' ? 'Verified' : 'Unverified',
      certificateInsurance: row?.connectedCompany?.certificateOfInsurance === 'VERIFIED' ? 'Verified' : 'Unverified',
      linkedBankAccounts: row?.connectedCompany?.linkedBankAccount === 'VERIFIED' ? 'Verified' : 'Unverified',
      tradeOrganization:
        row?.connectedCompany?.tradeOrganizations?.map(org => org?.short_name)?.toString() || 'Unverified'
    }
  }
}
