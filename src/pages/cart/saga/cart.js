import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../api/cart'
import {
  OFFER_FETCH_SUCCEEDED,
  OFFER_FETCH_FAILED,
  OFFER_FETCH_REQUESTED,
  PAYMENTS_FETCH_SUCCEEDED,
  PAYMENTS_FETCH_FAILED,
  PAYMENTS_FETCH_REQUESTED,
  CART_FETCH_REQUESTED_FULFILLED,
  CART_FETCH_FAILED,
  CART_FETCH_REQUESTED,
  DELIVERYADDRESSES_FETCH_REQUESTED,
  DELIVERYADDRESSES_FETCH_FAILED,
  DELIVERYADDRESSES_FETCH_SUCCEEDED,
  PRODUCTFROMCART_REMOVE_REQUESTED,
  PRODUCTFROMCART_REMOVE_FAILED,
  PRODUCTFROMCART_REMOVE_SUCCEEDED,
  CARTITEM_CREATE_REQUESTED,
  CARTITEM_CREATE_FAILED,
  CARTITEM_CREATE_SUCCEEDED,
  DELIVERYADDRESS_CREATE_REQUESTED,
  DELIVERYADDRESS_CREATE_FAILED,
  DELIVERYADDRESS_CREATE_SUCCEEDED,
  ORDERDETAIL_FETCH_REQUESTED,
  ORDERDETAIL_FETCH_FAILED,
  ORDERDETAIL_FETCH_SUCCEEDED,
  ORDER_EDIT_SUCCEEDED,
  ORDER_EDIT_FAILED,
  ORDER_EDIT_REQUESTED,
  DELIVERYADDRESS_EDIT_SUCCEEDED,
  DELIVERYADDRESS_EDIT_FAILED,
  DELIVERYADDRESS_EDIT_REQUESTED,
  SHIPPING_QUOTES_FETCH_REQUESTED,
  SHIPPING_QUOTES_FETCH_SUCCEEDED,
  SHIPPING_QUOTES_FETCH_FAILED,
  UPDATE_CART_ITEM_REQUESTED,
  UPDATE_CART_ITEM_SUCCEEDED,
  UPDATE_CART_ITEM_FAILED,
  ADD_CART_ITEM_REQUESTED,
  ADD_CART_ITEM_SUCCEEDED,
  ADD_CART_ITEM_FAILED
} from '../../../constants/cart'

function* getProductOffer(action) {
  try {
    const offerDetail = yield call(Api.getProductOffer, action.payload.id)
    yield put({ type: OFFER_FETCH_SUCCEEDED, payload: { ...offerDetail, isEdit: action.payload.isEdit } })
  } catch (e) {
    yield put({ type: OFFER_FETCH_FAILED, message: e.message })
  }
}

function* getDeliveryAddresses() {
  try {
    const addresses = yield call(Api.getDeliveryAddresses)
    yield put({ type: DELIVERYADDRESSES_FETCH_SUCCEEDED, payload: addresses })
  } catch (e) {
    yield put({ type: DELIVERYADDRESSES_FETCH_FAILED, message: e.message })
  }
}

function* getPayments() {
  try {
    const addresses = yield call(Api.getPayments)
    yield put({ type: PAYMENTS_FETCH_SUCCEEDED, payload: addresses })
  } catch (e) {
    yield put({ type: PAYMENTS_FETCH_FAILED, message: e.message })
  }
}

function* deleteCart(action) {
  try {
    yield call(Api.deleteCart, action.payload.id)
    yield put({ type: PRODUCTFROMCART_REMOVE_SUCCEEDED })
    const cart = yield call(Api.getCart)
    yield put({ type: CART_FETCH_SUCCEEDED, payload: cart })
  } catch (e) {
    yield put({ type: PRODUCTFROMCART_REMOVE_FAILED, message: e.message })
  }
}

