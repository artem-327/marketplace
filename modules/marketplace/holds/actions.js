import * as AT from './action-types'
import * as api from './api'

export const createHold = params => ({
  type: AT.CREATED_HOLD,
  payload: api.createHold(params)
})

export const getCountHolds = () => ({
  type: AT.GET_COUNT_HOLDS,
  payload: api.getCountHolds()
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

export function toggleHolds(type) {
  return {
    type: AT.TOGGLE_HOLDS,
    payload: type
  }
}

export function handleVariableSave(variable, value) {
  return {
    type: AT.HOLD_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}