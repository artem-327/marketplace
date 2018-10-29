import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/locations';
import {
    REGIONS_FETCH_REQUESTED, REGIONS_FETCH_FAILED, REGIONS_FETCH_SUCCEEDED,
    STATES_FETCH_REQUESTED, STATES_FETCH_FAILED, STATES_FETCH_SUCCEEDED,
    STATEDETAIL_FETCH_REQUESTED, STATEDETAIL_FETCH_FAILED, STATEDETAIL_FETCH_SUCCEEDED,
    REGIONDETAIL_FETCH_REQUESTED, REGIONDETAIL_FETCH_FAILED, REGIONDETAIL_FETCH_SUCCEEDED,
} from "../constants/locations";


function* fetchRegions() {
    try {
        const regions = yield call(Api.fetchRegions);
        yield put({type: REGIONS_FETCH_SUCCEEDED, payload: regions});
    } catch (e) {
        yield put({type: REGIONS_FETCH_FAILED, message: e.message});
    }
}

function* fetchStates() {
    try {
        const states = yield call(Api.fetchStates);
        yield put({type: STATES_FETCH_SUCCEEDED, payload: states});
    } catch (e) {
        yield put({type: STATES_FETCH_FAILED, message: e.message});
    }
}

function* fetchStateDetail(action) {
    try {
        const stateDetail = yield call(Api.fetchStateDetail, action.payload.id);
        const stateDetailWithId = {...stateDetail, id: action.payload.id};
        yield put({type: STATEDETAIL_FETCH_SUCCEEDED, payload: stateDetailWithId});
    } catch (e) {
        yield put({type: STATEDETAIL_FETCH_FAILED, message: e.message});
    }
}

function* fetchRegionDetail(action) {
    try {
        const regionDetail = yield call(Api.fetchRegionDetail, action.payload.id);
        const regionDetailWithId = {...regionDetail, id: action.payload.id};
        yield put({type: REGIONDETAIL_FETCH_SUCCEEDED, payload: regionDetailWithId});
    } catch (e) {
        yield put({type: REGIONDETAIL_FETCH_FAILED, message: e.message});
    }
}

function* locationsSaga() {
    yield takeEvery(REGIONS_FETCH_REQUESTED, fetchRegions);
    yield takeEvery(STATES_FETCH_REQUESTED, fetchStates);
    yield takeEvery(STATEDETAIL_FETCH_REQUESTED, fetchStateDetail);
    yield takeEvery(REGIONDETAIL_FETCH_REQUESTED, fetchRegionDetail);
}

export default locationsSaga;
