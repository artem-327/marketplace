import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../../api/users'
import ApiOffice from '../../../../api/offices'
import {
  PROMOTE_TO_MERCHANT_FAILED,
  PROMOTE_TO_MERCHANT_REQUESTED,
  PROMOTE_TO_MERCHANT_SUCCEEDED,
  PROMOTE_TO_OPERATOR_FAILED,
  PROMOTE_TO_OPERATOR_REQUESTED,
  PROMOTE_TO_OPERATOR_SUCCEEDED,
  USERS_FETCH_NEW_REQUESTED,
  USERS_FETCH_REQUESTED,
  USERS_FETCH_SUCCEEDED,
  USERS_FETCH_FAILED
} from '../../../../constants/users'
import { OFFICES_FETCH_FAILED, OFFICES_FETCH_REQUESTED, OFFICES_FETCH_SUCCEEDED } from '../../../../constants/offices'

function* getUsers() {
  try {
    const users = yield call(Api.getUsers) //const users = yield call(Api.fetchNewUsers);
    yield put({ type: USERS_FETCH_SUCCEEDED, payload: users })
  } catch (e) {
    yield put({ type: USERS_FETCH_FAILED, message: e.message })
  }
}

function* getOffices() {
  try {
    const offices = yield call(ApiOffice.getOffices)
    yield put({ type: OFFICES_FETCH_SUCCEEDED, payload: offices })
  } catch (e) {
    yield put({ type: OFFICES_FETCH_FAILED, message: e.message })
  }
}

function* putPromoteToMerchant(action) {
  try {
    yield call(Api.putPromoteToMerchant, action.payload)
    yield put({ type: PROMOTE_TO_MERCHANT_SUCCEEDED })
    yield put({ type: USERS_FETCH_NEW_REQUESTED })
  } catch (e) {
    yield put({ type: PROMOTE_TO_MERCHANT_FAILED, message: e.message })
  }
}

function* putPromoteToOperator(action) {
  try {
    yield call(Api.putPromoteToOperator, action.payload)
    yield put({ type: PROMOTE_TO_OPERATOR_SUCCEEDED })
    yield put({ type: USERS_FETCH_NEW_REQUESTED })
  } catch (e) {
    yield put({ type: PROMOTE_TO_OPERATOR_FAILED, message: e.message })
  }
}

function* usersSaga() {
  yield takeEvery(USERS_FETCH_REQUESTED, getUsers)
  yield takeEvery(OFFICES_FETCH_REQUESTED, getOffices)
  yield takeEvery(PROMOTE_TO_OPERATOR_REQUESTED, putPromoteToOperator)
  yield takeEvery(PROMOTE_TO_MERCHANT_REQUESTED, putPromoteToMerchant)
}

export default usersSaga
