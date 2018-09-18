import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../../api/companies';
import ApiOffices from '../../../../api/offices';
import {
    COMPANIES_FETCH_FAILED, COMPANIES_FETCH_REQUESTED,
    COMPANIES_FETCH_SUCCEEDED, COMPANY_CREATE_FAILED, COMPANY_CREATE_REQUESTED, COMPANY_CREATE_SUCCEEDED,
    COMPANY_EDIT_FAILED,
    COMPANY_EDIT_REQUESTED, COMPANY_EDIT_SUCCEEDED,
    COMPANY_FETCH_FAILED,
    COMPANY_FETCH_REQUESTED,
    COMPANY_FETCH_SUCCEEDED
} from "../../../../constants/companies";
import {
    OFFICE_CREATE_FAILED, OFFICE_CREATE_REQUESTED, OFFICE_CREATE_SUCCEEDED, OFFICE_REMOVE_FAILED,
    OFFICE_REMOVE_REQUESTED, OFFICE_REMOVE_SUCCEEDED
} from "../../../../constants/offices";

function* fetchCompanies() {
    try {
        const companies = yield call(Api.fetchCompanies);
        yield put({type: COMPANIES_FETCH_SUCCEEDED, payload: companies});
    } catch (e) {
        yield put({type: COMPANIES_FETCH_FAILED, message: e.message});
    }
}

function* fetchCompany(action) {
    try {
        const company = yield call(Api.fetchCompany, action.payload.id);
        yield put({type: COMPANY_FETCH_SUCCEEDED, payload: company});
    } catch (e) {
        yield put({type: COMPANY_FETCH_FAILED, message: e.message});
    }
}

function* createCompany(action) {
    try {
        yield call(Api.createCompany, action.payload.name);
        yield put({type: COMPANY_CREATE_SUCCEEDED});
        yield call(action.payload.onSuccess);
        yield put({type: COMPANIES_FETCH_REQUESTED});
    } catch (e) {
        yield put({type: COMPANY_CREATE_FAILED, message: e.message});
    }
}

function* editCompany(action) {
    try {
        yield call(Api.editCompany, action.payload.company);
        yield put({type: COMPANY_EDIT_SUCCEEDED});
        yield put({type: COMPANY_FETCH_REQUESTED, payload: action.payload.company.id});
    } catch (e) {
        yield put({type: COMPANY_EDIT_FAILED, message: e.message});
    }
}

function* createOffice(action) {
    try {
        yield call(ApiOffices.createOffice, action.payload.office);
        yield put({type: OFFICE_CREATE_SUCCEEDED});
        yield call(action.payload.onSuccess);
        yield put({type: COMPANY_FETCH_REQUESTED, payload: action.payload.office.company});
    } catch (e) {
        yield put({type: OFFICE_CREATE_FAILED, message: e.message});
    }
}

function* removeOffice(action) {
    try {
        yield call(ApiOffices.removeOffice, action.payload);
        yield put({type: OFFICE_REMOVE_SUCCEEDED});
        yield put({type: COMPANY_FETCH_REQUESTED, payload: action.payload.company});
    } catch (e) {
        yield put({type: OFFICE_REMOVE_FAILED, message: e.message});
    }
}

function* companiesSaga() {
    yield takeEvery(COMPANIES_FETCH_REQUESTED, fetchCompanies);
    yield takeEvery(COMPANY_FETCH_REQUESTED, fetchCompany);
    yield takeEvery(COMPANY_CREATE_REQUESTED, createCompany);
    yield takeEvery(COMPANY_EDIT_REQUESTED, editCompany);
    yield takeEvery(OFFICE_CREATE_REQUESTED, createOffice);
    yield takeEvery(OFFICE_REMOVE_REQUESTED, removeOffice);
}



export default companiesSaga;