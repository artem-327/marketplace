import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../api/cart';
import {
    OFFER_FETCH_SUCCEEDED, OFFER_FETCH_FAILED, OFFER_FETCH_REQUESTED,
    PAYMENTS_FETCH_SUCCEEDED, PAYMENTS_FETCH_FAILED, PAYMENTS_FETCH_REQUESTED,
    CART_FETCH_SUCCEEDED, CART_FETCH_FAILED, CART_FETCH_REQUESTED,
    DELIVERYADDRESSES_FETCH_REQUESTED, DELIVERYADDRESSES_FETCH_FAILED, DELIVERYADDRESSES_FETCH_SUCCEEDED,
    PRODUCTFROMCART_REMOVE_REQUESTED, PRODUCTFROMCART_REMOVE_FAILED, PRODUCTFROMCART_REMOVE_SUCCEEDED,
    CARTITEM_CREATE_REQUESTED, CARTITEM_CREATE_FAILED, CARTITEM_CREATE_SUCCEEDED,
    DELIVERYADDRESS_CREATE_REQUESTED, DELIVERYADDRESS_CREATE_FAILED, DELIVERYADDRESS_CREATE_SUCCEEDED,
} from "../../../constants/cart";

function* getProductOffer(action) {
    try {
        const offers = yield call(Api.getProductOffer, action.payload.id);
        yield put({type: OFFER_FETCH_SUCCEEDED, payload: offers});
    } catch (e) {
        yield put({type: OFFER_FETCH_FAILED, message: e.message});
    }
}

function* fetchCart() {
    try {
        const cart = yield call(Api.fetchCart);
        yield put({type: CART_FETCH_SUCCEEDED, payload: cart});
    } catch (e) {
        yield put({type: CART_FETCH_FAILED, message: e.message});
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

function* fetchPayments() {
    try {
        const addresses = yield call(Api.fetchPayments);
        yield put({type: PAYMENTS_FETCH_SUCCEEDED, payload: addresses});
    } catch (e) {
        yield put({type: PAYMENTS_FETCH_FAILED, message: e.message});
    }
}

function* removeProductFromCart(action) {
    try {
        yield call(Api.removeProductFromCart, action.payload.id);
        yield put({type: PRODUCTFROMCART_REMOVE_SUCCEEDED});
        const cart = yield call(Api.fetchCart);
        yield put({type: CART_FETCH_SUCCEEDED, payload: cart});
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

function* createDeliveryAddress(action) {
    try {
        yield call(Api.createDeliveryAddress, action.payload);
        yield put({type: DELIVERYADDRESS_CREATE_SUCCEEDED});
    } catch (e) {
        yield put({type: DELIVERYADDRESS_CREATE_FAILED, message: e.message});
    }
}

function* cartSaga() {
    yield takeEvery(OFFER_FETCH_REQUESTED, getProductOffer);
    yield takeEvery(CART_FETCH_REQUESTED, fetchCart);
    yield takeEvery(DELIVERYADDRESSES_FETCH_REQUESTED, fetchDeliveryAddresses);
    yield takeEvery(PAYMENTS_FETCH_REQUESTED, fetchPayments);
    yield takeEvery(PRODUCTFROMCART_REMOVE_REQUESTED, removeProductFromCart);
    yield takeEvery(CARTITEM_CREATE_REQUESTED, createCartItem);
    yield takeEvery(DELIVERYADDRESS_CREATE_REQUESTED, createDeliveryAddress);
}

export default cartSaga;
