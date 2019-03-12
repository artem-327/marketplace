import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/productOffers';
import {
    PRODUCTOFFER_REMOVE_REQUESTED,
    PRODUCTOFFER_REMOVE_FAILED,
    PRODUCTOFFER_REMOVE_SUCCEEDED,
} from "../constants/productOffers";


function* removeProductOffer(action) {
    try {
        yield call(Api.removeProductOffer, action.payload.id);
        yield put({type: PRODUCTOFFER_REMOVE_SUCCEEDED});
        yield call(action.payload.onSuccess);
    } catch (e) {
        yield put({type: PRODUCTOFFER_REMOVE_FAILED, message: e.message});
    }
}

function* productOffersSaga() {
    yield takeEvery(PRODUCTOFFER_REMOVE_REQUESTED, removeProductOffer);
}

export default productOffersSaga;
