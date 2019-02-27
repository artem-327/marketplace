import {
  EDIT_POPUP,
  SUBMIT_EDIT_POPUP
} from "../constants/settings";

export const initialState = {
  editWarehousePopup: false,
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
    default: {
      return state
    }
  }
}

export function handleEditPopup(payload) {
  // console.log(payload, 'payload action')
  return {
    type: EDIT_POPUP,
    payload
  }
}

export function handleSumbitEditPopup(warehouseData, branchId) {
  // console.log(payload, 'payload action')
  return {
    type: SUBMIT_EDIT_POPUP,
    warehouseData,
    branchId
  }
}