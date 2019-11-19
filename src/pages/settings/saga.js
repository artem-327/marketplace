import {call, put, takeEvery, select} from 'redux-saga/effects'
import {closePopup, confirmationSuccess} from './actions'
import * as AT from './action-types'
import api from './api'

function* getUsersDataWorker() {
  try {
    const users = yield call(api.getUsers)
    const branches = yield call(api.getBranches)
    const roles = yield call(api.getRoles)

    yield put({type: AT.GET_ALL_BRANCHES_DATA, payload: branches})
    yield put({type: AT.GET_ROLES_DATA, payload: roles})
    yield put({type: AT.GET_USERS_DATA_SUCCESS, payload: users})
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
      payload: {warehouses, newCountryFormat}
    })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getBranchesDataWorker() {
  try {
    const branches = yield call(api.getBranches)
    const country = yield call(api.getCountry)

    const newCountryFormat = country.map(country => {
      return {
        text: country.name,
        value: country.id
      }
    })

    yield put({
      type: AT.GET_BRANCHES_DATA_SUCCESS,
      payload: {branches, newCountryFormat}
    })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getCreditCardsDataWorker() {
  try {
    // const creditCardsData = yield call(api.getCreditCardsData)
    const creditCardsData = [
      {
        id: '3',
        cardNumber: '15',
        last4: '7891',
        expMonth: 8,
        expYear: 21,
        cvcCheck: '123'
      },
      {
        id: '2',
        cardNumber: '75',
        last4: '4569',
        expMonth: 5,
        expYear: 19,
        cvcCheck: '951'
      },
      {
        id: '8',
        cardNumber: '9849',
        last4: '123',
        expMonth: 5,
        expYear: 21,
        cvcCheck: '753'
      }
    ]

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
    // const bankAccountsData = yield call(api.getBankAccountsData)
    const bankAccountsData = [
      {
        accountHolderName: 'Dima1',
        accountHolderType: 'type1',
        last4: '1234',
        currency: 'USD1',
        routingNumber: '123qw'
      },
      {
        accountHolderName: 'Dima2',
        accountHolderType: 'type2',
        last4: '1462',
        currency: 'USD2',
        routingNumber: '123qwer'
      },
      {
        accountHolderName: 'Dima3',
        accountHolderType: 'type3',
        last4: '1598',
        currency: 'USD3',
        routingNumber: '123trew'
      }
    ]

    const country = yield call(api.getCountry)
    const currency = yield call(api.getCurrencies)

    const newCountryFormat = country.map(country => {
      return {
        text: country.name,
        value: country.id
      }
    })
    const newCurrencyFormat = currency.map(currency => {
      return {
        text: currency.code,
        value: currency.id
      }
    })

    yield put({
      type: AT.GET_BANK_ACCOUNTS_DATA_SUCCESS,
      payload: {bankAccountsData, newCountryFormat, newCurrencyFormat}
    })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getProductCatalogWorker() {
  try {
    const productCatalog = yield call(api.getProductsCatalog)
    const productPacTypes = yield call(api.getProductTypes)
    const units = yield call(api.getUnitsType)

    yield put({
      type: AT.GET_PRODUCTS_CATALOG_DATA_SUCCESS,
      payload: {
        products: productCatalog,
        productsTypes: productPacTypes,
        units: units.data
      }
    })
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getProductsWithRequiredParamWorker({payload}) {
  try {
    const products = yield call(api.getProductsWithRequiredParamPar, payload)
    yield put({
      type: AT.GET_PRODUCTS_WITH_REQUIRED_PARAM_SUCCESS,
      payload: products
    })
  } catch (e) {}
}

function* getStoredCSV({payload}) {
  try {
    const data = yield call(api.getStoredCSV, payload)
    yield put({type: AT.GET_STORED_CSV_SUCCESS, data})
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* getCSVMapProductOffer() {
  try {
    const data = yield call(api.getCSVMapProductOffer)
    yield put({type: AT.GET_CSV_MAP_PRODUCT_OFFER_SUCCESS, data})
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* postNewUserWorker({payload}) {
  try {
    const dataBody = {
      email: payload.email,
      firstname: payload.firstName,
      lastname: payload.lastName,
      middlename: payload.middleName,
      homeBranch: payload.homeBranchId,
      password: '123'
    }
    yield call(api.postNewUser, dataBody)
    yield put({type: AT.GET_USERS_DATA})
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* postNewWarehouseWorker({payload}) {
  try {
    const currentUser = yield call(api.getCurrentUser)
    const dataBody = {
      address: {
        city: payload.city,
        country: payload.country,
        streetAddress: payload.address,
        zip: payload.zip
      },
      company: currentUser.company.id,
      contactEmail: payload.email,
      contactName: payload.contactName,
      contactPhone: payload.phone,
      warehouse: payload.tab ? false : true,
      name: payload.name
    }
    yield call(api.postNewWarehouse, dataBody)
    if (payload.tab) {
      yield put({type: AT.GET_BRANCHES_DATA})
    } else {
      yield put({type: AT.GET_WAREHOUSES_DATA})
    }
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* postNewCreditCardWorker({payload}) {
  console.log('payload', payload)
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

function* postNewBankAccountWorker({payload}) {
  try {
    const dataBody = {
      accountHolderName: payload.accountHolderName,
      accountHolderType: payload.accountHolderType,
      accountNumber: payload.account,
      country: payload.country,
      currency: payload.currency,
      routingNumber: payload.routingNumber
    }
    yield call(api.postNewBankAccount, dataBody)
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* postNewProductWorker({payload}) {
  try {
    const productData = {
      casProduct: payload.casProduct,
      packagingSize: payload.packagingSize,
      packagingType: payload.packageID,
      packagingUnit: payload.unitID,
      productCode: payload.productNumber,
      productName: payload.productName
    }
    yield call(api.postNewProduct, productData)
    yield put({type: AT.GET_WAREHOUSES_DATA})
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* postUploadCSVFile({payload}) {
  try {
    const data = yield call(api.uploadCSVFile, payload)
    yield put({type: AT.POST_UPLOAD_CSV_FILE_SUCCESS, data})
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* postImportProductCSV({payload, id}) {
  try {
    const data = yield call(api.postImportProductCSV, payload, id)
    yield put({type: AT.POST_CSV_IMPORT_PRODUCTS_SUCCESS, data})
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* postImportProductOfferCSV({payload, id}) {
  try {
    const data = yield call(api.postImportProductOfferCSV, payload, id)
    yield put({type: AT.POST_CSV_IMPORT_PRODUCTS_OFFER_SUCCESS, data})
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* postCSVMapProductOffer({payload}) {
  try {
    yield call(api.postCSVMapProductOffer, payload)
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* putWarehouseWorker({payload, id}) {
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
    yield put(closePopup({payload: null}))
  }
}

function* putUserWorker({payload, id}) {
  try {
    const updateUser = {
      firstname: payload.firstName,
      lastname: payload.lastName,
      middlename: payload.middleName,
      email: payload.email,
      homeBranchId: payload.homeBranchId,
      preferredCurrency: payload.preferredCurrency
    }

    yield call(api.patchUser, id, updateUser)
    yield put({type: AT.GET_USERS_DATA})
  } catch (e) {
    console.log('error', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* putNewUserRolesWorker({payload, id}) {
  try {
    // const updateUser = {
    //   roles: payload
    // }
    // console.log('payload', payload)
    // const updateUser = [2, 1]
    yield call(api.patchUserRole, id, payload)
    yield put({type: AT.GET_USERS_DATA})
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* putWarehouseEditPopup({payload, id}) {
  try {
    const dataBody = {
      address: {
        city: payload.city,
        country: payload.country,
        streetAddress: payload.address,
        zip: payload.zip
      },
      company: 3,
      contactEmail: payload.email,
      contactName: payload.contactName,
      contactPhone: payload.phone,
      warehouse: payload.tab ? false : true,
      name: payload.name
    }
    yield call(api.putWarehouse, id, dataBody)
    if (payload.tab) {
      yield put({type: AT.GET_BRANCHES_DATA})
    } else {
      yield put({type: AT.GET_WAREHOUSES_DATA})
    }
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* putProductEditPopup({payload}) {
  try {
    const id = payload.id
    const updateProduct = {
      casProduct: payload.casProduct,
      packagingSize: payload.packagingSize,
      packagingType: payload.packageID,
      productCode: payload.productNumber,
      productName: payload.productName,
      packagingUnit: payload.unitID,
      unNumber: payload.unNumber
    }
    yield call(api.putProduct, id, updateProduct)
    yield put({type: AT.GET_WAREHOUSES_DATA})
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* putBankAccountEditPopup({payload}) {
  try {
    console.log('payload', payload)
  } catch (e) {
    yield console.log('error:', e)
  } finally {
    yield put(closePopup({payload: null}))
  }
}

function* deleteCreditCardWorker({payload}) {
  try {
    yield call(api.deleteWarehouse, payload)
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* deleteBankAccountWorker({payload}) {
  try {
    yield call(api.deleteWarehouse, payload)
  } catch (e) {
    yield console.log('error:', e)
  }
}

function* closeImportPopup({}) {
  yield put({type: AT.CLOSE_IMPORT_POPUP_SUCCESS})
  yield put({type: AT.GET_PRODUCTS_CATALOG_DATA})
}

function* closeImportPopupCancel({payload}) {
  if (payload) {
    yield call(api.deleteTemporaryFile, payload)
  }
  yield put({type: AT.CLOSE_IMPORT_POPUP_SUCCESS})
}

function* deleteConfirmPopup({}) {
  const {
    settings: {deleteRowByid, currentTab}
  } = yield select()
  let toast = {}
  try {
    switch (currentTab) {
      case 'Users':
        yield call(api.deleteUser, deleteRowByid)
        toast = {message: 'User delete success', isSuccess: true}
        yield put({type: AT.GET_USERS_DATA})
        break
      case 'Branches':
        yield call(api.deleteWarehouse, deleteRowByid)
        toast = {message: 'Branch delete success', isSuccess: true}
        yield put({type: AT.GET_BRANCHES_DATA})
        break
      case 'Warehouses':
        yield call(api.deleteWarehouse, deleteRowByid)
        toast = {message: 'Warehouse delete success', isSuccess: true}
        yield put({type: AT.GET_WAREHOUSES_DATA})
        break
      case 'Product catalog':
        yield call(api.deleteProduct, deleteRowByid)
        toast = {message: 'Product delete success', isSuccess: true}
        yield put({type: AT.GET_PRODUCTS_CATALOG_DATA})
        break
      case 'Credit cards':
        yield call(api.deleteCreditCard, deleteRowByid)
        toast = {message: 'Credit cards delete success', isSuccess: true}
        yield put({type: AT.GET_CREDIT_CARDS_DATA})
        break
      case 'Bank accounts':
        yield call(api.deleteBankAccount, deleteRowByid)
        toast = {message: 'Bank account delete success', isSuccess: true}
        yield put({type: AT.GET_BANK_ACCOUNTS_DATA})
        break
      default:
        break
    }
  } catch (e) {
    yield console.log('error:', e)
    toast = {message: 'Error', isSuccess: false}
  } finally {
    yield put(confirmationSuccess())
    yield put({type: AT.OPEN_TOAST, payload: toast})
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
  yield takeEvery(AT.GET_PRODUCTS_WITH_REQUIRED_PARAM, getProductsWithRequiredParamWorker)
  yield takeEvery(AT.GET_STORED_CSV, getStoredCSV)
  yield takeEvery(AT.GET_CSV_MAP_PRODUCT_OFFER, getCSVMapProductOffer)

  yield takeEvery(AT.POST_NEW_USER_REQUEST, postNewUserWorker)
  yield takeEvery(AT.POST_NEW_WAREHOUSE_REQUEST, postNewWarehouseWorker)
  yield takeEvery(AT.POST_NEW_CREDIT_CARD_REQUEST, postNewCreditCardWorker)
  yield takeEvery(AT.POST_NEW_BANK_ACCOUNT_REQUEST, postNewBankAccountWorker)
  yield takeEvery(AT.POST_NEW_PRODUCT_REQUEST, postNewProductWorker)
  yield takeEvery(AT.POST_UPLOAD_CSV_FILE, postUploadCSVFile)
  yield takeEvery(AT.POST_CSV_IMPORT_PRODUCTS, postImportProductCSV)
  yield takeEvery(AT.POST_CSV_IMPORT_PRODUCTS_OFFER, postImportProductOfferCSV)
  yield takeEvery(AT.POST_CSV_MAP_PRODUCT_OFFER, postCSVMapProductOffer)

  yield takeEvery(AT.HANDLE_SUBMIT_USER_EDIT_POPUP, putUserWorker)

  yield takeEvery(AT.PUT_NEW_USER_ROLES_REQUEST, putNewUserRolesWorker)
  yield takeEvery(AT.PUT_WAREHOUSE_EDIT_POPUP, putWarehouseEditPopup)
  yield takeEvery(AT.PUT_PRODUCT_EDIT_POPUP, putProductEditPopup)
  yield takeEvery(AT.PUT_BANK_ACCOUNT_EDIT_POPUP, putBankAccountEditPopup)

  yield takeEvery(AT.DELETE_CREDIT_CARD, deleteCreditCardWorker)
  yield takeEvery(AT.DELETE_BANK_ACCOUNT, deleteBankAccountWorker)
  yield takeEvery(AT.DELETE_CONFIRM_POPUP, deleteConfirmPopup)

  // yield takeEvery(AT.OPEN_ROLES_POPUP, openRolesPopup)
  // yield takeEvery(AT.CLOSE_ROLES_POPUP, closeRolesPopup)

  yield takeEvery(AT.CLOSE_IMPORT_POPUP, closeImportPopup)
  yield takeEvery(AT.CLOSE_IMPORT_POPUP_CANCEL, closeImportPopupCancel)
}
