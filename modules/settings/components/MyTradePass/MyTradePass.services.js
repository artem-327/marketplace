import { DivValueTradeCriteria, DivTextValueTradeCriteria } from './MyTradePass.styles'

/**
 * @category My TradePass
 * @method
 * @param {object} criteria
 * @returns {object}
 */
export const getTradeCriteriaValues = criteria => {
  if (!criteria) return null
  const criteriaKeys = Object.keys(criteria)
  const arrValCriterias = criteriaKeys.map(key => {
    return {
      [key]: (
        <DivValueTradeCriteria>
          <DivTextValueTradeCriteria>{criteria[key]}</DivTextValueTradeCriteria>
        </DivValueTradeCriteria>
      )
    }
  })
  //convert array to object
  return Object.assign({}, ...arrValCriterias.map(object => object))
}
