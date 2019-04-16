import { call, put, takeEvery, select } from 'redux-saga/effects'
import { closePopup, confirmationSuccess } from './actions'
import * as AT from './action-types'
import api from './api'

function* getUsersDataWorker() {
  try {
    const users = yield call(api.getUsers)
    const branches = yield call(api.getBranches)
    const roles = yield call(api.getRoles)

    yield put({ type: AT.GET_ALL_BRANCHES_DATA, payload: branches })
    yield put({ type: AT.GET_USERS_DATA_SUCCESS, payload: users })
    yield put({ type: AT.GET_ROLES_DATA, payload: roles })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* openRolesPopup({ payload }) {
  try {
    yield put({ type: AT.OPEN_POPUP, payload })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* closeRolesPopup() {
  try {
    yield put({ type: AT.CLOSE_POPUP })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getWarehousesDataWorker() {
  try {
    const warehouses = yield call(api.getWarehouses)
    const country = yield call(api.getCountry)
    const newCountryFormat = country.map(country => {
      return {
        text: country.name,
        value: country.id
      }
    })
    yield put({
      type: AT.GET_WAREHOUSES_DATA_SUCCESS,
      payload: { warehouses, newCountryFormat }
    })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getBranchesDataWorker() {
  try {
    const branches = yield call(api.getBranches)
    yield put({ type: AT.GET_BRANCHES_DATA_SUCCESS, payload: branches })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getCreditCardsDataWorker() {
  try {
    const creditCardsData = yield call(api.getCreditCardsData)
    yield put({
      type: AT.GET_CREDIT_CARDS_DATA_SUCCESS,
      payload: creditCardsData
    })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getBankAccountsDataWorker() {
  try {
    const bankAccountsData = yield call(api.getBankAccountsData)
    yield put({
      type: AT.GET_BANK_ACCOUNTS_DATA_SUCCESS,
      payload: bankAccountsData
    })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getProductCatalogWorker() {
  try {
    const productCatalog = yield call(api.getProductsCatalog)
    const productPacTypes = yield call(api.getProductTypes)
    yield put({
      type: AT.GET_PRODUCTS_CATALOG_DATA_SUCCESS,
      payload: { products: productCatalog, productsTypes: productPacTypes }
    })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getProductsWithRequiredParamWorker({ payload }) {
  try {
    const products = yield call(api.getProductsWithRequiredParamPar, payload)
    yield put({
      type: AT.GET_PRODUCTS_WITH_REQUIRED_PARAM_SUCCESS,
      payload: products
    })
  } catch (e) {}
}

function* postNewUserWorker({ payload }) {
  try {
    const dataBody = {
      email: payload.email,
      firstname: payload.firstName,
      lastname: payload.lastName,
      middlename: payload.middleName
    }
    yield call(api.postNewUser, dataBody)
    yield put({ type: AT.GET_USERS_DATA })
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({ payload: null }))
  }
}

function* postNewWarehouseWorker({ payload }) {
  try {
    const currentUser = yield call(api.getCurrentUser)
    const dataBody = {
      // accessorials: [0],
      address: {
        city: payload.address,
        country: payload.country,
        // province: 44,
        streetAddress: payload.city,
        zip: payload.zip
      },
      company: currentUser.company.id,
      contact: {
        email: payload.email,
        name: payload.contactName,
        phone: payload.phone
      },
      warehouse: payload.tab ? false : true,
      name: payload.name
    }
    yield call(api.postNewWarehouse, dataBody)
    yield put({ type: AT.GET_WAREHOUSES_DATA })
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({ payload: null }))
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
    yield call(api.postNewCreditCard, dataBody)
  } catch (e) {
    yield console.log('error:', e)
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
    yield call(api.postNewBankAccount, dataBody)
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* postNewProductWorker({ payload }) {
  try {
    const productData = {
      casProduct: payload.casProduct,
      packagingSize: payload.packagingSize,
      packagingType: payload.packageID,
      packagingUnit: 0,
      productCode: payload.productNumber,
      productName: payload.productName
    }
    yield call(api.postNewProduct, productData)
    yield put({ type: AT.GET_WAREHOUSES_DATA })
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({ payload: null }))
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
        zip: payload.zip
      },
      company: 3,
      contact: {
        email: payload.email,
        name: payload.contactName,
        phone: payload.phone
      },
      warehouse: true,
      name: payload.name
    }
    yield call(api.putWarehouse, id, dataBody)
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({ payload: null }))
  }
}

function* putUserWorker({ payload, id }) {
  try {
    const updateUser = {
      firstname: payload.firstName,
      lastname: payload.lastName,
      middlename: payload.middleName,
      email: payload.email,
      homeBranchId: payload.homeBranchId,
      preferredCurrency: payload.preferredCurrency
    }

    console.log('updateUser', updateUser)
    yield call(api.patсhUser, id, updateUser)
    yield put({ type: AT.GET_USERS_DATA })
  } catch (e) {
    console.log('error', e)
  } finally {
    yield put(closePopup({ payload: null }))
  }
}

function* putWarehouseEditPopup({ payload, id }) {
  console.log('payload', payload)
  try {
    const dataBody = {
      address: {
        city: payload.city,
        country: payload.country,
        streetAddress: payload.address,
        zip: payload.zip
      },
      company: 3,
      contact: {
        email: payload.email,
        name: payload.contactName,
        phone: payload.phone
      },
      warehouse: payload.tab ? false : true,
      name: payload.name
    }
    yield call(api.putWarehouse, id, dataBody)
    yield put({ type: AT.GET_WAREHOUSES_DATA })
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({ payload: null }))
  }
}

function* putProductEditPopup({ payload }) {
  try {
    const id = payload.id
    const updateProduct = {
      casProduct: payload.casProduct,
      packagingSize: payload.packagingSize,
      packagingType: payload.packageID,
      packagingUnit: 0,
      productCode: payload.productNumber,
      productName: payload.productName,
      unNumber: payload.unNumber
    }
    yield call(api.putProduct, id, updateProduct)
    yield put({ type: AT.GET_WAREHOUSES_DATA })
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({ payload: null }))
  }
}

function* deleteCreditCardWorker({ payload }) {
  try {
    yield call(api.deleteWarehouse, payload)
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* deleteBankAccountWorker({ payload }) {
  try {
    yield call(api.deleteWarehouse, payload)
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* deleteConfirmPopup({}) {
  const {
    settings: { deleteRowByid, currentTab }
  } = yield select()
  let toast = {}
  try {
    switch (currentTab) {
      case 'Users':
        yield call(api.deleteUser, deleteRowByid)
        toast = { message: 'User delete success', isSuccess: true }
        yield put({ type: AT.GET_USERS_DATA })
        break
      case 'Branches':
        yield call(api.deleteWarehouse, deleteRowByid)
        toast = { message: 'Warehouse delete success', isSuccess: true }
        yield put({ type: AT.GET_WAREHOUSES_DATA })
        break
      case 'Warehouses':
        yield call(api.deleteWarehouse, deleteRowByid)
        toast = { message: 'Warehouse delete success', isSuccess: true }
        yield put({ type: AT.GET_WAREHOUSES_DATA })
        break
      case 'Product catalog':
        yield call(api.deleteProduct, deleteRowByid)
        toast = { message: 'Product delete success', isSuccess: true }
        yield put({ type: AT.GET_PRODUCTS_CATALOG_DATA })
      default:
        break
    }
  } catch (e) {
    yield console.log('error:', e)
    toast = { message: 'Network error', isSuccess: false }
  } finally {
    yield put(confirmationSuccess())
    yield put({ type: AT.OPEN_TOAST, payload: toast })
  }
}

export default function* settingsSaga() {
  yield takeEvery(AT.SUBMIT_EDIT_POPUP_HANDLER, putWarehouseWorker)
  yield takeEvery(AT.GET_USERS_DATA, getUsersDataWorker)
  yield takeEvery(AT.GET_WAREHOUSES_DATA, getWarehousesDataWorker)
  yield takeEvery(AT.GET_BRANCHES_DATA, getBranchesDataWorker)
  yield takeEvery(AT.GET_CREDIT_CARDS_DATA, getCreditCardsDataWorker)
  yield takeEvery(AT.GET_BANK_ACCOUNTS_DATA, getBankAccountsDataWorker)
  yield takeEvery(AT.GET_PRODUCTS_CATALOG_DATA, getProductCatalogWorker)
  yield takeEvery(
    AT.GET_PRODUCTS_WITH_REQUIRED_PARAM,
    getProductsWithRequiredParamWorker
  )

  yield takeEvery(AT.POST_NEW_USER_REQUEST, postNewUserWorker)
  yield takeEvery(AT.POST_NEW_WAREHOUSE_REQUEST, postNewWarehouseWorker)
  yield takeEvery(AT.POST_NEW_CREDIT_CARD_REQUEST, postNewCreditCardWorker)
  yield takeEvery(AT.POST_NEW_BANK_ACCOUNT_REQUEST, postNewBankAccountWorker)
  yield takeEvery(AT.POST_NEW_PRODUCT_REQUEST, postNewProductWorker)

  yield takeEvery(AT.HANDLE_SUBMIT_USER_EDIT_POPUP, putUserWorker)

  yield takeEvery(AT.PUT_WAREHOUSE_EDIT_POPUP, putWarehouseEditPopup)
  yield takeEvery(AT.PUT_PRODUCT_EDIT_POPUP, putProductEditPopup)

  yield takeEvery(AT.DELETE_CREDIT_CARD, deleteCreditCardWorker)
  yield takeEvery(AT.DELETE_BANK_ACCOUNT, deleteBankAccountWorker)
  yield takeEvery(AT.DELETE_CONFIRM_POPUP, deleteConfirmPopup)

  yield takeEvery(AT.OPEN_ROLES_POPUP, openRolesPopup)
  yield takeEvery(AT.CLOSE_ROLES_POPUP, closeRolesPopup)
}
