import * as AT from './action-types'
import * as api from './api'

export function findProducts(search) {
  return {
    type: AT.MARKETPLACE_FIND_PRODUCTS,
    payload: api.findProducts(search)
  }
}

export const getAutocompleteData = ({ searchQuery }) => ({
  type: AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE,
  payload: api.getAutocompleteData(searchQuery)
})

export const clearAutocompleteData = () => {
  return {
    type: AT.CLEAR_AUTOCOMPLETE_DATA,
    payload: {}
  }
}

export function applyDatagridFilter(filter, reload = true) {
  return {
    type: AT.MARKETPLACE_APPLY_FILTER,
    payload: { filter, reload }
  }
}

export function handleVariableSave(variable, value) {
  return {
    type: AT.MARKETPLACE_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}

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

export function toggleHolds(type) {
  return {
    type: AT.TOGGLE_HOLDS,
    payload: type
  }
}

export function openPopup(row = null) {
  return {
    type: AT.MARKETPLACE_OPEN_POPUP,
    payload: row
  }
}

export function closePopup() {
  return {
    type: AT.MARKETPLACE_CLOSE_POPUP,
    payload: null
  }
}

// ! ! ! ! ! ******************************************************************************

export const makeOffer = (body) => ({
  type: AT.MARKETPLACE_MAKE_OFFER,
  payload: api.makeOffer(body)
})

export const deleteOffer = (id) => ({
  type: AT.MARKETPLACE_DELETE_OFFER,
  payload: api.deleteOffer(id)
})

export const buyerAcceptOffer = (id) => ({
  type: AT.MARKETPLACE_BUYER_ACCEPT_OFFER,
  payload: api.buyerAcceptOffer(id)
})

export const buyerDenyOffer = (id) => ({
  type: AT.MARKETPLACE_BUYER_DENY_OFFER,
  payload: api.buyerDenyOffer(id)
})

export const buyerCounterOffer = (id) => ({
  type: AT.MARKETPLACE_BUYER_COUNTER_OFFER,
  payload: api.buyerCounterOffer(id)
})

export const sellerAcceptOffer = (id) => ({
  type: AT.MARKETPLACE_SELLER_ACCEPT_OFFER,
  payload: api.sellerAcceptOffer(id)
})

export const sellerDenyOffer = (id) => ({
  type: AT.MARKETPLACE_SELLER_DENY_OFFER,
  payload: api.sellerDenyOffer(id)
})

export const sellerCounterOffer = (id) => ({
  type: AT.MARKETPLACE_SELLER_COUNTER_OFFER,
  payload: api.sellerCounterOffer(id)
})