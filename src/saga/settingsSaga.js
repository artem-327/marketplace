import { call, put, takeEvery } from "redux-saga/effects";
import { SUBMIT_EDIT_POPUP } from "../constants/settings";

import Api from "../api/branches"

function* submitEditPopupWorker({ warehouseData, branchId }) {
  try {
		const authToken = localStorage.getItem('jwtoken');
		console.log(warehouseData, 'inside')
		const address = warehouseData.address.split(',');
    const dataBody = {
			address: {
				city: address[1],
				streetAddress: address[0],
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
			warehouseName: 'warehouseData.contactName'
		};	
		const putWarehouse = yield Api.putWarehouse(branchId, dataBody)
    // const putWarehouse = yield fetch(`/api/branches/${branchId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
		// 		"Authorization": `Bearer ${authToken}`
    //   },
    //   body: JSON.stringify(dataBody)
    // });
		const answer = yield putWarehouse.json();
		console.log(putWarehouse, '32131')
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* submitEditPopupWatcher() {
  yield takeEvery(SUBMIT_EDIT_POPUP, submitEditPopupWorker);
}

export default submitEditPopupWatcher;
