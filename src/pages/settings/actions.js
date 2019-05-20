import * as AT from "./action-types"
import api from "./api"

export function openPopup(rows = null) {
  return {
    type: AT.OPEN_POPUP,
    payload: rows
  }
}
export function closePopup(rows = null) {
  return {
    type: AT.CLOSE_POPUP,
    payload: rows
  }
}

export function openImportPopup() {
  return {
    type: AT.OPEN_IMPORT_POPUP
    //payload: rows
  }
}
export function closeImportPopup() {
  return {
    type: AT.CLOSE_IMPORT_POPUP
  }
}

export function closeImportPopupCancel() {
  return {
    type: AT.CLOSE_IMPORT_POPUP_CANCEL
  }
}

export function openEditPopup(rows) {
  return {
    type: AT.OPEN_EDIT_POPUP,
    payload: rows
  }
}
export function handlerSubmitUserEditPopup(value, id) {
  return {
    type: AT.HANDLE_SUBMIT_USER_EDIT_POPUP,
    payload: value,
    id
  }
}
export function handleEditPopup(rows) {
  return {
    type: AT.OPEN_EDIT_POPUP,
    payload: rows
  }
}
export function closeEditPopup() {
  return {
    type: AT.CLOSE_EDIT_POPUP
  }
}
export function openAddPopup(rows) {
  return {
    type: AT.OPEN_ADD_POPUP,
    payload: rows
  }
}
export function closeAddPopup() {
  return {
    type: AT.CLOSE_ADD_POPUP,
    payload: null
  }
}
export function changeHeadersCSV(payload) {
  return {
    type: AT.CHANGE_HEADERS_CSV,
    payload
  }
}

export function dataHeaderCSV(payload) {
  return {
    type: AT.DATA_HEADER_CSV,
    payload
  }
}

export function handleOpenConfirmPopup(payload) {
  return {
    type: AT.OPEN_CONFIRM_POPUP,
    payload
  }
}
export function deleteConfirmation() {
  return {
    type: AT.DELETE_CONFIRM_POPUP
  }
}
export function confirmationSuccess() {
  return {
    type: AT.CONFIRM_SUCCESS
  }
}
export function closeConfirmPopup() {
  return {
    type: AT.CLOSE_CONFIRM_POPUP
  }
}
export function closeToast() {
  return {
    type: AT.CLOSE_TOAST
  }
}

export function handleActiveTab(tab) {
  return {
    type: AT.HANDLE_ACTIVE_TAB,
    payload: { tab }
  }
}

export function handleFiltersValue(props, value) {
  return async dispatch => {
    switch (props.currentTab) {
      case "Delivery addresses":
        if (value.trim().length) await dispatch(getDeliveryAddressesByStringRequest(value))
        else await dispatch(getDeliveryAddressesByFilterRequest(props.deliveryAddressesFilter))
        break;

      default:
        dispatch({
          type: AT.HANDLE_FILTERS_VALUE,
          payload: value
        })
    }
  }
}

export function handleSubmitEditPopup(warehouseData, branchId) {
  return {
    type: AT.SUBMIT_EDIT_POPUP_HANDLER,
    payload: warehouseData,
    id: branchId
  }
}

export function handlerSubmitWarehouseEditPopup(warehouseData, id) {
  return {
    type: AT.PUT_WAREHOUSE_EDIT_POPUP,
    payload: warehouseData,
    id
  }
}

export function handleSubmitProductEditPopup(productData, id) {
  return {
    type: AT.PUT_PRODUCT_EDIT_POPUP,
    payload: productData,
    id
  }
}

export function handleAddNewWarehousePopup() {
  return {
    type: AT.POST_NEW_WAREHOUSE_POPUP
  }
}

export function getUsersDataRequest() {
  return {
    type: AT.GET_USERS_DATA
  }
}

export function openRolesPopup(row) {
  return {
    type: AT.OPEN_ROLES_POPUP,
    payload: row
  }
}

export function closeRolesPopup() {
  return {
    type: AT.CLOSE_ROLES_POPUP
  }
}

