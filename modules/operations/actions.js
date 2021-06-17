import api from './api'
import { Datagrid } from '../datagrid'
import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'

export const openPopup = createAction('OPERATIONS_OPEN_POPUP', (rows = null) => rows)
export const closePopup = createAction('OPERATIONS_CLOSE_POPUP', (rows = null) => rows)
export const deleteShippingQuote = createAsyncAction('OPERATIONS_DELETE_SHIPPING_QUOTE', async (id) => {
  await api.deleteShippingQuote(id)
  Datagrid.removeRow(id)
  return id
})
export const createShippingQuote = createAsyncAction('OPERATIONS_CREATE_SHIPPING_QUOTE', (data) => api.createShippingQuote(data))
export const deleteTag = createAsyncAction('OPERATIONS_DELETE_TAG', async (id) => {
  await api.deleteTag(id)
  Datagrid.removeRow(id)
  return id
})
export const updateTag = createAsyncAction('OPERATIONS_UPDATE_TAG', async (id, name) => {
  const newRow = await api.updateTag(id, name)
  Datagrid.updateRow(id, () => newRow.data)
})
export const createTag = createAsyncAction('OPERATIONS_CREATE_TAG', async (name) => {
  await api.createTag(name)
  Datagrid.loadData()
})
export const searchCompany = createAsyncAction('OPERATIONS_SEARCH_COMPANY', (companyText, limit) => api.searchCompany(companyText, limit))
export const setProductMappedUnmaped = createAction('OPERATIONS_SET_PRODUCT_MAPPED_UNMAPPED', value => value)
export const loadData = createAction('OPERATIONS_ORDERS_FETCH_SUCCESS', (filter = null) => ({filter}))
export const openOrderDetail = createAction('OPERATIONS_OPEN_ORDER_DETAIL', (data = null) => data)
export const cancelOrder = createAsyncAction('OPERATIONS_ORDERS_CANCEL_ORDER', (orderId) => api.cancelOrder(orderId))
export const clearAccountingDocuments = createAction('OPERATIONS_GET_ORDER_ACCOUNTING_DOCUMENTS_CLEAR')
export const getAccountingDocuments = createAsyncAction('OPERATIONS_GET_ORDER_ACCOUNTING_DOCUMENTS', (orderId) => api.getAccountingDocuments(orderId))
export const saveFilters = createAction('OPERATIONS_SAVE_FILTERS', filters => filters)
export const markRequestAsProcessed = createAsyncAction('OPERATIONS_MARK_REQUEST_AS_PROCESSED', (id) => api.markRequestAsProcessed(id))
export const denyRequest = createAsyncAction('OPERATIONS_DENY_REQUEST', (id) => api.denyRequest(id))
export const deleteRequest = createAsyncAction('OPERATIONS_DELETE_REQUEST', (id) => api.deleteRequest(id))
export const searchManualQuoteRequest = createAsyncAction('OPERATIONS_SEARCH_MANUAL_QUOTE_REQUEST', async (val) => {
  const textValue = val.toString()
  const number = parseInt(val)
  let filters = [];

  [
    'ShippingQuoteRequest.requestingCompany.name',
    'ShippingQuoteRequest.requestingUser.name',
    'ShippingQuoteRequest.originCompany.name',
    'ShippingQuoteRequest.destinationCity',
    'ShippingQuoteRequest.destinationCountry',
    'ShippingQuoteRequest.destinationProvince',
    'ShippingQuoteRequest.destinationStreet',
    'ShippingQuoteRequest.destinationZip',
    'ShippingQuoteRequest.originCity',
    'ShippingQuoteRequest.originCountry',
    'ShippingQuoteRequest.originProvince',
    'ShippingQuoteRequest.originStreet',
    'ShippingQuoteRequest.originZip',
    'ShippingQuoteRequest.originCompany.primaryBranch.deliveryAddress.addressName',
    'ShippingQuoteRequest.requestingCompany.primaryBranch.deliveryAddress.addressName'
  ].forEach(path => filters.push({
    operator: 'LIKE',
    path,
    values: [`%${textValue}%`]
  }))

  if (!isNaN(number)) {
    filters.push({
      operator: 'LIKE',
      path: 'ShippingQuoteRequest.id',
      values: [`%${number}%`]
    })
  }

  return await api.searchManualQuoteRequest({
    orFilters: filters,
    pageNumber: 0,
    pageSize: 50
  })
})
export const resolveDisputeAccept = createAsyncAction('RESOLVE_DISPUTE_ACCEPT', (orderId) => api.resolveDisputeAccept(orderId))
export const resolveDisputeCredit = createAsyncAction('RESOLVE_DISPUTE_CREDIT', (orderId, amount) => api.resolveDisputeCredit(orderId, amount))
export const resolveDisputeReject = createAsyncAction('RESOLVE_DISPUTE_REJECT', (orderId) => api.resolveDisputeReject(orderId))
