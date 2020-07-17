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