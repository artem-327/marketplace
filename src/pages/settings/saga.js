import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import * as AT from './action-types';
import api from "./api";
import { getUsersDataRequestSuccess, getWarehousesDataRequestSuccess } from './actions';

function* saveNewWarehouseWorker({ dataBody }) {
  try {
    const currentUser = yield call(api.getCurrentUser);  
    const newArr = yield { ...dataBody, company: currentUser.company.id };
    yield call(api.createWarehouse, newArr);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* editWarehouseWorker({ dataBody, branchId }) {
  try {    
    yield call(api.putWarehouse, branchId, dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* deleteWarehouseWorker({ warehouseId }) {
  try {
    yield call(api.deleteWarehouse, warehouseId);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getUsersDataWorker() {
  try {
    const users = yield call(api.getUsers);
    yield put(getUsersDataRequestSuccess(users));
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getWarehousesDataWorker() {
  try {
    const warehouses = yield call(api.getWarehouses);
    console.log(warehouses)
    yield put(getWarehousesDataRequestSuccess(warehouses));
  } catch (e) {
    yield console.log("error:", e);
  }
}

export default function* settingsSaga() {
  yield takeEvery(AT.ADD_NEW_WAREHOUSE_REQUEST, saveNewWarehouseWorker);
  yield takeEvery(AT.DELETE_WAREHOUSE, deleteWarehouseWorker);
  yield takeEvery(AT.SUBMIT_EDIT_POPUP, editWarehouseWorker);
  yield takeEvery(AT.GET_USERS_DATA, getUsersDataWorker);
  yield takeEvery(AT.GET_WAREHOUSES_DATA, getWarehousesDataWorker);
}
