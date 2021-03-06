import * as AT from './action-types'
import api from './api'

export const nextStep = index => ({ type: AT.NEXT_STEP, payload: index })
export const prevStep = index => ({ type: AT.PREV_STEP, payload: index })
export const countBeneficialOwners = number => ({ type: AT.COUNT_BENEFICIAL_OWNERS, payload: number })
export const cleareActiveStep = () => ({ type: AT.CLEARE_ACTIVE_STEP })
export const postRegisterVelloci = (body, companyId) => {
  return async dispatch => {
    await dispatch({
      type: AT.REGISTER_VELLOCI,
      payload: api.postRegisterVelloci(body, companyId)
    })
    // dispatch(postUploadDocuments(files, companyId))
  }
}
export const postUploadDocuments = (files, companyId) => ({
  type: AT.UPLOAD_DOCUMENTS,
  payload: api.postUploadDocuments(files, companyId)
})
export const getBusinessTypes = () => ({ type: AT.GET_BUSINESS_TYPES, payload: api.getBusinessTypes() })
export const getNaicsCodes = () => ({ type: AT.GET_NAICS_CODES, payload: api.getNaicsCodes() })

export const getBusinessRoles = () => ({ type: AT.GET_VELLOCI_BUSINESS_ROLES, payload: api.getBusinessRoles() })
export const getEntityDocuments = () => ({ type: AT.GET_VELLOCI_ENTITY_DOCUMENTS, payload: api.getEntityDocuments() })
export const getPoliticallyExposedPersons = () => ({
  type: AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS,
  payload: api.getPoliticallyExposedPersons()
})
export const getTinTypes = () => ({ type: AT.GET_VELLOCI_TIN_TYPES, payload: api.getTinTypes() })
export const getBusinessDetails = () => ({ type: AT.GET_VELLOCI_BUSINESS_DETAILS, payload: api.getBusinessDetails() })
export const loadSubmitButton = isLoading => ({ type: AT.LOAD_SUBMIT_BUTTON, payload: isLoading })

export const openEmailPopup = () => ({ type: AT.VELLOCI_REG_OPEN_EMAIL_POPUP, payload: null })
export const closeEmailPopup = () => ({ type: AT.VELLOCI_REG_CLOSE_EMAIL_POPUP, payload: null })

export const inviteBeneficialOwners = (body, companyId) => ({
  type: AT.VELLOCI_INVITE_BENEFICIAL_OWNERS,
  payload: api.inviteBeneficialOwners(body, companyId)
})

export const setNotifiedOwners = body => ({
  type: AT.VELLOCI_SET_NOTIFIED_OWNERS,
  payload: body
})

export const registerBeneficialOwner = (body, token) => ({
  type: AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS,
  payload: api.registerBeneficialOwner(body, token)
})

export const checkMagicToken = token => ({
  type: AT.VELLOCI_CHECK_MAGIC_TOKEN,
  payload: api.checkMagicToken(token)
})

export const applicationSubmitted = value => ({
  type: AT.VELLOCI_APPLICATION_SUBMITTED,
  payload: value
})

export const coiDocumentUploaded = value => ({
  type: AT.VELLOCI_COI_DOCUMENT_UPLOADED,
  payload: value
})

export const getEnumsBusinessMarkets = () => ({
  type: AT.GET_VELLOCI_BUSINESS_MARKETS,
  payload: api.getEnumsBusinessMarkets()
})

export const getEnumsBusinessTypes = () => ({
  type: AT.GET_VELLOCI_BUSINESS_TYPES,
  payload: api.getEnumsBusinessTypes()
})