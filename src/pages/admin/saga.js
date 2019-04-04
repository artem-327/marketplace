import { call, put, takeEvery } from "redux-saga/effects"
import { config } from './config'
import { getDataRequest, closeAddPopup, closeConfirmPopup } from "./actions"
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
        yield call(() => { api.post(config.post.apiCall, payload) });
        yield put(closeAddPopup({ payload: null }))
        //yield put(getDataRequest(config))
    } catch(e) {
        yield console.log("error:", e)
        yield put(closeAddPopup({ payload: null }))
    }
}

function* deleteDataWorker(config, { payload }) {
    try {
        yield call(() => { api.delete(config.delete.apiCall + payload) });
        yield put(closeConfirmPopup({ payload: null }))
        //yield put(getDataRequest(config))
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

                    case 'delete':
                        yield takeEvery(config[groupName].api.delete.typeRequest, deleteDataWorker, config[groupName].api)
                        break;


                }
            }
        }
    }
}