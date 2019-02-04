import { call, put, takeEvery } from 'redux-saga/effects'
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

function* get(action) {
    try {
        yield put({type: AT.ORDERS_DETAIL_FETCH_REQUESTED})
        const detail = yield call(Api.get, action.payload.selectedIndex)
        yield put({type: AT.ORDERS_DETAIL_FETCH_SUCCESS, payload: detail})
    } catch (error) {
        yield put({type: AT.ORDERS_DETAIL_FETCH_FAILURE})
    }
}

export default function* () {
    yield takeEvery(AT.ORDERS_FETCH, getOrders)
    yield takeEvery(AT.ORDERS_DETAIL_FETCH, get)
}