export function getWarehousesDataRequest() {
  return {
    type: AT.GET_WAREHOUSES_DATA
  }
}

export function getBranchesDataRequest() {
  return {
    type: AT.GET_BRANCHES_DATA
  }
}

export function getCreditCardsDataRequest() {
  return {
    type: AT.GET_CREDIT_CARDS_DATA
  }
}

export function getProductsCatalogRequest() {
  return {
    type: AT.GET_PRODUCTS_CATALOG_DATA
  }
}

export function getBankAccountsDataRequest() {
  return {
    type: AT.GET_BANK_ACCOUNTS_DATA
  }
}

export function getProductsWithRequiredParam(payload) {
  return {
    type: AT.GET_PRODUCTS_WITH_REQUIRED_PARAM,
    payload
  }
}

export function getStoredCSV(id) {
  return {
    type: AT.GET_STORED_CSV,
    payload: id
  }
}

export function postNewUserRequest(userData) {
  return {
    type: AT.POST_NEW_USER_REQUEST,
    payload: userData
  }
}

export function postNewWarehouseRequest(warehouseData) {
  return {
    type: AT.POST_NEW_WAREHOUSE_REQUEST,
    payload: warehouseData
  }
}

export function postNewCreditCardRequest(creditCardData) {
  return {
    type: AT.POST_NEW_CREDIT_CARD_REQUEST,
    payload: creditCardData
  }
}

export function putNewUserRoleRequest(roles, id) {
  return {
    type: AT.PUT_NEW_USER_ROLES_REQUEST,
    payload: roles,
    id
  }
}

export function handleSubmitProductEddPopup(inputsValue, id) {
  return {
    type: AT.POST_NEW_PRODUCT_REQUEST,
    payload: inputsValue
  }
}

export function postNewBankAccountRequest(bankAccountData) {
  return {
    type: AT.POST_NEW_BANK_ACCOUNT_REQUEST,
    payload: bankAccountData
  }
}

export function putBankAccountRequest(account, id) {
  return {
    type: AT.PUT_BANK_ACCOUNT_EDIT_POPUP,
    payload: account,
    id
  }
}

export function deleteCreditCard(cardId) {
  return {
    type: AT.DELETE_CREDIT_CARD,
    payload: cardId
  }
}

export function deleteBankAccount(accountId) {
  return {
    type: AT.DELETE_BANK_ACCOUNT,
    payload: accountId
  }
}

export function uploadCSVFile(payload) {
  return {
    type: AT.POST_UPLOAD_CSV_FILE,
    payload: payload
  }
}

export function postImportProductCSV(payload, id) {
  return {
    type: AT.POST_CSV_IMPORT_PRODUCTS,
    payload,
    id
  }
}
export function clearDataOfCSV() {
  return {
    type: AT.CLEAR_DATA_OF_CSV
  }
}

export function searchCasProduct(pattern) {
  return {
    type: AT.SEARCH_CAS_PRODUCT,
    payload: api.searchCasProduct(pattern)
  }
}

export function getDeliveryAddressesByStringRequest(value) {
  return {
    type: AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_STRING,
    payload: api.getDeliveryAddressesByStringRequest(value)
  }
}

export function getDeliveryAddressesByFilterRequest(value) {
  return {
    type: AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_FILTER,
    payload: api.getDeliveryAddressesByFilterRequest(value)
  }
}

export function deleteDeliveryAddressesItem(value, reloadFilter) {
  return async dispatch => {
    await dispatch({
      type: AT.SETTINGS_DELETE_DELIVERY_ADDRESSES,
      payload: api.deleteDeliveryAddresses(value)
    })
    // Reload CAS Delivery Addresses list using filters
    dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))
  }
}

export function getCountries() {
  return {
    type: AT.SETTINGS_GET_COUNTRIES,
    payload: api.getCountries()
  }
}

export function getProvinces(id) {
  return {
    type: AT.SETTINGS_GET_PROVINCES,
    payload: api.getProvinces(id)
  }
}





