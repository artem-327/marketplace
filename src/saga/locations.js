import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/locations';
import {
    REGIONS_FETCH_REQUESTED, REGIONS_FETCH_FAILED, REGIONS_FETCH_SUCCEEDED,
    STATES_FETCH_REQUESTED, STATES_FETCH_FAILED, STATES_FETCH_SUCCEEDED,
    STATEDETAIL_FETCH_REQUESTED, STATEDETAIL_FETCH_FAILED, STATEDETAIL_FETCH_SUCCEEDED,
    REGIONDETAIL_FETCH_REQUESTED, REGIONDETAIL_FETCH_FAILED, REGIONDETAIL_FETCH_SUCCEEDED,
    PROVINCES_FETCH_REQUESTED, PROVINCES_FETCH_FAILED, PROVINCES_FETCH_SUCCEEDED
} from "../constants/locations";


function* fetchRegions(action) {
    try {
        const regions = yield call(Api.fetchRegions, action.payload.search);
        yield put({type: REGIONS_FETCH_SUCCEEDED, payload: regions});
    } catch (e) {
        yield put({type: REGIONS_FETCH_FAILED, message: e.message});
    }
}

function* fetchStates(action) {
    try {
        const states = yield call(Api.fetchStates, action.payload.search);
        yield put({type: STATES_FETCH_SUCCEEDED, payload: states});
    } catch (e) {
        yield put({type: STATES_FETCH_FAILED, message: e.message});
    }
}

function* fetchProvinces(action) {
    try {
        const provinces = yield call(Api.fetchProvinces, action.payload.search);
        yield put({type: PROVINCES_FETCH_SUCCEEDED, payload: provinces});
    } catch (e) {
        yield put({type: PROVINCES_FETCH_FAILED, message: e.message});
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
    yield takeEvery(PROVINCES_FETCH_REQUESTED, fetchProvinces);
}

export default locationsSaga;
