import { TCompanyRequest } from '../types'
import { COMPANY_REQUEST_KEYS } from '../constants/backendObjects'

/**
 * Function remove empty elements from object with one level (child).
 * @method
 * @param {object} obj The object.
 * @return {object} The object without empty values.
 */
export const getObjectWithoutEmptyElements = obj => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
  return obj
}

/**
 * Method returns boolean if string could be parse to the JSON.
 * @method
 * @param {string} str
 * @return {boolean}
 */
export const isJsonString = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
/**
 * Checks if the object is empty or not
 * @method
 * @param {object} obj
 * @returns {boolean}
 */
export const isEmptyObject = obj => {
  if (!obj) return true
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false
  }

  return true
}

/**
 * Prepares RequestCompany object for BE request
 * @method
 * @param {object} company
 * @returns {TCompanyRequest | {}} Company request object
 */
export const getCompanyRequestObject = company => {
  let companyRequest = {}
  if (!company || isEmptyObject(company)) return companyRequest

  COMPANY_REQUEST_KEYS.forEach(key => {
    if (
      (company[key] && !Array.isArray(company[key])) ||
      (company[key] && typeof company[key] === 'object' && !isEmptyObject(company[key])) ||
      (company[key] && Array.isArray(company[key]) && company[key].length)
    )
      companyRequest[key] = key === 'businessType' ? company[key]?.id : company[key]
  })
  return companyRequest
}
