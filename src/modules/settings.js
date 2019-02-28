import {
  EDIT_POPUP,    
  SUBMIT_EDIT_POPUP,
  DELETE_WAREHOUSE,
  ADD_NEW_WAREHOUSE_POPUP,
  ADD_NEW_WAREHOUSE_REQUEST
} from "../constants/settings";

export const initialState = {
  editWarehousePopup: false,
  addNewWarehousePopup: false,
  popupValues: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_POPUP: {
      return {
        ...state,
        editWarehousePopup: state.editWarehousePopup === false ? true : false,
        popupValues: action.payload
      }
    }
    
    case ADD_NEW_WAREHOUSE_POPUP: {
      return {
        ...state,
        addNewWarehousePopup: state.addNewWarehousePopup === false ? true : false,
      }
    }
    default: {
      return state
    }
  }
}

export function handleEditPopup(payload) {
  return {
    type: EDIT_POPUP,
    payload
  }
}

export function deleteWarehouse(warehouseId) {
  return {
    type: DELETE_WAREHOUSE,
    warehouseId
  }
}

export function handleSubmitEditPopup(warehouseData, branchId) {
  return {
    type: SUBMIT_EDIT_POPUP,
    warehouseData,
    branchId
  }
}

export function handleAddNewWarehousePopup() {
  return {
    type: ADD_NEW_WAREHOUSE_POPUP
  }
}

export function AddNewWarehouseRequest(warehouseData) {
  return {
    type: ADD_NEW_WAREHOUSE_REQUEST,
    warehouseData
  }
}