import * as AT from './action-types';

export function handleEditPopup(rows) {
  return {
    type: AT.EDIT_POPUP_TRIGGER,
    payload: rows
  }
}

export function handleActiveTab(event) {
  return {
    type: AT.HANDLE_ACTIVE_TAB,
    payload: event.target
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

export function getBankAccountsDataRequest() {
  return {
    type: AT.GET_BANK_ACCOUNTS_DATA
  }
}

export function getProductsCatalogRequest() {
  return {
    type: AT.GET_PRODUCTS_CATALOG_DATA
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

export function postNewBankAccountRequest(bankAccountData) {
  return {
    type: AT.POST_NEW_BANK_ACCOUNT_REQUEST,
    payload: bankAccountData
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

