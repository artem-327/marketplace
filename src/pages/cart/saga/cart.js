import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../api/cart';
import {
    OFFER_FETCH_SUCCEEDED, OFFER_FETCH_FAILED, OFFER_FETCH_REQUESTED
} from "../../../constants/cart";

function* getCurrentAdded() {
    try {
        const offer = yield call(Api.getCurrentAdded);
        yield put({type: OFFER_FETCH_SUCCEEDED, payload: offer});
    } catch (e) {
        yield put({type: OFFER_FETCH_FAILED, message: e.message});
    }
}

function* cartSaga() {
    yield takeEvery(OFFER_FETCH_REQUESTED, getCurrentAdded);
}

export default cartSaga;
