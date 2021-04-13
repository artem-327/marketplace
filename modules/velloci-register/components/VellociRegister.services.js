import { isEmptyObject } from '../../../services'
import { TCompanyRequest } from '../../../types'
import { COMPANY_REQUEST_KEYS } from '../../../constants/backendObjects'

/**
 * Prepares RequestCompany object for BE request
 * @category Velloci Register
 * @method
 * @param {object} company
 * @returns {TCompanyRequest | {}}
 */
export const getRequestCompanyObject = company => {
  let response = {}
  if (!company || isEmptyObject(company)) return response

  COMPANY_REQUEST_KEYS.forEach(key => {
    if (
      (company[key] && !Array.isArray(company[key])) ||
      (company[key] && typeof company[key] === 'object' && !isEmptyObject(company[key])) ||
      (company[key] && Array.isArray(company[key]) && company[key].length)
    )
      response[key] = key === 'businessType' ? company[key]?.id : company[key]
  })
  return response
}
