import { call, put, takeEvery } from "redux-saga/effects"

import * as AT from './action-types'
import api from "./api"


function* getUnitsOfMeasureDataWorker() {
    try {
        console.log('!!!!!!!!! getUnitsOfMeasureDataWorker start')
        const unitsOfMeasure = yield call(api.getUnitsOfMeasure)
        console.log('!!!!!!!!! getUnitsOfMeasureDataWorker - unitsOfMeasure', unitsOfMeasure)
        yield put({ type: AT.ADMIN_GET_UNITS_OF_MEASURE_DATA_SUCCESS, payload: unitsOfMeasure })
        console.log('!!!!!!!!! getUnitsOfMeasureDataWorker - unitsOfMeasure', unitsOfMeasure)
    } catch(e) {
        yield console.log("error:", e)
    }
}


export default function* adminSaga() {


    yield takeEvery(AT.ADMIN_GET_UNITS_OF_MEASURE_DATA, getUnitsOfMeasureDataWorker)

}