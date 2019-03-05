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
      const usersRows = action.payload.map(user => {
        return {
          checkbox: " ",
          userName: user.firstname + " " + user.lastname,
          title: "title",
          email: user.email,
          phone: "phone",
          homeBranch: user.branch.address.province.name,
          permissions: user.roles.name
        };
      });
      return {
        ...state,
        usersRows: usersRows,
      }
    }

    case AT.GET_WAREHOUSES_DATA_SUCCESS: {
      const warehousesRows = action.payload.map(warehouse => {	
        return (
          {
            warehouseName: warehouse.company.name,
            address: warehouse.address.streetAddress + ', ' + warehouse.address.city,
            contactName: warehouse.contact.name,
            phone: warehouse.contact.phone,
            email: warehouse.contact.email,
            branchId: warehouse.id
          }
        )			
      });

      return {
        ...state,
        warehousesRows: warehousesRows,
      }
    }

    default: {
      return state
    }
  }
}