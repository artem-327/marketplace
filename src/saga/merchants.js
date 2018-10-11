import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/merchants';
import {
    MERCHANT_FETCH_REQUESTED, MERCHANT_FETCH_SUCCEEDED, MERCHANT_FETCH_FAILED
} from "../constants/merchants";


function* fetchMerchant(action) {
    try {
        const merchant = yield call(Api.fetchMerchant, action.payload.id);
        yield put({type: MERCHANT_FETCH_SUCCEEDED, payload: merchant});
    } catch (e) {
        yield put({type: MERCHANT_FETCH_FAILED, message: e.message});
    }
}

function* merchantsSaga() {
    yield takeEvery(MERCHANT_FETCH_REQUESTED, fetchMerchant);
}

export default merchantsSaga;
