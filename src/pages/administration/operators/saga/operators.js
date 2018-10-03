import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../../api/users';
import {
    OPERATORS_FETCH_FAILED, OPERATORS_FETCH_REQUESTED,
    OPERATORS_FETCH_SUCCEEDED,
    OPERATORS_REMOVE_FAILED, OPERATORS_REMOVE_REQUESTED,
    OPERATORS_REMOVE_SUCCEEDED
} from "../../../../constants/users";

function* fetchOperators() {
    try {
        const operators = yield call(Api.fetchOperators);
        yield put({type: OPERATORS_FETCH_SUCCEEDED, payload: operators});
    } catch (e) {
        yield put({type: OPERATORS_FETCH_FAILED, message: e.message});
    }
}

function* removeOperator(action) {
    try {
        yield call(Api.removeOperator, action.payload.id);
        yield put({type: OPERATORS_REMOVE_SUCCEEDED});
        yield put({type: OPERATORS_FETCH_REQUESTED});
    } catch (e) {
        yield put({type: OPERATORS_REMOVE_FAILED, message: e.message});
    }
}

function* operatorsSaga() {
    yield takeEvery(OPERATORS_FETCH_REQUESTED, fetchOperators);
    yield takeEvery(OPERATORS_REMOVE_REQUESTED, removeOperator);
}

export default operatorsSaga;