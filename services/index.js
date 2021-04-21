import { TCompanyRequest, TCompanyObject } from '../types'
// Services
import { removeEmpty } from '../utils/functions'

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
 * Prepares CompanyRequest object for BE request PATCH /api/companies/id/{companyId}
 * @method
 * @param {TCompanyObject & Object<string, any>} companyObj Company object from Redux store "auth.identity.company" from selector function "makeGetCompany".
 * @param {Object<string, any>} [newCompanyObj] Object whit new values for update a Company. Object needs to have the same attributes as TCompanyObject if wants to modifie object CompanyRequest for PATCH /api/companies/id/{companyId}.
 * @return {TCompanyRequest} Company request object without attributes where no values for PATCH /api/companies/id/{companyId}.
 * @throws Will throw an error if the argument "companyObj" is null | undefined | empty object | type not a object. Parameter "companyObj" is required! Pass "auth.identity.company" from Redux where are stored all data about CompanyResponse (from BE) to the parameter "companyObj"!
 */
export const getCompanyRequestObject = (companyObj, newCompanyObj) => {
  if (!companyObj || isEmptyObject(companyObj) || typeof companyObj !== 'object')
    throw new Error(
      'Parameter "companyObj" is required! Pass "auth.identity.company" from Redux where are stored all data about CompanyResponse (from BE) to the parameter "companyObj"!'
    )
  let associations = []
  if (newCompanyObj?.associations?.length)
    newCompanyObj?.associations?.forEach(a => associations.push(typeof a === 'number' ? a : a?.id))
  else if (companyObj?.associations?.length)
    companyObj?.associations?.forEach(a => associations.push(typeof a === 'number' ? a : a?.id))

  let businessType = null
  if (newCompanyObj?.businessType)
    businessType =
      typeof newCompanyObj?.businessType === 'number' ? newCompanyObj?.businessType : newCompanyObj?.businessType?.id
  else if (companyObj?.businessType)
    businessType =
      typeof companyObj?.businessType === 'number' ? companyObj?.businessType : companyObj?.businessType?.id
  /**
   * @type {TCompanyRequest}
   */
  let companyRequest = {
    associations,
    businessType,
    cin: newCompanyObj?.cin ?? companyObj?.cin,
    dba: newCompanyObj?.dba ?? companyObj?.dba,
    dunsNumber: newCompanyObj?.dunsNumber ?? companyObj?.dunsNumber,
    enabled: newCompanyObj?.enabled ?? companyObj?.enabled,
    industryType: newCompanyObj?.industryType ?? companyObj?.industryType,
    naicsCode: newCompanyObj?.naicsCode ?? companyObj?.naicsCode,
    name: newCompanyObj?.name ?? companyObj?.name,
    phone: newCompanyObj?.phone ?? companyObj?.phone,
    socialFacebook: newCompanyObj?.socialFacebook ?? companyObj?.socialFacebook,
    socialInstagram: newCompanyObj?.socialInstagram ?? companyObj?.socialInstagram,
    socialLinkedin: newCompanyObj?.socialLinkedin ?? companyObj?.socialLinkedin,
    socialTwitter: newCompanyObj?.socialTwitter ?? companyObj?.socialTwitter,
    tagline: newCompanyObj?.tagline ?? companyObj?.tagline,
    tin: newCompanyObj?.tin ?? companyObj?.tin,
    tinType: newCompanyObj?.tinType ?? companyObj?.tinType,
    type: newCompanyObj?.type ?? companyObj?.type,
    website: newCompanyObj?.website ?? companyObj?.website
  }

  removeEmpty(companyRequest)

  return companyRequest
}
