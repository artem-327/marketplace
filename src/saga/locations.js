import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/locations'
import {
  REGIONS_FETCH_REQUESTED,
  REGIONS_FETCH_FAILED,
  REGIONS_FETCH_SUCCEEDED,
  STATES_FETCH_REQUESTED,
  STATES_FETCH_FAILED,
  STATES_FETCH_SUCCEEDED,
  STATEDETAIL_FETCH_REQUESTED,
  STATEDETAIL_FETCH_FAILED,
  STATEDETAIL_FETCH_SUCCEEDED,
  REGIONDETAIL_FETCH_REQUESTED,
  REGIONDETAIL_FETCH_FAILED,
  REGIONDETAIL_FETCH_SUCCEEDED,
  PROVINCES_FETCH_REQUESTED,
  PROVINCES_FETCH_FAILED,
  PROVINCES_FETCH_SUCCEEDED
} from '../constants/locations'

function* getRegions(action) {
  try {
    const regions = yield call(Api.getRegions, action.payload.search)
    yield put({ type: REGIONS_FETCH_SUCCEEDED, payload: regions })
  } catch (e) {
    yield put({ type: REGIONS_FETCH_FAILED, message: e.message })
  }
}

function* getStates(action) {
  try {
    const states = yield call(Api.getStates, action.payload.search)
    yield put({ type: STATES_FETCH_SUCCEEDED, payload: states })
  } catch (e) {
    yield put({ type: STATES_FETCH_FAILED, message: e.message })
  }
}

function* getProvinces(action) {
  try {
    const provinces = yield call(Api.getProvinces, action.payload)
    yield put({ type: PROVINCES_FETCH_SUCCEEDED, payload: provinces })
  } catch (e) {
    yield put({ type: PROVINCES_FETCH_FAILED, message: e.message })
  }
}

function* getStateDetail(action) {
  try {
    const stateDetail = yield call(Api.getStateDetail, action.payload.id)
    const stateDetailWithId = { ...stateDetail, id: action.payload.id }
    yield put({ type: STATEDETAIL_FETCH_SUCCEEDED, payload: stateDetailWithId })
  } catch (e) {
    yield put({ type: STATEDETAIL_FETCH_FAILED, message: e.message })
  }
}

function* getRegionDetail(action) {
  try {
    const regionDetail = yield call(Api.getRegionDetail, action.payload.id)
    const regionDetailWithId = { ...regionDetail, id: action.payload.id }
    yield put({ type: REGIONDETAIL_FETCH_SUCCEEDED, payload: regionDetailWithId })
  } catch (e) {
    yield put({ type: REGIONDETAIL_FETCH_FAILED, message: e.message })
  }
}

function* locationsSaga() {
  yield takeEvery(REGIONS_FETCH_REQUESTED, getRegions)
  yield takeEvery(STATES_FETCH_REQUESTED, getStates)
  yield takeEvery(STATEDETAIL_FETCH_REQUESTED, getStateDetail)
  yield takeEvery(REGIONDETAIL_FETCH_REQUESTED, getRegionDetail)
  yield takeEvery(PROVINCES_FETCH_REQUESTED, getProvinces)
}

export default locationsSaga
