import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../../../api/users';
import {
    OPERATORS_FETCH_FAILED, OPERATORS_FETCH_REQUESTED,
    OPERATORS_FETCH_SUCCEEDED
} from "../../../../constants/users";

function* fetchOperators() {
    try {
        const operators = yield call(Api.fetchOperators);
        yield put({type: OPERATORS_FETCH_SUCCEEDED, payload: operators});
    } catch (e) {
        yield put({type: OPERATORS_FETCH_FAILED, message: e.message});
    }
}

function* operatorsSaga() {
    yield takeEvery(OPERATORS_FETCH_REQUESTED, fetchOperators);
}



export default operatorsSaga;