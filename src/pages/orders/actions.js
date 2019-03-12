import * as AT from './action-types'
import api from './api';

export const loadData = (endpointType, orderStatus = null) => ({type: AT.ORDERS_FETCH, payload: {endpointType, orderStatus}})
export const loadDetail = (endpointType, selectedIndex) => ({type: AT.ORDERS_DETAIL_FETCH, payload: {endpointType, selectedIndex}})
export const confirmOrder = (orderId) => ({type: AT.ORDER_CONFIRM_FETCH, payload: {orderId}})
export const rejectOrder = (orderId) => ({type: AT.ORDER_REJECT_FETCH, payload: {orderId}})