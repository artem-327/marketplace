import { call, put, takeEvery } from "redux-saga/effects"
import { config } from './config'

import * as AT from './action-types'
import api from "./api"


function* getUnitsOfMeasureDataWorker(config) {
    console.log('XXXXXXXXXX adminSaga - cosi ', config);
    try {
        const unitsOfMeasure = yield call(api.getUnitsOfMeasure)
        yield put({ type: AT.ADMIN_GET_UNITS_OF_MEASURE_DATA_SUCCESS, payload: unitsOfMeasure })
    } catch(e) {
        yield console.log("error:", e)
    }
}


export default function* adminSaga() {
    console.log('XXXXXXXXXX adminSaga - config ', config);

    yield takeEvery(AT.ADMIN_GET_UNITS_OF_MEASURE_DATA, getUnitsOfMeasureDataWorker, config['Manufacturers'])

}