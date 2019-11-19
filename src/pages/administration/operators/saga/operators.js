import {call, put, takeEvery} from 'redux-saga/effects'
import Api from '../../../../api/users'
import {
  OPERATORS_FETCH_FAILED,
  OPERATORS_FETCH_REQUESTED,
  OPERATORS_FETCH_SUCCEEDED,
  OPERATOR_REMOVE_FAILED,
  OPERATOR_REMOVE_REQUESTED,
  OPERATOR_REMOVE_SUCCEEDED,
  OPERATOR_EDIT_FAILED,
  OPERATOR_EDIT_REQUESTED,
  OPERATOR_EDIT_SUCCEEDED
} from '../../../../constants/users'

function* getOperators() {
  try {
    const operators = yield call(Api.getOperators)
    yield put({type: OPERATORS_FETCH_SUCCEEDED, payload: operators})
  } catch (e) {
    yield put({type: OPERATORS_FETCH_FAILED, message: e.message})
  }
}

function* deleteOperator(action) {
  try {
    yield call(Api.deleteOperator, action.payload.id)
    yield put({type: OPERATOR_REMOVE_SUCCEEDED})
    yield put({type: OPERATORS_FETCH_REQUESTED})
  } catch (e) {
    yield put({type: OPERATOR_REMOVE_FAILED, message: e.message})
  }
}

function* putOperatorEdit(action) {
  try {
    yield call(Api.putOperatorEdit, action.payload.operator)
    yield put({type: OPERATOR_EDIT_SUCCEEDED})
    yield put({type: OPERATORS_FETCH_REQUESTED})
  } catch (e) {
    yield put({type: OPERATOR_EDIT_FAILED, message: e.message})
  }
}

function* operatorsSaga() {
  yield takeEvery(OPERATORS_FETCH_REQUESTED, getOperators)
  yield takeEvery(OPERATOR_REMOVE_REQUESTED, deleteOperator)
  yield takeEvery(OPERATOR_EDIT_REQUESTED, putOperatorEdit)
}

export default operatorsSaga
