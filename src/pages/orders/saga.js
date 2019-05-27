import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from './api'
import * as AT from './action-types'

/*
 * Get list of (sale/purchase) Orders
 */
function* getOrders(action) {
    try {
      yield put({type: AT.ORDERS_FETCH_REQUESTED})

      let data = []
      if (action.payload.filter) {
        let filters = {
          filters: []
        }

        if (action.payload.filter.orderId) {
          filters.filters.push({
            operator: 'EQUALS',
            path: 'Order.id',
            values: [action.payload.filter.orderId],
            //status: !action.payload.filter || action.payload.filter.status === 'All' ? '' : action.payload.filter.status
          })
        }
        if (action.payload.filter.orderFrom) {
          filters.filters.push({
            operator: 'GREATER_THAN_OR_EQUAL_TO',
            path: 'Order.createdAt',
            values: [action.payload.filter.orderFrom+'T00:00:00Z']
          })
        }
        if (action.payload.filter.orderTo) {
          filters.filters.push({
            operator: 'LESS_THAN_OR_EQUAL_TO',
            path: 'Order.createdAt',
            values: [action.payload.filter.orderTo+'T23:59:59Z']
          })
        }
        if (action.payload.filter.customer) {
          filters.filters.push({
            operator: 'EQUALS',
            path: 'Order.buyerCompanyName',
            values: [action.payload.filter.customer],
            //status: !action.payload.filter || action.payload.filter.status === 'All' ? '' : action.payload.filter.status
          })
        }
        // TODO: when prepared filtered path for products in orders - finish following filter
        /*if (action.payload.filter.product) {
          let products = yield call(Api.searchProducts, action.payload.filter.product)
          console.log('PRODUCTS', products)
          filters.filters.push({
            operator: 'EQUALS',
            path: 'OrderItem.id',
            values: products.data.map(item => {
              return item.id
            }),
            //status: !action.payload.filter || action.payload.filter.status === 'All' ? '' : action.payload.filter.status
          })
        }*/
        if (action.payload.filter.status && action.payload.filter.status !== 'All') {
          filters.filters.push({
            operator: 'EQUALS',
            path: 'Order.globalStatus',
            values: [action.payload.filter.status]
          })
        }
        data = yield call(Api.getAll, action.payload.endpointType, filters)
      } else {
        data = yield call(Api.getAll, action.payload.endpointType, {})
      }

      data.dataType = action.payload.endpointType
      data.statusFilter = !action.payload.filter ? 'All' : action.payload.filter.status
      yield put({type: AT.ORDERS_FETCH_SUCCESS, payload: data})
    } catch (error) {
      yield put({type: AT.ORDERS_FETCH_FAILURE})
    }
}

/*
 * Get detail of (sale/purchase) Order
 */
function* getOrder(action) {
    try {
        yield put({type: AT.ORDERS_DETAIL_FETCH_REQUESTED})
        const detail = yield call(Api.getOrder, action.payload.endpointType, action.payload.selectedIndex)
        detail.detailType = action.payload.endpointType
        yield put({type: AT.ORDERS_DETAIL_FETCH_SUCCESS, payload: detail})
    } catch (error) {
        yield put({type: AT.ORDERS_DETAIL_FETCH_FAILURE})
    }
}

/*
 * Confirm Order
 */
function* confirm(action) {
    try {
        yield put({type: AT.ORDER_CONFIRM_FETCH_REQUESTED})
        yield call(Api.confirm, action.payload.orderId)
        yield put({type: AT.ORDER_CONFIRM_FETCH_SUCCESS})
    } catch (error) {
        yield put({type: AT.ORDER_CONFIRM_FETCH_FAILURE})
    }
}

/*
 * Reject Order
 */
function* reject(action) {
    try {
        yield put({type: AT.ORDER_REJECT_FETCH_REQUESTED})
        yield call(Api.reject, action.payload.orderId)
        yield put({type: AT.ORDER_REJECT_FETCH_SUCCESS})
    } catch (error) {
        yield put({type: AT.ORDER_REJECT_FETCH_FAILURE})
    }
}

export default function* () {
    yield takeLatest(AT.ORDERS_FETCH, getOrders)
    yield takeEvery(AT.ORDERS_DETAIL_FETCH, getOrder)
    yield takeEvery(AT.ORDER_CONFIRM_FETCH, confirm)
    yield takeEvery(AT.ORDER_REJECT_FETCH, reject)
}