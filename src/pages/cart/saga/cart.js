import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../api/cart';
import {
    OFFER_FETCH_SUCCEEDED, OFFER_FETCH_FAILED, OFFER_FETCH_REQUESTED,
    CARTITEMS_FETCH_SUCCEEDED, CARTITEMS_FETCH_FAILED, CARTITEMS_FETCH_REQUESTED
} from "../../../constants/cart";

function* getCurrentAdded(action) {
    try {
        const offers = yield call(Api.getCurrentAdded, action.payload.id);
        yield put({type: OFFER_FETCH_SUCCEEDED, payload: offers});
    } catch (e) {
        yield put({type: OFFER_FETCH_FAILED, message: e.message});
    }
}

function* fetchCartItems() {
    try {
        const cart = yield call(Api.fetchCartItems);
        yield put({type: CARTITEMS_FETCH_SUCCEEDED, payload: cart});
    } catch (e) {
        yield put({type: CARTITEMS_FETCH_FAILED, message: e.message});
    }
}

function* cartSaga() {
    yield takeEvery(OFFER_FETCH_REQUESTED, getCurrentAdded);
    yield takeEvery(CARTITEMS_FETCH_REQUESTED, fetchCartItems);
}

export default cartSaga;
