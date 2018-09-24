import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../../api/users';
import ApiOffice from '../../../../api/offices';
import {
    PROMOTE_TO_MERCHANT_FAILED, PROMOTE_TO_MERCHANT_REQUESTED,
    PROMOTE_TO_MERCHANT_SUCCEEDED, PROMOTE_TO_OPERATOR_FAILED, PROMOTE_TO_OPERATOR_REQUESTED,
    PROMOTE_TO_OPERATOR_SUCCEEDED,
    USERS_FETCH_NEW_FAILED, USERS_FETCH_NEW_REQUESTED,
    USERS_FETCH_NEW_SUCCEEDED
} from "../../../../constants/users";
import {OFFICES_FETCH_FAILED, OFFICES_FETCH_REQUESTED, OFFICES_FETCH_SUCCEEDED} from "../../../../constants/offices";

function* fetchNewUsers() {
    try {
        const users = yield call(Api.fetchNewUsers);
        yield put({type: USERS_FETCH_NEW_SUCCEEDED, payload: users});
    } catch (e) {
        yield put({type: USERS_FETCH_NEW_FAILED, message: e.message});
    }
}

function* fetchOffices() {
    try {
        const offices = yield call(ApiOffice.fetchOffices);
        yield put({type: OFFICES_FETCH_SUCCEEDED, payload: offices});
    } catch (e) {
        yield put({type: OFFICES_FETCH_FAILED, message: e.message});
    }
}

function* promoteToMerchant(action) {
    try {
        yield call(Api.promoteToMerchant(action.payload.id));
        yield put({type: PROMOTE_TO_MERCHANT_SUCCEEDED});
    } catch (e) {
        yield put({type: PROMOTE_TO_MERCHANT_FAILED, message: e.message});
    }
}

function* promoteToOperator(action) {
    try {
        yield call(Api.promoteToOperator(action.payload.id));
        yield put({type: PROMOTE_TO_OPERATOR_SUCCEEDED});
    } catch (e) {
        yield put({type: PROMOTE_TO_OPERATOR_FAILED, message: e.message});
    }
}

function* usersSaga() {
    yield takeEvery(USERS_FETCH_NEW_REQUESTED, fetchNewUsers);
    yield takeEvery(OFFICES_FETCH_REQUESTED, fetchOffices);
    yield takeEvery(PROMOTE_TO_OPERATOR_REQUESTED, promoteToOperator);
    yield takeEvery(PROMOTE_TO_MERCHANT_REQUESTED, promoteToMerchant);
}

export default usersSaga;