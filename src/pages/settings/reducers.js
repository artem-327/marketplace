import * as AT from './action-types';
  
export const initialState = {
  editWarehousePopup: false,
  addNewWarehousePopup: false,
  popupValues: [],
  usersRows: [],
  warehousesRows: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.EDIT_POPUP: {
      return {
        ...state,
        editWarehousePopup: state.editWarehousePopup === false ? true : false,
        popupValues: action.payload
      }
    }
    
    case AT.ADD_NEW_WAREHOUSE_POPUP: {
      return {
        ...state,
        addNewWarehousePopup: state.addNewWarehousePopup === false ? true : false,
      }
    }

    case AT.GET_USERS_DATA_SUCCESS: {
      return {
        ...state,
        usersRows: action.usersRows,
      }
    }

    case AT.GET_WAREHOUSES_DATA_SUCCESS: {
      return {
        ...state,
        warehousesRows: action.warehousesRows,
      }
    }

    default: {
      return state
    }
  }
}