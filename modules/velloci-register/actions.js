import * as AT from './action-types'

export const nextStep = index => ({ type: AT.NEXT_STEP, payload: index })
export const prevStep = index => ({ type: AT.PREV_STEP, payload: index })
export const cleareActiveStep = () => ({ type: AT.CLEARE_ACTIVE_STEP })
export const postRegisterVelloci = body => ({ type: AT.REGISTER_VELLOCI, payload: api.postRegisterVelloci(body) })
