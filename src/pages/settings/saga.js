import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import * as AT from './action-types';
import api from "./api";

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

function* getBranchesDataWorker() {
  try {
    const branches = yield call(api.getBranches);
    console.log('pass to reducer:', branches)
    yield put({ type: AT.GET_BRANCHES_DATA_SUCCESS, payload: branches });
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getCreditCardsDataWorker() {
  try {
    const creditCardsData = yield call(api.getCreditCardsData)
    yield put({ type: AT.GET_CREDIT_CARDS_DATA_SUCCESS, payload: creditCardsData });
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getBankAccountsDataWorker() {
  try {
    const bankAccountsData = yield call(api.getBankAccountsData);
    console.log(bankAccountsData)
    yield put({ type: AT.GET_BANK_ACCOUNTS_DATA_SUCCESS, payload: bankAccountsData });
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* postNewWarehouseWorker({ payload }) {
  try {
    const currentUser = yield call(api.getCurrentUser); 
    const dataBody = {
      address: {
        city: payload.address,
        province: 44,
        streetAddress: payload.city,
        zip: payload.zipCode
      },
      company: currentUser.company.id,
      contact: {
        email: payload.email,
        name: payload.contactName,
        phone: payload.phone
      },
      warehouse: true,
      warehouseName: payload.warehouseName
    };     
    yield call(api.postNewWarehouse, dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* postNewCreditCardWorker({ payload }) {
  try {
    const dataBody = {
      cardNumber: payload.cardNumber,
      cvc: Number(payload.cvc),
      expirationMonth: Number(payload.expirationMonth),
      expirationYear: Number(payload.expirationYear)
    }
    console.log(dataBody)
    const bankAccountsData = yield call(api.postNewCreditCard, dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* postNewBankAccountWorker({ payload }) {
  try {    
    const dataBody = {
      accountHolderName: payload.accountHolderName,
      accountHolderType: payload.accountHolderType,
      accountNumber: payload.accountNumber,
      country: payload.country,
      currency: payload.currency,
      routingNumber: payload.routingNumber
    }
    const bankAccountsData = yield call(api.postNewBankAccount, dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* putWarehouseWorker({ payload, id }) { 
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

function* deleteCreditCardWorker({ payload }) {
  try {
    yield call(api.deleteWarehouse, payload);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* deleteBankAccountWorker({ payload }) {
  try {
    yield call(api.deleteWarehouse, payload);
  } catch (e) {
    yield console.log("error:", e);
  }
}

export default function* settingsSaga() {
  yield takeEvery(AT.SUBMIT_EDIT_POPUP_HANDLER, putWarehouseWorker);
  yield takeEvery(AT.GET_USERS_DATA, getUsersDataWorker);
  yield takeEvery(AT.GET_WAREHOUSES_DATA, getWarehousesDataWorker);
  yield takeEvery(AT.GET_BRANCHES_DATA, getBranchesDataWorker);
  yield takeEvery(AT.GET_CREDIT_CARDS_DATA, getCreditCardsDataWorker);
  yield takeEvery(AT.GET_BANK_ACCOUNTS_DATA, getBankAccountsDataWorker);
  yield takeEvery(AT.POST_NEW_WAREHOUSE_REQUEST, postNewWarehouseWorker);
  yield takeEvery(AT.POST_NEW_CREDIT_CARD_REQUEST, postNewCreditCardWorker);
  yield takeEvery(AT.POST_NEW_BANK_ACCOUNT_REQUEST, postNewBankAccountWorker);  
  yield takeEvery(AT.DELETE_WAREHOUSE, deleteWarehouseWorker);
  yield takeEvery(AT.DELETE_CREDIT_CARD, deleteCreditCardWorker);
  yield takeEvery(AT.DELETE_BANK_ACCOUNT, deleteBankAccountWorker);
}