function* postNewOrder(action) {
  try {
    yield call(Api.postNewOrder, action.payload.product)
    yield put({ type: CARTITEM_CREATE_SUCCEEDED, payload: action.payload.product })
  } catch (e) {
    yield put({ type: CARTITEM_CREATE_FAILED, message: e.message })
  }
}

function* postNewDeliveryAddress(action) {
  try {
    let address = yield call(Api.postNewDeliveryAddress, action.payload)
    yield put({ type: DELIVERYADDRESS_CREATE_SUCCEEDED, payload: address })
  } catch (e) {
    yield put({ type: DELIVERYADDRESS_CREATE_FAILED, message: e.message })
  }
}

// function* getOrderDetail(action) {
//     try {
//         const order = yield call(Api.getOrderDetail, action.payload.id)
//         yield put({type: ORDERDETAIL_FETCH_SUCCEEDED, payload: order})
//     } catch (e) {
//         yield put({type: ORDERDETAIL_FETCH_FAILED, message: e.message})
//     }
// }

function* postOrderEdit(action) {
  try {
    yield call(Api.postOrderEdit, action.payload.order)
    yield put({ type: ORDER_EDIT_SUCCEEDED })
  } catch (e) {
    yield put({ type: ORDER_EDIT_FAILED, message: e.message })
  }
}

function* updateDeliveryAddress(action) {
  try {
    let address = yield call(Api.updateDeliveryAddress, action.payload)
    yield put({ type: DELIVERYADDRESS_EDIT_SUCCEEDED, payload: address })
  } catch (e) {
    yield put({ type: DELIVERYADDRESS_EDIT_FAILED, message: e.message })
  }
}

function* getShippingQuotes(action) {
  try {
    const shippingQuotes = yield call(Api.getShippingQuotes, action.payload.countryId, action.payload.zip)
    yield put({ type: SHIPPING_QUOTES_FETCH_SUCCEEDED, payload: shippingQuotes })
  } catch (e) {
    yield put({ type: SHIPPING_QUOTES_FETCH_FAILED, message: e.message })
  }
}

function* updateCartItem(action) {
  try {
    let cart = yield call(Api.updateCartItem, action.payload)
    yield put({ type: UPDATE_CART_ITEM_SUCCEEDED, payload: cart })
  } catch (e) {
    yield put({ type: UPDATE_CART_ITEM_FAILED, message: e.message })
  }
}

function* addCartItem(action) {
  try {
    let data = yield call(Api.addCartItem, action.payload)
    yield put({ type: ADD_CART_ITEM_SUCCEEDED, payload: data })
  } catch (e) {
    yield put({ type: ADD_CART_ITEM_FAILED, message: e.message })
  }
}

function* cartSaga() {
  yield takeEvery(OFFER_FETCH_REQUESTED, getProductOffer)
  //yield takeEvery(CART_FETCH_REQUESTED, getCart)
  yield takeEvery(DELIVERYADDRESSES_FETCH_REQUESTED, getDeliveryAddresses)
  yield takeEvery(PAYMENTS_FETCH_REQUESTED, getPayments)
  yield takeEvery(PRODUCTFROMCART_REMOVE_REQUESTED, deleteCart)
  yield takeEvery(CARTITEM_CREATE_REQUESTED, postNewOrder)
  yield takeEvery(DELIVERYADDRESS_CREATE_REQUESTED, postNewDeliveryAddress)
  // yield takeEvery(ORDERDETAIL_FETCH_REQUESTED, getOrderDetail)
  yield takeEvery(ORDER_EDIT_REQUESTED, postOrderEdit)
  yield takeEvery(DELIVERYADDRESS_EDIT_REQUESTED, updateDeliveryAddress)
  yield takeEvery(SHIPPING_QUOTES_FETCH_REQUESTED, getShippingQuotes)
  yield takeEvery(UPDATE_CART_ITEM_REQUESTED, updateCartItem)
  yield takeEvery(ADD_CART_ITEM_REQUESTED, addCartItem)
}

export default cartSaga
