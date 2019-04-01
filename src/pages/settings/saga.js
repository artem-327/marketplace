import { call, put, takeEvery, select } from "redux-saga/effects";

import {
  closeAddPopup,
  closeConfirmPopup,
  deleteUser,
  confirmationSuccess
} from "./actions";
import * as AT from "./action-types";
import api from "./api";

function* getUsersDataWorker() {
  try {
    const users = yield call(api.getUsers);
    yield put({ type: AT.GET_USERS_DATA_SUCCESS, payload: users });
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
    yield put({ type: AT.GET_BRANCHES_DATA_SUCCESS, payload: branches });
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getCreditCardsDataWorker() {
  try {
    const creditCardsData = yield call(api.getCreditCardsData);
    yield put({
      type: AT.GET_CREDIT_CARDS_DATA_SUCCESS,
      payload: creditCardsData
    });
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getBankAccountsDataWorker() {
  try {
    const bankAccountsData = yield call(api.getBankAccountsData);
    yield put({
      type: AT.GET_BANK_ACCOUNTS_DATA_SUCCESS,
      payload: bankAccountsData
    });
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getProductCatalogWorker() {
  try {
    // const productCatalog = yield call(api.getProductsCatalog)
    // yield put({ type: AT.GET_PRODUCTS_CATALOG_DATA_SUCCESS, payload: productCatalog })
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* getProductsWithRequiredParamWorker({ payload }) {
  try {
    const products = yield call(api.getProductsWithRequiredParamPar, payload);
    yield put({
      type: AT.GET_PRODUCTS_WITH_REQUIRED_PARAM_SUCCESS,
      payload: products
    });
  } catch (e) {}
}

function* postNewUserWorker({ payload }) {
  try {
    // const currentUser = yield call(api.getCurrentUser)
    const dataBody = {
      email: payload.email,
      firstname: payload.firstName,
      lastname: payload.lastName,
      middlename: payload.middleName
    };
    yield call(api.postNewUser, dataBody);
    yield put(closeAddPopup({ payload: null }));
  } catch (e) {
    yield console.log("error:", e);
    yield put(closeAddPopup({ payload: null }));
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
    };
    yield call(api.postNewCreditCard, dataBody);
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
    };
    yield call(api.postNewBankAccount, dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* postNewProductWorker({ payload }) {
  try {
    // const productData = {
    //   packaging: {
    //     packagingType: 0,
    //     size: 0,
    //     unit: 0
    //   },
    //   product: 0,
    //   productCode: "string",
    //   productName: "string",
    //   valid: true
    // }
    // yield call(api.postNewProduct, productData)
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* putWarehouseWorker({ payload, id }) {
  try {
    const dataBody = {
      accessorials: [0],
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
    };
    yield call(api.putWarehouse, id, dataBody);
  } catch (e) {
    yield console.log("error:", e);
  }
}

function* putUserWorker({ payload, id }) {
  try {
    const updateUser = {
      firstname: payload.firstName,
      lastname: payload.lastName,
      middlename: payload.middleName,
      email: payload.email
    };
    yield put({ type: AT.CLOSE_EDIT_POPUP, payload: null });
    yield call(api.putUser, id, updateUser);
  } catch (e) {
    console.log("error", e);
  }
}

function* deleteUserWorker({ payload }) {
  try {
    yield call(api.deleteUser, payload);
    yield put(closeConfirmPopup({ payload: null }));
  } catch (e) {
    yield console.log("error:", e);
    yield put(closeConfirmPopup({ payload: null }));
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

function* deleteConfirmPopup({}) {
  const {
    settings: { deleteRowByid, currentTab }
  } = yield select();
  try {
    switch (currentTab) {
      case "Users":
        yield call(api.deleteUser, deleteRowByid);
      case "Warehouses":
        yield call(api.deleteWarehouse, deleteRowByid);
      default:
        break;
    }
  } catch (e) {
    yield console.log("error:", e);
  } finally {
    yield put(confirmationSuccess());
  }
}

export default function* settingsSaga() {
  yield takeEvery(AT.SUBMIT_EDIT_POPUP_HANDLER, putWarehouseWorker);
  yield takeEvery(AT.GET_USERS_DATA, getUsersDataWorker);
  yield takeEvery(AT.GET_WAREHOUSES_DATA, getWarehousesDataWorker);
  yield takeEvery(AT.GET_BRANCHES_DATA, getBranchesDataWorker);
  yield takeEvery(AT.GET_CREDIT_CARDS_DATA, getCreditCardsDataWorker);
  yield takeEvery(AT.GET_BANK_ACCOUNTS_DATA, getBankAccountsDataWorker);
  yield takeEvery(AT.GET_PRODUCTS_CATALOG_DATA, getProductCatalogWorker);
  yield takeEvery(
    AT.GET_PRODUCTS_WITH_REQUIRED_PARAM,
    getProductsWithRequiredParamWorker
  );

  yield takeEvery(AT.POST_NEW_USER_REQUEST, postNewUserWorker);
  yield takeEvery(AT.POST_NEW_WAREHOUSE_REQUEST, postNewWarehouseWorker);
  yield takeEvery(AT.POST_NEW_CREDIT_CARD_REQUEST, postNewCreditCardWorker);
  yield takeEvery(AT.POST_NEW_BANK_ACCOUNT_REQUEST, postNewBankAccountWorker);
  yield takeEvery(AT.POST_NEW_PRODUCT_REQUEST, postNewProductWorker);

  yield takeEvery(AT.HANDLE_SUBMIT_USER_EDIT_POPUP, putUserWorker);

  yield takeEvery(AT.DELETE_USER, deleteUserWorker);
  yield takeEvery(AT.DELETE_WAREHOUSE, deleteWarehouseWorker);
  yield takeEvery(AT.DELETE_CREDIT_CARD, deleteCreditCardWorker);
  yield takeEvery(AT.DELETE_BANK_ACCOUNT, deleteBankAccountWorker);
  yield takeEvery(AT.DELETE_CONFIRM_POPUP, deleteConfirmPopup);
}
