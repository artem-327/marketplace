import * as AT from "./action-types"

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

export function handleFiltersValue(value) {
  return {
    type: AT.HANDLE_FILTERS_VALUE,
    payload: value
  }
}

export function handleSubmitEditPopup(warehouseData, branchId) {
  return {
    type: AT.SUBMIT_EDIT_POPUP_HANDLER,
    payload: warehouseData,
    id: branchId
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
    type: AT.GET_PRODUCTS_CATALOG_DATA
  }
}

export function getProductsWithRequiredParam(payload) {
  return {
    type: AT.GET_PRODUCTS_WITH_REQUIRED_PARAM,
    payload
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

export function postNewProductRequest(inputsValue, id) {
  return {
    // <<<<<<< HEAD
    type: AT.POST_NEW_BANK_ACCOUNT_REQUEST,
    payload: bankAccountData
    // =======
    //     type: AT.POST_NEW_PRODUCT_REQUEST
    //     // payload: inputsValue
    // >>>>>>> origin/t-27939
  }
}

export function postNewBankAccountRequest(bankAccountData) {
  return {
    // <<<<<<< HEAD
    type: AT.POST_NEW_PRODUCT_REQUEST
    // payload: inputsValue
    // =======
    //     type: AT.POST_NEW_BANK_ACCOUNT_REQUEST,
    //     payload: bankAccountData
    // >>>>>>> origin/t-27939
  }
}

export function deleteUser(userId) {
  return {
    type: AT.DELETE_USER,
    payload: userId
  }
}

export function deleteWarehouse(warehouseId) {
  return {
    type: AT.DELETE_WAREHOUSE,
    payload: warehouseId
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
