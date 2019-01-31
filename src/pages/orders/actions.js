import * as AT from './action-types'
import api from './api';

export const loadData = () => ({type: AT.ORDERS_FETCH})
export const selectRow = (index) => ({type: AT.ORDERS_FETCH, payload: {index}})