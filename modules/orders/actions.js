import * as AT from './action-types'
import Api from './api'

export const loadData = (endpointType, filter = null) => ({type: AT.ORDERS_FETCH, payload: {endpointType, filter}})
export const loadDetail = (endpointType, selectedIndex) => ({type: AT.ORDERS_DETAIL_FETCH, payload: {endpointType, selectedIndex}})
export const confirmOrder = (orderId) => ({type: AT.ORDER_CONFIRM_FETCH, payload: {orderId}})
export const rejectOrder = (orderId) => ({type: AT.ORDER_REJECT_FETCH, payload: {orderId}})
export const downloadPdf = (endpointType, orderId) => ({type: AT.ORDER_DOWNLOAD_PDF, payload: Api.downloadPdf(endpointType, orderId)})
export const searchCompany = (companyText) => ({type: AT.ORDERS_SEARCH_COMPANY, payload: Api.searchCompany(companyText)})
export const openAssignLots = () => ({type: AT.ORDER_OPEN_ASSIGN_LOTS, payload: {}})
export const closeAssignLots = () => ({type: AT.ORDER_CLOSE_ASSIGN_LOTS, payload: {}})
export const assignLots = (orderId, orderItemId, assignedLots) => ({type: AT.ORDER_ASSIGN_LOTS, payload: Api.assignLots(orderId, orderItemId, assignedLots) })
export const loadLotsToAssign = (productOfferId) => ({type: AT.ORDER_GET_LOTS, payload: Api.getLots(productOfferId) })