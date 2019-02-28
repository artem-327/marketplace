import axios from 'axios';
import { call, put, takeEvery } from "redux-saga/effects";

import { SUBMIT_EDIT_POPUP, DELETE_WAREHOUSE, ADD_NEW_WAREHOUSE_REQUEST } from "../constants/settings";
import branches from "../api/branches";
import api from "../api/users";

function* saveNewWarehouseWorker({ warehouseData }) {
	try {
		const currentUserRequest = yield axios.get("/prodex/api/users/me");
		const currentUser = yield currentUserRequest.data;
		const dataBody = {
			address: {
				city: warehouseData.address,
				province: 44,
				streetAddress: warehouseData.city,				
				zip: warehouseData.zipCode
			},
			company: currentUser.company.id,
      contact: {
				email: warehouseData.email,
				name: warehouseData.contactName,
				phone: warehouseData.phone
			},
			warehouse: true,
			warehouseName: warehouseData.warehouseName
		};
		const putWarehouse = yield axios.post("/prodex/api/branches/", dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* editWarehouseWorker({ warehouseData, branchId }) {
  try {	
    const dataBody = {
			address: {
				city: warehouseData.address,
				streetAddress: warehouseData.city,
				province: 44,
				zip: "0"
			},
			company: 1,
      contact: {
				email: warehouseData.email,
				name: warehouseData.contactName,
				phone: warehouseData.phone
			},
			warehouse: true,
			warehouseName: warehouseData.warehouseName
		};	
		const putWarehouse = yield branches.putWarehouse(branchId, dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* deleteWarehouseWorker({ warehouseId }) {
	try {
		yield branches.deleteWarehouse(warehouseId);
	} catch (e) {
		yield console.log("error:", e);
	}
}

export default function* settingsSaga() {
	yield takeEvery(ADD_NEW_WAREHOUSE_REQUEST, saveNewWarehouseWorker);
	yield takeEvery(DELETE_WAREHOUSE, deleteWarehouseWorker);
	yield takeEvery(SUBMIT_EDIT_POPUP, editWarehouseWorker);
}
