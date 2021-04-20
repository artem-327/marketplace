import { TCompanyRequest } from '../types'

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
 * @return {TCompanyRequest} Company request object
 */
export const getCompanyRequestObject = company => {
  if (!company || isEmptyObject(company)) return
  let associations = []
  if (company?.associations?.length) company?.associations?.forEach(a => associations.push(a?.id))

  return {
    associations,
    businessType: company?.businessType?.id,
    cin: company?.cin,
    dba: company?.dba,
    dunsNumber: company?.dunsNumber,
    enabled: company?.enabled,
    industryType: company?.industryType,
    naicsCode: company?.naicsCode,
    name: company?.name,
    phone: company?.phone,
    socialFacebook: company?.socialFacebook,
    socialInstagram: company?.socialInstagram,
    socialLinkedin: company?.socialLinkedin,
    socialTwitter: company?.socialTwitter,
    tagline: company?.tagline,
    tin: company?.tin,
    tinType: company?.tinType,
    type: company?.type,
    website: company?.website
  }
}
