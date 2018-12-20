import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/merchants';
import {
    MERCHANT_FETCH_REQUESTED, MERCHANT_FETCH_SUCCEEDED, MERCHANT_FETCH_FAILED,
    MERCHANT_EDIT_REQUESTED, MERCHANT_EDIT_SUCCEEDED, MERCHANT_EDIT_FAILED,
    MERCHANTS_FETCH_REQUESTED, MERCHANTS_FETCH_SUCCEEDED, MERCHANTS_FETCH_FAILED,
    MERCHANT_REMOVE_REQUESTED, MERCHANT_REMOVE_SUCCEEDED, MERCHANT_REMOVE_FAILED,
} from "../constants/merchants";
import {
   REMOVE_POPUP
} from "../constants/popup";

function* getMerchants() {
    try {
        const merchants = yield call(Api.getMerchants);
        yield put({type: MERCHANTS_FETCH_SUCCEEDED, payload: merchants});
    } catch (e) {
        yield put({type: MERCHANTS_FETCH_FAILED, message: e.message});
    }
}

function* getMerchant(action) {
    try {
        const merchant = yield call(Api.getMerchant, action.payload.id);
        yield put({type: MERCHANT_FETCH_SUCCEEDED, payload: merchant});
        action.resolve();
    } catch (e) {
        yield put({type: MERCHANT_FETCH_FAILED, message: e.message});
    }
}

function* putMerchantEdit(action) {
    try {
        yield call(Api.putMerchantEdit, action.payload.merchant);
        yield put({type: MERCHANT_EDIT_SUCCEEDED});
    } catch (e) {
        yield put({type: MERCHANT_EDIT_FAILED, message: e.message});
    }
}

function* deleteMerchant(action) {
    try {
        yield call(Api.deleteMerchant, action.payload.id);
        yield put({type: MERCHANT_REMOVE_SUCCEEDED});
        yield put({type: REMOVE_POPUP});
        yield put({type: MERCHANTS_FETCH_REQUESTED, payload: action.payload.merchants});
    } catch (e) {
        yield put({type: MERCHANT_REMOVE_FAILED, message: e.message});
    }
}

function* merchantsSaga() {
    yield takeEvery(MERCHANTS_FETCH_REQUESTED, getMerchants);
    yield takeEvery(MERCHANT_FETCH_REQUESTED, getMerchant);
    yield takeEvery(MERCHANT_EDIT_REQUESTED, putMerchantEdit);
    yield takeEvery(MERCHANT_REMOVE_REQUESTED, deleteMerchant)
}

export default merchantsSaga;
