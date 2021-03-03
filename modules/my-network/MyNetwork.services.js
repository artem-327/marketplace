import moment from 'moment'
//Styles
import {
  DivStatusLabel,
  DivCircle,
  DivCircles,
  DivValueTradeCriteria,
  DivTextValueTradeCriteria
} from './MyNetwork.styles'
//Constants
import { STATUSES, COLORS, CONNECTIONS_STATUSES } from './constants'
//Services
import { getLocaleDateFormat } from '../../components/date-format'

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
      {criteriaKeys.map(key => {
        return <DivCircle background={COLORS[criteria[key]?.match] ?? '#f8f9fb'} />
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
