import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/shippingQuotes'
import {
  SHIPPINGQUOTES_FETCH_REQUESTED,
  SHIPPINGQUOTES_FETCH_FAILED,
  SHIPPINGQUOTES_FETCH_SUCCEEDED
} from '../constants/shippingQuotes'

function* getShippingQuotes(action) {
  try {
    const shippingQuotes = yield call(Api.getShippingQuotes, JSON.stringify(action.payload.pack))
    yield put({ type: SHIPPINGQUOTES_FETCH_SUCCEEDED, payload: shippingQuotes })
  } catch (e) {
    yield put({ type: SHIPPINGQUOTES_FETCH_FAILED, message: e.message })
  }
}

function* shippingQuotesSaga() {
  yield takeEvery(SHIPPINGQUOTES_FETCH_REQUESTED, getShippingQuotes)
}

export default shippingQuotesSaga
