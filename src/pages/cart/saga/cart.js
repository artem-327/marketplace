import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../api/cart';
import {
    OFFER_FETCH_SUCCEEDED, OFFER_FETCH_FAILED, OFFER_FETCH_REQUESTED,
    CARTITEMS_FETCH_SUCCEEDED, CARTITEMS_FETCH_FAILED, CARTITEMS_FETCH_REQUESTED,
    DELIVERYADDRESSES_FETCH_REQUESTED, DELIVERYADDRESSES_FETCH_FAILED, DELIVERYADDRESSES_FETCH_SUCCEEDED,
    PRODUCTFROMCART_REMOVE_REQUESTED, PRODUCTFROMCART_REMOVE_FAILED, PRODUCTFROMCART_REMOVE_SUCCEEDED,
    CARTITEM_CREATE_REQUESTED, CARTITEM_CREATE_FAILED, CARTITEM_CREATE_SUCCEEDED
} from "../../../constants/cart";

function* getProductOffer(action) {
    try {
        const offers = yield call(Api.getProductOffer, action.payload.id);
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

function* fetchDeliveryAddresses() {
    try {
        const addresses = yield call(Api.fetchDeliveryAddresses);
        yield put({type: DELIVERYADDRESSES_FETCH_SUCCEEDED, payload: addresses});
    } catch (e) {
        yield put({type: DELIVERYADDRESSES_FETCH_FAILED, message: e.message});
    }
}


function* removeProductFromCart(action) {
    try {
        yield call(Api.removeProductFromCart, action.payload.id);
        yield put({type: PRODUCTFROMCART_REMOVE_SUCCEEDED});
        const cart = yield call(Api.fetchCartItems);
        yield put({type: CARTITEMS_FETCH_SUCCEEDED, payload: cart});
    } catch (e) {
        yield put({type: PRODUCTFROMCART_REMOVE_FAILED, message: e.message});
    }
}

function* createCartItem(action) {
    try {
        yield call(Api.createCartItem, action.payload);
        yield put({type: CARTITEM_CREATE_SUCCEEDED});
    } catch (e) {
        yield put({type: CARTITEM_CREATE_FAILED, message: e.message});
    }
}

function* cartSaga() {
    yield takeEvery(OFFER_FETCH_REQUESTED, getProductOffer);
    yield takeEvery(CARTITEMS_FETCH_REQUESTED, fetchCartItems);
    yield takeEvery(DELIVERYADDRESSES_FETCH_REQUESTED, fetchDeliveryAddresses);
    yield takeEvery(PRODUCTFROMCART_REMOVE_REQUESTED, removeProductFromCart);
    yield takeEvery(CARTITEM_CREATE_REQUESTED, createCartItem);
}

export default cartSaga;
