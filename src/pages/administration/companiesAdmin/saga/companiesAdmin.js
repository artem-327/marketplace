import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../../api/companies';
import {
    COMPANIES_FETCH_FAILED, COMPANIES_FETCH_REQUESTED,
    COMPANIES_FETCH_SUCCEEDED, COMPANY_CREATE_FAILED, COMPANY_CREATE_REQUESTED, COMPANY_CREATE_SUCCEEDED,
    COMPANY_FETCH_FAILED,
    COMPANY_FETCH_REQUESTED,
    COMPANY_FETCH_SUCCEEDED
} from "../../../../constants/companies";

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
        const company = yield call(Api.fetchCompany, action.id);
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
        yield call(Api.createCompany, action.payload.name);
        yield put({type: COMPANY_CREATE_SUCCEEDED});
        yield call(action.payload.onSuccess);
        yield put({type: COMPANIES_FETCH_REQUESTED});
    } catch (e) {
        yield put({type: COMPANY_CREATE_FAILED, message: e.message});
    }
}

function* companiesOfficesSaga() {
    yield takeEvery(COMPANIES_FETCH_REQUESTED, fetchCompanies);
    yield takeEvery(COMPANY_FETCH_REQUESTED, fetchCompany);
    yield takeEvery(COMPANY_CREATE_REQUESTED, createCompany);
}

export default companiesOfficesSaga;