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
          filters: [{
            operator: 'EQUALS',
            path: 'Order.id',
            value: action.payload.filter.orderId,
            //status: !action.payload.filter || action.payload.filter.status === 'All' ? '' : action.payload.filter.status
          }]
        }
        data = yield call(Api.filteredAll, action.payload.endpointType, filters)
      } else {
        data = yield call(Api.getAll, action.payload.endpointType)
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