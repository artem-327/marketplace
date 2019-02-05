import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from './api'
import * as AT from './action-types'

function* getOrders() {
    try {
        yield put({type: AT.ORDERS_FETCH_REQUESTED})
        const data = yield call(Api.getAll)
        yield put({type: AT.ORDERS_FETCH_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: AT.ORDERS_FETCH_FAILURE})
    }
}

function* getOrder(action) {
    try {
        yield put({type: AT.ORDERS_DETAIL_FETCH_REQUESTED})
        const detail = yield call(Api.getOrder, action.payload.selectedIndex)
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

export default function* () {
    yield takeEvery(AT.ORDERS_FETCH, getOrders)
    yield takeEvery(AT.ORDERS_DETAIL_FETCH, getOrder)
    yield takeEvery(AT.ORDER_CONFIRM_FETCH, confirm)
}