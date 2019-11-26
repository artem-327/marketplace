import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/broadcast'
import {
  BROADCAST_FETCH_REQUESTED,
  BROADCAST_FETCH_SUCCEEDED,
  BROADCAST_FETCH_FAILED,
  BROADCAST_POST_REQUESTED,
  BROADCAST_POST_SUCCEEDED,
  BROADCAST_POST_FAILED
} from '../constants/broadcast'

function* getBroadcast(action) {
  try {
    const broadcastData = yield call(Api.getBroadcast, action.payload.id)
    yield put({ type: BROADCAST_FETCH_SUCCEEDED, payload: broadcastData })
    action.resolve()
  } catch (e) {
    yield put({ type: BROADCAST_FETCH_FAILED, message: e.message })
  }
}

function* postBroadcast(action) {
  try {
    yield call(Api.postBroadcast, action.payload.id, action.payload.brcRules)
    yield put({ type: BROADCAST_POST_SUCCEEDED })
  } catch (e) {
    yield put({ type: BROADCAST_POST_FAILED, message: e.message })
  }
}

function* broadcastSaga() {
  yield takeEvery(BROADCAST_FETCH_REQUESTED, getBroadcast)
  yield takeEvery(BROADCAST_POST_REQUESTED, postBroadcast)
}

export default broadcastSaga
