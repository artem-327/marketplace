import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from './api'
import * as AT from './action-types'

function* getOrders(action) {
    try {
        yield put({type: AT.ORDERS_FETCH_REQUESTED})
        const data = yield call(Api.getAll, action.payload.endpointType)
        yield put({type: AT.ORDERS_FETCH_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: AT.ORDERS_FETCH_FAILURE})
    }
}

function* getOrder(action) {
    try {
        yield put({type: AT.ORDERS_DETAIL_FETCH_REQUESTED})
        const detail = yield call(Api.getOrder, action.payload.endpointType, action.payload.selectedIndex)
        yield put({type: AT.ORDERS_DETAIL_FETCH_SUCCESS, payload: detail})
    } catch (error) {
        yield put({type: AT.ORDERS_DETAIL_FETCH_FAILURE})
    }
}

function* confirm(action) {
    try {
        yield put({type: AT.ORDER_CONFIRM_FETCH_REQUESTED})
        yield call(Api.confirm, action.payload.orderId)
        yield put({type: AT.ORDER_CONFIRM_FETCH_SUCCESS})
    } catch (error) {
        yield put({type: AT.ORDER_CONFIRM_FETCH_FAILURE})
    }
}

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
    yield takeEvery(AT.ORDERS_FETCH, getOrders)
    yield takeEvery(AT.ORDERS_DETAIL_FETCH, getOrder)
    yield takeEvery(AT.ORDER_CONFIRM_FETCH, confirm)
    yield takeEvery(AT.ORDER_REJECT_FETCH, reject)
}