import * as AT from './action-types'

export const loadData = () => ({type: AT.ORDERS_FETCH})
export const loadDetail = (selectedIndex) => ({type: AT.ORDERS_DETAIL_FETCH, payload: {selectedIndex}})