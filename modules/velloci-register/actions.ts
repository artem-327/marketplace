import * as AT from './action-types'
import api from './api'
import { VellociActionTypes } from './types'

export const nextStep = (index: number): VellociActionTypes => ({ type: AT.NEXT_STEP, payload: index })
export const prevStep = (index: number): VellociActionTypes => ({ type: AT.PREV_STEP, payload: index })
export const countBeneficialOwners = (number: number): VellociActionTypes => ({ type: AT.COUNT_BENEFICIAL_OWNERS, payload: number })
export const cleareActiveStep = (): VellociActionTypes => ({ type: AT.CLEARE_ACTIVE_STEP })
export const postRegisterVelloci = (body: object, companyId: number, files: []) => {
  return async (dispatch: (arg0: VellociActionTypes) => Promise<any>)=> {
    return api.postRegisterVelloci(body, companyId).then(() => {
      dispatch(postUploadDocuments(files, companyId))
    })
  }
}
export const postUploadDocuments = (files: [], companyId: number): VellociActionTypes => ({
  type: AT.UPLOAD_DOCUMENTS,
  payload: api.postUploadDocuments(files, companyId)
})
export const getEntityTypes = (): VellociActionTypes => ({ type: AT.GET_ENTITY_TYPES, payload: api.getEntityTypes() })
export const getNaicsCodes = (): VellociActionTypes => ({ type: AT.GET_NAICS_CODES, payload: api.getNaicsCodes() })

export const getBusinessRoles = (): VellociActionTypes => ({ type: AT.GET_VELLOCI_BUSINESS_ROLES, payload: api.getBusinessRoles() })
export const getEntityDocuments = (): VellociActionTypes => ({ type: AT.GET_VELLOCI_ENTITY_DOCUMENTS, payload: api.getEntityDocuments() })
export const getPoliticallyExposedPersons = (): VellociActionTypes => ({
  type: AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS,
  payload: api.getPoliticallyExposedPersons()
})
export const getTinTypes = (): VellociActionTypes => ({ type: AT.GET_VELLOCI_TIN_TYPES, payload: api.getTinTypes() })
export const getBusinessDetails = (): VellociActionTypes => ({ type: AT.GET_VELLOCI_BUSINESS_DETAILS, payload: api.getBusinessDetails() })
export const loadSubmitButton = (isLoading: boolean): VellociActionTypes => ({ type: AT.LOAD_SUBMIT_BUTTON, payload: isLoading })

export const openEmailPopup = (): VellociActionTypes => ({ type: AT.VELLOCI_REG_OPEN_EMAIL_POPUP, payload: null })
export const closeEmailPopup = (): VellociActionTypes => ({ type: AT.VELLOCI_REG_CLOSE_EMAIL_POPUP, payload: null })

export const inviteBeneficialOwners = (body: object, companyId: number): VellociActionTypes => ({
  type: AT.VELLOCI_INVITE_BENEFICIAL_OWNERS,
  payload: api.inviteBeneficialOwners(body, companyId)
})

export const registerBeneficialOwner = (body: object, token: string): VellociActionTypes => ({
  type: AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS,
  payload: api.registerBeneficialOwner(body, token)
})

export const checkMagicToken = (token: string): VellociActionTypes => ({
  type: AT.VELLOCI_CHECK_MAGIC_TOKEN,
  payload: api.checkMagicToken(token)
})
