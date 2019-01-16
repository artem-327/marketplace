import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../api/companies';
import {
    COMPANIES_FETCH_FAILED, COMPANIES_FETCH_REQUESTED,
    COMPANIES_FETCH_SUCCEEDED, COMPANY_CREATE_FAILED, COMPANY_CREATE_REQUESTED, COMPANY_CREATE_SUCCEEDED,
    COMPANY_EDIT_FAILED,
    COMPANY_EDIT_REQUESTED, COMPANY_EDIT_SUCCEEDED,
    COMPANY_FETCH_FAILED,
    COMPANY_FETCH_REQUESTED,
    COMPANY_FETCH_SUCCEEDED, COMPANY_REMOVE_REQUESTED, COMPANY_REMOVE_SUCCEEDED
} from "../constants/companies";


function* getCompanies(action) {
    try {
        const companies = yield call(Api.getCompanies, action.payload.search);
        yield put({type: COMPANIES_FETCH_SUCCEEDED, payload: companies});
    } catch (e) {
        yield put({type: COMPANIES_FETCH_FAILED, message: e.message});
    }
}

function* getCompany(action) {
    try {
        const company = yield call(Api.getCompany, action.payload.id);
        yield put({type: COMPANY_FETCH_SUCCEEDED, payload: company});
        action.resolve();
    } catch (e) {
        yield put({type: COMPANY_FETCH_FAILED, message: e.message});
    }
}

function* postNewCompany(action) {
    try {
        yield call(Api.postNewCompany, action.payload.name);
        yield put({type: COMPANY_CREATE_SUCCEEDED});
        yield call(action.payload.onSuccess);
        yield put({type: COMPANIES_FETCH_REQUESTED});
    } catch (e) {
        yield put({type: COMPANY_CREATE_FAILED, message: e.message});
    }
}

function* putCompanyEdit(action) {
    try {
        yield call(Api.putCompanyEdit, action.payload.company);
        yield put({type: COMPANY_EDIT_SUCCEEDED});
        yield put({type: COMPANY_FETCH_REQUESTED, payload: action.payload.company});
    } catch (e) {
        yield put({type: COMPANY_EDIT_FAILED, message: e.message});
    }
}

function* deleteCompany(action) {
    try {
        yield call(Api.deleteCompany, action.payload.id);
        yield put({type: COMPANY_REMOVE_SUCCEEDED});
        yield put({type: COMPANIES_FETCH_REQUESTED});
    } catch (e) {
        yield put({type: COMPANY_EDIT_FAILED, message: e.message});
    }
}

function* companiesSaga() {
    yield takeEvery(COMPANIES_FETCH_REQUESTED, getCompanies);
    yield takeEvery(COMPANY_FETCH_REQUESTED, getCompany);
    yield takeEvery(COMPANY_CREATE_REQUESTED, postNewCompany);
    yield takeEvery(COMPANY_EDIT_REQUESTED, putCompanyEdit);
    yield takeEvery(COMPANY_REMOVE_REQUESTED, deleteCompany);
}



export default companiesSaga;