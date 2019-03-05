import * as AT from './action-types';

export function handleEditPopup(rows) {
  return {
    type: AT.EDIT_POPUP,
    payload: rows
  }
}

export function deleteWarehouse(warehouseId) {
  return {
    type: AT.DELETE_WAREHOUSE,
    payload: warehouseId
  }
}

export function handleSubmitEditPopup(warehouseData, branchId) {  

  return {
    type: AT.SUBMIT_EDIT_POPUP,
    payload: warehouseData,
    id: branchId
  }
}

export function handleAddNewWarehousePopup() {
  return {
    type: AT.ADD_NEW_WAREHOUSE_POPUP
  }
}

export function AddNewWarehouseRequest(warehouseData) { 
  return {
    type: AT.ADD_NEW_WAREHOUSE_REQUEST,
    payload: warehouseData
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