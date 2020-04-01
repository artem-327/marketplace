import * as AT from './action-types'
import api from './api'
import { Datagrid } from '~/modules/datagrid'

export const tabChanged = tab => ({ type: AT.OPERATIONS_TAB_CHANGED, payload: tab })

export function openPopup(rows = null) {
  return {
    type: AT.OPERATIONS_OPEN_POPUP,
    payload: rows
  }
}

export function closePopup(rows = null) {
  return {
    type: AT.OPERATIONS_CLOSE_POPUP,
    payload: rows
  }
}

export function handleFiltersValue(value) {
  return async dispatch => {
    dispatch({
      type: AT.OPERATIONS_HANDLE_FILTERS_VALUE,
      payload: value
    })
  }
}

export function deleteShippingQuote(id) {
  return {
    type: AT.OPERATIONS_DELETE_SHIPPING_QUOTE,
    async payload() {
      await api.deleteShippingQuote(id)
      Datagrid.removeRow(id)
      return id
    }
  }
}

export function updateShippingQuote(id, data) {
  return {
    //type: AT.OPERATIONS_DELETE_SHIPPING_QUOTE,
    //payload: api.updateShippingQuote(id)  // endpoint not exists
    type: AT.OPERATIONS_CLOSE_POPUP,
    payload: null
  }
}

export function createShippingQuote(data) {
  return {
    type: AT.OPERATIONS_CREATE_SHIPPING_QUOTE,
    payload: api.createShippingQuote(data)
  }
}

export function deleteTag(id) {
  return {
    type: AT.OPERATIONS_DELETE_TAG,
    async payload() {
      await api.deleteTag(id)
      Datagrid.removeRow(id)
      return id
    }
  }
}
//TODO missing endpoint fix updateRow
export function updateTag(id, name) {
  return {
    type: AT.OPERATIONS_UPDATE_TAG,
    async payload() {
      const newRow = await api.updateTag(id, name)
      Datagrid.updateRow(id, () => newRow.data)
    }
  }
}

export function createTag(name) {
  return {
    type: AT.OPERATIONS_CREATE_TAG,
    async payload() {
      await api.createTag(name)
      Datagrid.loadData()
    }
  }
}
