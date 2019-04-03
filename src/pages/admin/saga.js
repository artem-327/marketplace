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


function* postDataWorker(config, { payload }) {
    try {
        console.log('!!!!!! API CALL - config.apiCall - ', config.apiCall);
        console.log('!!!!!! API CALL - payload - ', payload);
        yield call(() => {

            console.log('!!!!!! API CALL - 2 config.apiCall - ', config.apiCall);
            console.log('!!!!!! API CALL - 2 payload - ', payload);

            api.post(config.apiCall, payload)
            }
        );
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
                        yield takeEvery(config[groupName].api.get.typeRequest, getDataWorker, config[groupName].api.get)
                    break;

                    case 'post':
                        yield takeEvery(config[groupName].api.post.typeRequest, postDataWorker, config[groupName].api.post)
                    break;
                }
            }
        }
    }
}