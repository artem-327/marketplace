import * as AT from './action-types'
import api from './api'

export const nextStep = index => ({ type: AT.NEXT_STEP, payload: index })
export const prevStep = index => ({ type: AT.PREV_STEP, payload: index })
export const countBeneficialOwners = number => ({ type: AT.COUNT_BENEFICIAL_OWNERS, payload: number })
export const cleareActiveStep = () => ({ type: AT.CLEARE_ACTIVE_STEP })
export const postRegisterVelloci = (body, files, documentType) =>
  ({ type: AT.REGISTER_VELLOCI, payload: api.postRegisterVelloci(body, files, documentType) })
export const getEntityTypes = () => ({ type: AT.GET_ENTITY_TYPES, payload: api.getEntityTypes() })
export const getNaicsCodes = () => ({ type: AT.GET_NAICS_CODES, payload: api.getNaicsCodes() })

export const getBusinessRoles = () => ({ type: AT.GET_VELLOCI_BUSINESS_ROLES, payload: api.getBusinessRoles() })
export const getEntityDocuments = () => ({ type: AT.GET_VELLOCI_ENTITY_DOCUMENTS, payload: api.getEntityDocuments() })
export const getPoliticallyExposedPersons = () =>
  ({ type: AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS, payload: api.getPoliticallyExposedPersons() })
export const getTinTypes = () => ({ type: AT.GET_VELLOCI_TIN_TYPES, payload: api.getTinTypes() })
export const getBusinessDetails = () => ({ type: AT.GET_VELLOCI_BUSINESS_DETAILS, payload: api.getBusinessDetails() })

