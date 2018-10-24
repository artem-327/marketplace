import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/locations';
import {
    REGIONS_FETCH_REQUESTED,
    REGIONS_FETCH_FAILED,
    REGIONS_FETCH_SUCCEEDED
} from "../constants/locations";


function* fetchRegions() {
    try {
        const regions = yield call(Api.fetchRegions);
        yield put({type: REGIONS_FETCH_SUCCEEDED, payload: regions});
    } catch (e) {
        yield put({type: REGIONS_FETCH_FAILED, message: e.message});
    }
}

function* locationsSaga() {
    yield takeEvery(REGIONS_FETCH_REQUESTED, fetchRegions);
}

export default locationsSaga;