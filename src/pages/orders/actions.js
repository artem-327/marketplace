import * as AT from './action-types'
import api from './api';

export const loadData = () => ({type: AT.ORDERS_FETCH})
export const loadDetail = (selectedIndex) => ({type: AT.ORDERS_DETAIL_FETCH, payload: {selectedIndex}})
export const confirmOrder = (orderId) => ({type: AT.ORDER_CONFIRM_FETCH, payload: {orderId}})