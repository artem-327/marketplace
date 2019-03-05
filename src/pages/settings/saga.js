import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import * as AT from './action-types';
import api from "./api";

function* saveNewWarehouseWorker({ payload }) {
  try {
    const currentUser = yield call(api.getCurrentUser); 
    const dataBody = {
      address: {
        city: payload.address,
        province: 44,
        streetAddress: payload.city,
        zip: payload.zipCode
      },
      contact: {
        email: payload.email,
        name: payload.contactName,
        phone: payload.phone
      },
      warehouse: true,
      warehouseName: payload.warehouseName
    };     
    const newArr = { ...dataBody, company: currentUser.company.id };
    yield call(api.createWarehouse, newArr);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* editWarehouseWorker({ payload, id }) { 
  try {
    const dataBody = {
      address: {
        city: payload.address,
        streetAddress: payload.city,
        province: 44,
        zip: "35"
      },
      company: 3,
      contact: {
        email: payload.email,
        name: payload.contactName,
        phone: payload.phone
      },
      warehouse: true,
      warehouseName: payload.warehouseName
    }
    yield call(api.putWarehouse, id, dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* deleteWarehouseWorker({ payload }) {
  try {
    yield call(api.deleteWarehouse, payload);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getUsersDataWorker() {
  try {
    const users = yield call(api.getUsers);
    yield put({ type: AT.GET_USERS_DATA_SUCCESS, payload: users});
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getWarehousesDataWorker() {
  try {
    const warehouses = yield call(api.getWarehouses);
    yield put({ type: AT.GET_WAREHOUSES_DATA_SUCCESS, payload: warehouses });
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
