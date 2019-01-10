import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/productOffers';
import {
    PRODUCTOFFER_REMOVE_REQUESTED,
    PRODUCTOFFER_REMOVE_FAILED,
    PRODUCTOFFER_REMOVE_SUCCEEDED,
    SHIPPINGQUOTES_FETCH_REQUESTED,
    SHIPPINGQUOTES_FETCH_FAILED,
    SHIPPINGQUOTES_FETCH_SUCCEEDED
} from "../constants/productOffers";


function* deleteProductOffer(action) {
    try {
        yield call(Api.deleteProductOffer, action.payload.id);
        yield put({type: PRODUCTOFFER_REMOVE_SUCCEEDED});
        yield call(action.payload.onSuccess);
    } catch (e) {
        yield put({type: PRODUCTOFFER_REMOVE_FAILED, message: e.message});
    }
}

function* getShippingQuotes(action) {
    try {
        const shippingQuotes = yield call(Api.getShippingQuotes, action.payload.pack);
        yield put({type: SHIPPINGQUOTES_FETCH_SUCCEEDED, payload: shippingQuotes});
    } catch (e) {
        yield put({type: SHIPPINGQUOTES_FETCH_FAILED, message: e.message});
    }
}

function* productOffersSaga() {
    yield takeEvery(PRODUCTOFFER_REMOVE_REQUESTED, deleteProductOffer);
    yield takeEvery(SHIPPINGQUOTES_FETCH_REQUESTED, getShippingQuotes);
}

export default productOffersSaga;
