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

export function handleActiveTab(tab, currentTab) {
  if (tab.type !== currentTab.type) Datagrid.clear()
  return {
    type: AT.OPERATIONS_HANDLE_ACTIVE_TAB,
    payload: { tab }
  }
}

export const searchCompany = (companyText, limit) => ({
  type: AT.OPERATIONS_SEARCH_COMPANY,
  payload: api.searchCompany(companyText, limit)
})

export const setProductMappedUnmaped = value => ({
  type: AT.OPERATIONS_SET_PRODUCT_MAPPED_UNMAPPED,
  payload: value
})

export const loadData = (filter = null) => ({
  type: AT.OPERATIONS_ORDERS_FETCH_SUCCESS,
  payload: { filter }
})

export const openOrderDetail = (data = null) => ({
  type: AT.OPERATIONS_OPEN_ORDER_DETAIL,
  payload: data
})

export function getDocumentTypes() {
  return {
    type: AT.OPERATIONS_GET_DOCUMENT_TYPES,
    payload: api.getDocumentTypes()
  }
}

export const cancelOrder = orderId => ({
  type: AT.OPERATIONS_ORDERS_CANCEL_ORDER,
  payload: api.cancelOrder(orderId)
})

export const clearAccountingDocuments = () => ({
  type: AT.OPERATIONS_GET_ORDER_ACCOUNTING_DOCUMENTS_CLEAR,
  payload: {}
})

export const getAccountingDocuments = orderId => ({
  type: AT.OPERATIONS_GET_ORDER_ACCOUNTING_DOCUMENTS,
  payload: api.getAccountingDocuments(orderId)
})

export function saveFilters(filters) {
  return {
    type: AT.OPERATIONS_SAVE_FILTERS,
    payload: filters
  }
}