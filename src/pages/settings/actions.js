import * as AT from './action-types';

export function handleEditPopup(payload) {
  return {
    type: AT.EDIT_POPUP,
    payload
  }
}

export function deleteWarehouse(warehouseId) {
  return {
    type: AT.DELETE_WAREHOUSE,
    warehouseId
  }
}

export function handleSubmitEditPopup(warehouseData, branchId) {
  const dataBody = {
    address: {
      city: warehouseData.address,
      streetAddress: warehouseData.city,
      province: 44,
      zip: "0"
    },
    company: 1,
    contact: {
      email: warehouseData.email,
      name: warehouseData.contactName,
      phone: warehouseData.phone
    },
    warehouse: true,
    warehouseName: warehouseData.warehouseName
  }

  return {
    type: AT.SUBMIT_EDIT_POPUP,
    dataBody,
    branchId
  }
}

export function handleAddNewWarehousePopup() {
  return {
    type: AT.ADD_NEW_WAREHOUSE_POPUP
  }
}

export function AddNewWarehouseRequest(warehouseData) {
  const dataBody = {
    address: {
      city: warehouseData.address,
      province: 44,
      streetAddress: warehouseData.city,
      zip: warehouseData.zipCode
    },
    contact: {
      email: warehouseData.email,
      name: warehouseData.contactName,
      phone: warehouseData.phone
    },
    warehouse: true,
    warehouseName: warehouseData.warehouseName
  };

  return {
    type: AT.ADD_NEW_WAREHOUSE_REQUEST,
    dataBody
  }
}

export function getUsersDataRequest() {  
  return {
    type: AT.GET_USERS_DATA
  }
}

export function getUsersDataRequestSuccess(payload) {
  const usersRows = payload.map(user => {
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
    type: AT.GET_USERS_DATA_SUCCESS,
    usersRows
  }
}

export function getWarehousesDataRequest() {  
  return {
    type: AT.GET_WAREHOUSES_DATA
  }
}

export function getWarehousesDataRequestSuccess(payload) {
  const warehousesRows = payload.map(warehouse => {	
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
    type: AT.GET_WAREHOUSES_DATA_SUCCESS,
    warehousesRows
  }
}