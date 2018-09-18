import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../../api/offices';
import {OFFICE_FETCH_FAILED, OFFICE_FETCH_REQUESTED, OFFICE_FETCH_SUCCEEDED} from "../../../../constants/offices";

function* fetchOffice(action) {
    try {
        const office = yield call(Api.fetchOffice, action.payload.id);
        yield put({type: OFFICE_FETCH_SUCCEEDED, payload: office});
    } catch (e) {
        yield put({type: OFFICE_FETCH_FAILED, message: e.message});
    }
}

function* officesSaga() {
    yield takeEvery(OFFICE_FETCH_REQUESTED, fetchOffice);
}



export default officesSaga;