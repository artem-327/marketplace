import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../../api/companiesOffices';
import {
    COMPANIES_FETCH_FAILED, COMPANIES_FETCH_REQUESTED,
    COMPANIES_FETCH_SUCCEEDED
} from "../../../../constants/companiesOffices";

function* fetchCompanies() {
    try {
        const companies = yield call(Api.fetchCompany);
        yield put({type: COMPANIES_FETCH_SUCCEEDED, payload: companies});
    } catch (e) {
        yield put({type: COMPANIES_FETCH_FAILED, message: e.message});
    }
}

function* companiesOfficesSaga() {
    yield takeEvery(COMPANIES_FETCH_REQUESTED, fetchCompanies);
}

export default companiesOfficesSaga;