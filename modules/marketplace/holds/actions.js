import * as AT from './action-types'
import * as api from './api'

export const createHold = params => ({
  type: AT.CREATED_HOLD,
  payload: api.createHold(params)
})

export const getMyHolds = () => ({
  type: AT.GET_MY_HOLDS,
  payload: api.getMyHolds()
})

export const getForeignHolds = () => ({
  type: AT.GET_FOREIGN_HOLDS,
  payload: api.getForeignHolds()
})

export const rejectHold = id => ({
  type: AT.REJECT_HOLD,
  payload: api.rejectHold(id)
})

export const cancelHold = id => ({
  type: AT.CANCEL_HOLD,
  payload: api.cancelHold(id)
})

export const approveHold = id => ({
  type: AT.APPROVE_HOLD,
  payload: api.approveHold(id)
})

export const toCartHold = id => ({
  type: AT.TO_CART_HOLD,
  payload: api.toCartHold(id)
})

export function applyDatagridFilter(filter) {
  return {
    type: AT.HOLD_APPLY_FILTER,
    payload: filter
  }
}
