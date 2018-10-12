import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/merchants';
import {
    MERCHANT_FETCH_REQUESTED, MERCHANT_FETCH_SUCCEEDED, MERCHANT_FETCH_FAILED,
    MERCHANT_EDIT_REQUESTED, MERCHANT_EDIT_SUCCEEDED, MERCHANT_EDIT_FAILED,
    MERCHANTS_FETCH_REQUESTED, MERCHANTS_FETCH_SUCCEEDED, MERCHANTS_FETCH_FAILED,
} from "../constants/merchants";

function* fetchMerchants() {
    try {
        const merchants = yield call(Api.fetchMerchants);
        yield put({type: MERCHANTS_FETCH_SUCCEEDED, payload: merchants});
    } catch (e) {
        yield put({type: MERCHANTS_FETCH_FAILED, message: e.message});
    }
}

function* fetchMerchant(action) {
    try {
        const merchant = yield call(Api.fetchMerchant, action.payload.id);
        yield put({type: MERCHANT_FETCH_SUCCEEDED, payload: merchant});
    } catch (e) {
        yield put({type: MERCHANT_FETCH_FAILED, message: e.message});
    }
}

function* editMerchant(action) {
    try {
        yield call(Api.editMerchant, action.payload.merchant);
        yield put({type: MERCHANT_EDIT_SUCCEEDED});
        // yield put({type: MERCHANT_FETCH_REQUESTED, payload: action.payload.merchants});
    } catch (e) {
        yield put({type: MERCHANT_EDIT_FAILED, message: e.message});
    }
}

function* merchantsSaga() {
    yield takeEvery(MERCHANTS_FETCH_REQUESTED, fetchMerchants);
    yield takeEvery(MERCHANT_FETCH_REQUESTED, fetchMerchant);
    yield takeEvery(MERCHANT_EDIT_REQUESTED, editMerchant);
}

export default merchantsSaga;
