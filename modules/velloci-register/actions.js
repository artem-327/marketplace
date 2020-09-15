import * as AT from './action-types'
import api from './api'

export const nextStep = index => ({ type: AT.NEXT_STEP, payload: index })
export const prevStep = index => ({ type: AT.PREV_STEP, payload: index })
export const countBeneficialOwners = number => ({ type: AT.COUNT_BENEFICIAL_OWNERS, payload: number })
export const cleareActiveStep = () => ({ type: AT.CLEARE_ACTIVE_STEP })
export const postRegisterVelloci = body => ({ type: AT.REGISTER_VELLOCI, payload: api.postRegisterVelloci(body) })
export const getEntityTypes = () => ({ type: AT.GET_ENTITY_TYPES, payload: api.getEntityTypes() })
export const getNaicsCodes = () => ({ type: AT.GET_NAICS_CODES, payload: api.getNaicsCodes() })
