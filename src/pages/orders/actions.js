import * as AT from './action-types'
import Api from './api'

export const loadData = (endpointType, filter = null) => ({type: AT.ORDERS_FETCH, payload: {endpointType, filter}})
export const loadDetail = (endpointType, selectedIndex) => ({type: AT.ORDERS_DETAIL_FETCH, payload: {endpointType, selectedIndex}})
export const confirmOrder = (orderId) => ({type: AT.ORDER_CONFIRM_FETCH, payload: {orderId}})
export const rejectOrder = (orderId) => ({type: AT.ORDER_REJECT_FETCH, payload: {orderId}})
export const downloadPdf = (orderId) => ({type: AT.ORDER_DOWNLOAD_PDF, payload: Api.downloadPdf(orderId)})
export const searchCompany = (companyText) => ({type: AT.ORDERS_SEARCH_COMPANY, payload: Api.searchCompany(companyText)})