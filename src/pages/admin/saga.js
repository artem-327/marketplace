import { call, put, takeEvery } from "redux-saga/effects"
import { config } from './config'

import api from '~/api'

function* getDataWorker(config) {
    try {
        const data = yield call(() => api.get(config.apiCall).then(response => response.data));
        yield put({ type: config.typeSuccess, payload: data })
    } catch(e) {
        yield console.log("error:", e)
    }
}

export default function* adminSaga() {
    for (let groupName in config) {
        if (typeof config[groupName].api !== 'undefined') {
            for (let item in config[groupName].api) {
                switch (item) {
                    case 'get':
                        yield takeEvery(config[groupName].api[item].typeRequest, getDataWorker, config[groupName].api[item])
                    break;

                    case 'put':

                    break;
                }
            }
        }
    }
}