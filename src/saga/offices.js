import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/offices';
import {
    OFFICE_CREATE_FAILED, OFFICE_CREATE_REQUESTED,
    OFFICE_CREATE_SUCCEEDED, OFFICE_EDIT_FAILED, OFFICE_EDIT_REQUESTED, OFFICE_EDIT_SUCCEEDED,
    OFFICE_FETCH_FAILED, OFFICE_FETCH_REQUESTED, OFFICE_FETCH_SUCCEEDED, OFFICE_REMOVE_FAILED, OFFICE_REMOVE_REQUESTED,
    OFFICE_REMOVE_SUCCEEDED
} from "../constants/offices";
import {COMPANY_FETCH_REQUESTED} from "../constants/companies";

function* fetchOffice(action) {
    try {
        const office = yield call(Api.fetchOffice, action.payload.id);
        yield put({type: OFFICE_FETCH_SUCCEEDED, payload: office});
        yield call(action.payload.onSuccess);
    } catch (e) {
        yield put({type: OFFICE_FETCH_FAILED, message: e.message});
    }
}

function* createOffice(action) {
    try {
        yield call(Api.createOffice, action.payload.office);
        yield put({type: OFFICE_CREATE_SUCCEEDED});
        yield call(action.payload.onSuccess);
        yield put({type: COMPANY_FETCH_REQUESTED, payload: action.payload.office.company});
    } catch (e) {
        yield put({type: OFFICE_CREATE_FAILED, message: e.message});
    }
}

function* removeOffice(action) {
    try {
        yield call(Api.removeOffice, action.payload.id);
        yield put({type: OFFICE_REMOVE_SUCCEEDED});
        yield put({type: COMPANY_FETCH_REQUESTED, payload: action.payload.company});
    } catch (e) {
        yield put({type: OFFICE_REMOVE_FAILED, message: e.message});
    }
}

function* editOffice(action) {
    try {
        yield call(Api.editOffice, action.payload.office);
        yield put({type: OFFICE_EDIT_SUCCEEDED});
        yield put({type: OFFICE_FETCH_REQUESTED, payload: action.payload.office});
    } catch (e) {
        yield put({type: OFFICE_EDIT_FAILED, message: e.message});
    }
}

function* officesSaga() {
    yield takeEvery(OFFICE_FETCH_REQUESTED, fetchOffice);
    yield takeEvery(OFFICE_CREATE_REQUESTED, createOffice);
    yield takeEvery(OFFICE_REMOVE_REQUESTED, removeOffice);
    yield takeEvery(OFFICE_EDIT_REQUESTED, editOffice);
}



export default officesSaga;