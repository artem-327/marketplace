import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/broadcast';
import {
  BROADCAST_FETCH_REQUESTED, 
  BROADCAST_FETCH_SUCCEEDED,
  BROADCAST_FETCH_FAILED
} from "../constants/broadcast";

function* fetchBroadcast(action) {
    try {
        const broadcastData = yield call(Api.fetchBroadcast);
        yield put({type: BROADCAST_FETCH_SUCCEEDED, payload: broadcastData});
        action.resolve()
    } catch (e) {
        yield put({type: BROADCAST_FETCH_FAILED, message: e.message});
    }
}

function* broadcastSaga() {
    yield takeEvery(BROADCAST_FETCH_REQUESTED, fetchBroadcast);
}

export default broadcastSaga;