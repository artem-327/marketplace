import { call, put, takeEvery } from "redux-saga/effects"
import { config } from './config'
import { getDataRequest, closeAddPopup, closeConfirmPopup, closeEditPopup } from "./actions"
import api from '~/api'

function* getDataWorker(config) {
    try {
        const data = yield call(() => api.get(config.get.apiCall).then(response => response.data));
        yield put({ type: config.get.typeSuccess, payload: data })
    } catch(e) {
        yield console.log("error:", e)
    }
}

function* postDataWorker(config, { payload }) {
    try {
        const data = yield call(() => api.post(config.post.apiCall, payload).then(response => response.data));
        yield put(closeAddPopup({ payload: null }))
        yield put(getDataRequest(config))
    } catch(e) {
        yield console.log("error:", e)
        yield put(closeAddPopup({ payload: null }))
    }
}

function* putDataWorker(config, { payload }) {
    try {
        const data = yield call(() => api.put(config.put.apiCall + payload.id, payload.values).then(response => response.data));
        yield put(closeEditPopup({ payload: null }))
        yield put(getDataRequest(config))
    } catch(e) {
        yield console.log("error:", e)
        yield put(closeEditPopup({ payload: null }))
    }
}

function* deleteDataWorker(config, { payload }) {
    try {
        yield call(() => api.delete(config.delete.apiCall + payload).then(response => response.data));
        yield put(closeConfirmPopup({ payload: null }))
        yield put(getDataRequest(config))
    } catch(e) {
        yield console.log("error:", e)
        yield put(closeConfirmPopup({ payload: null }))
    }
}

export default function* adminSaga() {
    for (let groupName in config) {
        if (typeof config[groupName].api !== 'undefined') {
            for (let item in config[groupName].api) {
                switch (item) {
                    case 'get':
                        yield takeEvery(config[groupName].api.get.typeRequest, getDataWorker, config[groupName].api)
                        break;

                    case 'post':
                        yield takeEvery(config[groupName].api.post.typeRequest, postDataWorker, config[groupName].api)
                        break;

                    case 'put':
                        yield takeEvery(config[groupName].api.put.typeRequest, putDataWorker, config[groupName].api)
                        break;

                    case 'delete':
                        yield takeEvery(config[groupName].api.delete.typeRequest, deleteDataWorker, config[groupName].api)
                        break;


                }
            }
        }
    }
}