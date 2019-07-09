import * as AT from "./action-types"
import api from "./api"
import { Datagrid } from '~/modules/datagrid'

export const removeEmpty = (obj) =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      removeEmpty(val)
      if (Object.entries(val).length === 0) delete obj[key]
    }
    else {
      if (val == null) delete obj[key]
      else if (typeof val === 'string') {
        if (val.trim() === '') delete obj[key]
        else obj[key] = val.trim()
      }
    }
  })

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

export function openDwollaPopup() {
  return {
    type: AT.OPEN_DWOLLA_POPUP
  }
}
export function closeDwollaPopup() {
  return {
    type: AT.CLOSE_DWOLLA_POPUP
  }
}

export function dwollaInitiateVerification(id) {
  return {
    type: AT.DWOLLA_START_VERIFICATION,
    async payload() {
      await api.dwollaInitiateVerification(id)
      const data = await api.getBankAccountsData()

      return data
    }
  }
}

export function dwollaFinalizeVerification(id, value1, value2) {
  return {
    type: AT.DWOLLA_FINALIZE_VERIFICATION,
    async payload() {
      await api.dwollaFinalizeVerification(id, value1, value2)
      const data = await api.getBankAccountsData()

      return data
    }
  }
}

export function openImportPopup() {
  return {
    type: AT.OPEN_IMPORT_POPUP
    //payload: rows
  }
}
export function closeImportPopup(reloadFilter) {
  return async dispatch => {
    dispatch({
      type: AT.SETTINGS_CLOSE_IMPORT_POPUP,
    })
    dispatch({
      type: AT.SETTINGS_CLOSE_IMPORT_POPUP_FULFILLED,
    })
    dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Products list using string filters or page display
  }
}

export function closeImportPopupCancel() {
  return {
    type: AT.SETTINGS_CLOSE_IMPORT_POPUP_FULFILLED
  }
}

export function openEditPopup(rows) {
  return {
    type: AT.OPEN_EDIT_POPUP,
    payload: rows
  }
}
export function handlerSubmitUserEditPopup(payload, id) {
  return async dispatch => {
    removeEmpty(payload)
    await dispatch({
      type: AT.HANDLE_SUBMIT_USER_EDIT_POPUP,
      payload: api.patchUser(id, payload)
    })
    //dispatch(getUsersDataRequest())
    dispatch(closePopup())
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

export const deleteUser = (id, name) => ({
  type: AT.DELETE_USER,
  async payload() {
    await api.deleteUser(id)
    Datagrid.removeRow(id)
    return name
  }
})

export const deleteBranch = (id) => ({
  type: AT.DELETE_BRANCH,
  async payload() {
    await api.deleteWarehouse(id)
    Datagrid.removeRow(id)
    return id
  }
})

export const deleteProduct = (id, name) => ({
  type: AT.DELETE_PRODUCT,
  async payload() {
    await api.deleteProduct(id)
    Datagrid.removeRow(id)
    return name
  }
})

export const deleteBankAccount = (id) => ({ type: AT.DELETE_BANK_ACCOUNT, payload: api.deleteBankAccount(id) })

export const deleteDeliveryAddress = (id) => ({
  type: AT.SETTINGS_DELETE_DELIVERY_ADDRESSES,
  async payload() {
    const response = await api.deleteDeliveryAddress(id)
    Datagrid.removeRow(id)
    return response
  }
})

// export function deleteConfirmation(deleteRowById, currentTab, reloadFilter=null) {
//   let toast = {}
//   return async dispatch => {
//     switch (currentTab.type) {
//       case "users":
//         await dispatch({ type: AT.DELETE_CONFIRM_POPUP, payload: api.deleteUser(deleteRowById)})
//         toast = { message: "User delete success", isSuccess: true }
//         dispatch(getUsersDataRequest())
//         break
//       case "branches":
//         await dispatch({ type: AT.DELETE_CONFIRM_POPUP, payload: api.deleteWarehouse(deleteRowById)})
//         toast = { message: "Branch delete success", isSuccess: true }
//         dispatch(getBranchesDataRequest())
//         break
//       case "warehouses":
//         await dispatch({ type: AT.DELETE_CONFIRM_POPUP, payload: api.deleteWarehouse(deleteRowById)})
//         toast = { message: "Warehouse delete success", isSuccess: true }
//         dispatch(getWarehousesDataRequest())
//         break
//       case "products":
//         await dispatch({ type: AT.DELETE_CONFIRM_POPUP, payload: api.deleteProduct(deleteRowById)})
//         toast = { message: "Product delete success", isSuccess: true }
//         dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Products list using string filters or page display
//         break
//       case "credit-cards":
//         await dispatch({ type: AT.DELETE_CONFIRM_POPUP, payload: api.deleteCreditCard(deleteRowById)})
//         toast = { message: "Credit cards delete success", isSuccess: true }
//         dispatch(getCreditCardsDataRequest())
//         break
//       case "bank-accounts":
//         await dispatch({ type: AT.DELETE_CONFIRM_POPUP, payload: api.deleteBankAccount(deleteRowById)})
//         toast = { message: "Bank account delete success", isSuccess: true }
//         dispatch(getBankAccountsDataRequest())
//         break
//       default:
//         break
//     }
//     dispatch(confirmationSuccess())
//     dispatch({
//       type: AT.OPEN_TOAST,
//       payload: toast
//     })
//   }
// }

export function confirmationSuccess() {
  return {
    type: AT.CONFIRM_FULFILLED
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

/*export function handleActiveTab(tab) {
  return {
    type: AT.HANDLE_ACTIVE_TAB,
    payload: { tab }
  }
}*/

export function handleFiltersValue(value) {
  return async dispatch => {
    dispatch({
      type: AT.HANDLE_FILTERS_VALUE,
      payload: value
    })
    // switch (props.currentTab.type) {
    //   case "delivery-addresses":
    //     if (value.trim().length) await dispatch(getDeliveryAddressesByStringRequest(value))
    //     else await dispatch(getDeliveryAddressesByFilterRequest(props.deliveryAddressesFilter))
    //     break
    //   case "products":
    //     if (value.trim().length > 2) await dispatch(getProductsCatalogRequest({ body: value, unmapped: props.productCatalogUnmappedValue }))
    //     else await dispatch(getProductsCatalogRequest({ body: props.productsFilter, unmapped: props.productCatalogUnmappedValue }))
    //     break
    // }
  }
}

export function handleProductCatalogUnmappedValue(checked, props) {
  return async dispatch => {
    dispatch({
      type: AT.HANDLE_PRODUCT_CATALOG_UNMAPPED_VALUE,
      payload: checked
    })
    dispatch(handleFiltersValue({ ...props, productCatalogUnmappedValue: checked }, props.filterValue))
  }
}

export function handlerSubmitWarehouseEditPopup(payload, id) {
  return async dispatch => {
    const currentUser = await api.getCurrentUser()
    const dataBody = {
      address: {
        city: payload.city,
        country: payload.country,
        province: payload.province,
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
    removeEmpty(dataBody)
    const response = await api.putWarehouse(id, dataBody)
    await dispatch({
      type: AT.PUT_WAREHOUSE_EDIT_POPUP,
      payload: response
    })
    Datagrid.updateRow(id, () => response)
    dispatch(closePopup())
  }
}

export function handleSubmitProductEditPopup(productData, id, reloadFilter) {
  return async dispatch => {
    const data = {
      casProducts: productData.casProducts ? productData.casProducts : null,
      description: productData.description,
      freightClass: productData.freightClass ? productData.freightClass : null,
      hazardClasses: productData.hazardClass ? productData.hazardClass : null,
      hazardous: productData.hazardous,
      nmfcNumber: productData.nmfcNumber !== '' ? parseInt(productData.nmfcNumber) : null,
      packagingSize: productData.packagingSize,
      packagingType: productData.packageID,
      packagingGroup: productData.packagingGroup ? productData.packagingGroup : null,
      productCode: productData.productNumber,
      productName: productData.productName,
      packagingUnit: productData.unitID,
      stackable: productData.stackable,
      unNumber: productData.unNumber ? productData.unNumber : null
    }
    removeEmpty(data)
    await dispatch({
      type: AT.SETTINGS_UPDATE_PRODUCT_CATALOG,
      payload: api.updateProduct(id, data)
    })
    if (productData.attachments && productData.attachments.length) {
      for (let i = 0; i < productData.attachments.length; i++) {
        dispatch({
          type: AT.SETTINGS_POST_LINK_ATTACHMENT,
          payload: api.postLinkAttachment(productData.attachments[i].id, id)
        })
      }
    }
    dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Products list using string filters or page display
    dispatch(closePopup())
  }
}

export function handleAddNewWarehousePopup() {
  return {
    type: AT.POST_NEW_WAREHOUSE_POPUP
  }
}

export function getUsersDataRequest() {
  return (dispatch) => {
    dispatch({
      type: AT.GET_USERS_DATA,
      async payload() {
        const [users, branches, roles, currentUser] = await Promise.all([
          api.getUsers(),
          api.getBranches(),
          api.getRoles(),
          api.getCurrentUser()
        ])
        dispatch({
          type: AT.GET_ALL_BRANCHES_DATA,
          payload: branches
        })
        dispatch({
          type: AT.GET_ROLES_DATA,
          payload: roles
        })
        dispatch({
          type: AT.GET_CURRENT_USER_DATA,
          payload: currentUser
        })
        return users
      }
    })
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
  return (dispatch) => {
    dispatch({
      type: AT.GET_WAREHOUSES_DATA,
      async payload() {
        const [warehouses, country] = await Promise.all([
          api.getWarehouses(),
          api.getCountry(),
        ])
        const newCountryFormat = country.map(country => {
          return {
            text: country.name,
            value: country.id
          }
        })
        return { warehouses, newCountryFormat, country }
      }
    })
  }
}

export function getBranchesDataRequest() {
  return (dispatch) => {
    dispatch({
      type: AT.GET_BRANCHES_DATA,
      async payload() {
        const [branches, country] = await Promise.all([
          api.getBranches(),
          api.getCountry(),
        ])
        const newCountryFormat = country.map(country => {
          return {
            text: country.name,
            value: country.id
          }
        })
        return { branches, newCountryFormat, country }
      }
    })
  }
}

export function getCreditCardsDataRequest() {
  return dispatch => {
    const creditCardsData = [ // TODO - temporary fake function
      {
        id: "3",
        cardNumber: "15",
        last4: "7891",
        expMonth: 8,
        expYear: 21,
        cvcCheck: "123"
      },
      {
        id: "2",
        cardNumber: "75",
        last4: "4569",
        expMonth: 5,
        expYear: 19,
        cvcCheck: "951"
      },
      {
        id: "8",
        cardNumber: "9849",
        last4: "123",
        expMonth: 5,
        expYear: 21,
        cvcCheck: "753"
      }
    ]
    
    dispatch({
      type: AT.GET_CREDIT_CARDS_DATA,
      async payload() { return creditCardsData }
    })
  }
}

export function getProductsCatalogRequest(data) {
  return (dispatch) => {
    dispatch({
      type: AT.SETTINGS_GET_PRODUCTS_CATALOG_DATA,
      async payload() {
        const [/*productCatalog,*/ productPacTypes, units, hazardClasses, packagingGroups] = await Promise.all([
          // typeof data.body === 'object' ? api.getProductsCatalogByFilter(data) : api.getProductsCatalogByString(data),
          api.getProductTypes(),
          api.getUnitsType(),
          api.getHazardClasses(),
          api.getPackagingGroups()
        ])
        return {
          // products: productCatalog,
          productsTypes: productPacTypes,
          units: units.data,
          hazardClasses: hazardClasses.data,
          packagingGroups: packagingGroups.data
        }
      }
    })
  }
}

export function getCurrencies() {
  return {
    type: AT.SETTINGS_GET_CURRENCIES,
    payload: api.getCurrencies()
  }
}

export function getBankAccountsDataRequest() {
  return (dispatch) => {
    dispatch({
      type: AT.GET_BANK_ACCOUNTS_DATA,
      async payload() {
        const [bankAccountsData, country, currency] = await Promise.all([
          api.getBankAccountsData(),
          api.getCountry(),
          api.getCurrencies(),
        ])
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
        return { bankAccountsData, newCountryFormat, newCurrencyFormat }
      }
    })
  }
}

export function getProductsWithRequiredParam(payload) {
  return {
    type: AT.GET_PRODUCTS_WITH_REQUIRED_PARAM,
    payload: api.getProductsWithRequiredParamPar(payload)
  }
}

export function getStoredCSV(data) {
  return {
    type: AT.SETTINGS_GET_STORED_CSV,
    payload: api.getStoredCSV(data)
  }
}

export function postNewUserRequest(payload) {
  return async dispatch => {
    removeEmpty(payload)
    await dispatch({
      type: AT.POST_NEW_USER_REQUEST,
      payload: api.postNewUser(payload)
    })
    //dispatch(getUsersDataRequest())
    dispatch(closePopup())
  }
}

export function postNewWarehouseRequest(payload) {
  return async dispatch => {
    const dataBody = {
      address: {
        city: payload.city,
        country: payload.country,
        province: payload.province,
        streetAddress: payload.address,
        zip: payload.zip
      },
      contactEmail: payload.email,
      contactName: payload.contactName,
      contactPhone: payload.phone,
      warehouse: payload.tab ? false : true,
      name: payload.name
    }
    removeEmpty(dataBody)
    await dispatch({
      type: AT.POST_NEW_WAREHOUSE_REQUEST,
      payload: api.postNewWarehouse(dataBody)
    })
    Datagrid.loadData()
    dispatch(closePopup())
  }
}

export function postNewCreditCardRequest(payload) {
  const dataBody = {
    cardNumber: payload.cardNumber,
    cvc: Number(payload.cvc),
    expirationMonth: Number(payload.expirationMonth),
    expirationYear: Number(payload.expirationYear)
  }
  return {
    type: AT.POST_NEW_CREDIT_CARD_REQUEST,
    payload: api.postNewCreditCard(dataBody)
  }
}

export function putNewUserRoleRequest(payload, id) {
  return async dispatch => {
    await dispatch({
      type: AT.PUT_NEW_USER_ROLES_REQUEST,
      payload: api.patchUserRole(id, payload)
    })
    //dispatch(getUsersDataRequest())
    dispatch(closeRolesPopup())
  }
}

export function userSwitchEnableDisable(id) {
  return {
    type: AT.USER_SWITCH_ENABLE_DISABLE,
    payload: api.userSwitchEnableDisable(id)
  }
}

export function handleSubmitProductAddPopup(inputsValue, reloadFilter) {
  return async dispatch => {
    const data = {
      casProducts: inputsValue.casProducts ? inputsValue.casProducts : [],
      description: inputsValue.description,
      freightClass: inputsValue.freightClass ? inputsValue.freightClass : null,
      hazardClasses: inputsValue.hazardClass ? inputsValue.hazardClass : null,
      hazardous: inputsValue.hazardous,
      nmfcNumber: inputsValue.nmfcNumber !== '' ? parseInt(inputsValue.nmfcNumber) : null,
      packagingSize: inputsValue.packagingSize,
      packagingType: inputsValue.packageID,
      packagingUnit: inputsValue.unitID,
      packagingGroup: inputsValue.packagingGroup ? inputsValue.packagingGroup : null,
      productCode: inputsValue.productNumber,
      productName: inputsValue.productName,
      stackable: inputsValue.stackable,
      unNumber: inputsValue.unNumber ? inputsValue.unNumber : null
    }
    removeEmpty(data)
    const newProd = await dispatch({
      type: AT.SETTINGS_POST_NEW_PRODUCT_REQUEST,
      payload: api.postNewProduct(data)
    })
    if (inputsValue.attachments && inputsValue.attachments.length) {
      for (let i = 0; i < inputsValue.attachments.length; i++) {
        dispatch({
          type: AT.SETTINGS_POST_LINK_ATTACHMENT,
          payload: api.postLinkAttachment(inputsValue.attachments[i].id, newProd.value.data.id)
        })
      }
    }
    dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Products list using string filters or page display
    dispatch(closePopup())
  }
}

export function postNewBankAccountRequest(payload) {
  return {
    type: AT.POST_NEW_BANK_ACCOUNT_REQUEST,
    async payload() {
      const { data } = await api.postNewBankAccount(payload)
      return data
    }
  }
}

export function putBankAccountRequest(account, id) {
  return {  // ! ! missing in saga
    type: AT.PUT_BANK_ACCOUNT_EDIT_POPUP,
    payload: account,
    id
  }
}

export function deleteCreditCard(cardId) {
  return {  // ! ! saga calls api.deleteWarehouse ???
    type: AT.DELETE_CREDIT_CARD,
    payload: cardId
  }
}

// export function deleteBankAccount(accountId) {
//   return {  // ! ! saga calls api.deleteWarehouse ???
//     type: AT.DELETE_BANK_ACCOUNT,
//     payload: accountId
//   }
// }

export function uploadCSVFile(payload) {
  return {
    type: AT.POST_UPLOAD_CSV_FILE,
    payload: api.uploadCSVFile(payload)
  }
}

export function postImportProductCSV(payload, id) {
  return {
    type: AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS,
    payload: api.postImportProductCSV(payload, id)
  }
}

export function postDwollaAccount(payload) {
  return {
    type: AT.SETTINGS_CREATE_DWOLLA_ACCOUNT,
    payload: api.postNewDwollaAccount(payload)
  }
}

export function clearDataOfCSV() {
  return {
    type: AT.SETTINGS_CLEAR_DATA_OF_CSV
  }
}

export function newCasProductsIndex() {
  return {
    type: AT.SETTINGS_CREATE_CAS_PRODUCTS_INDEX,
    payload: {}
  }
}

export function removeCasProductsIndex(index) {
  return {
    type: AT.SETTINGS_REMOVE_CAS_PRODUCTS_INDEX,
    payload: {
      index
    }
  }
}

export function prepareSearchedCasProducts(casProducts) {
  return {
    type: AT.SETTINGS_PREPARE_CAS_PRODUCTS,
    payload: {
      casProducts
    }
  }
}

export function searchCasProduct(pattern, index) {
  return {
    type: AT.SEARCH_CAS_PRODUCT,
    async payload() {
      const dataResponse = await api.searchCasProduct(pattern)
      return {
        ...dataResponse,
        index
      }
    }
  }
}

export function searchUnNumber(pattern) {
  return {
    type: AT.SEARCH_UN_NUMBER,
    payload: api.searchUnNumber(pattern)
  }
}

export function getAddressSearch(body) {
  return {
    type: AT.SETTINGS_GET_ADDRESSES_SEARCH,
    payload: api.getAddressSearch(body)
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

export function updateDeliveryAddresses(id, value, reloadFilter) {
  return async dispatch => {
    await dispatch({
      type: AT.SETTINGS_UPDATE_DELIVERY_ADDRESSES,
      payload: api.updateDeliveryAddresses(id, value)
    })
    dispatch(closePopup())
    dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Delivery Addresses list using string filters or page display
  }
}

export function createDeliveryAddress(value, reloadFilter) {
  return async dispatch => {
    await dispatch({
      type: AT.SETTINGS_CREATE_NEW_DELIVERY_ADDRESS,
      payload: api.createDeliveryAddress(value)
    })
    dispatch(closePopup())
    dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Delivery Addresses list using string filters or page display
  }
}

// export function deleteDeliveryAddressesItem(value, reloadFilter) {
//   return async dispatch => {
//     await dispatch({
//       type: AT.SETTINGS_DELETE_DELIVERY_ADDRESSES,
//       payload: api.deleteDeliveryAddresses(value)
//     })
//     dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Delivery Addresses list using string filters or page display
//   }
// }

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

export function getDocumentTypes() {
  return {
    type: AT.SETTINGS_GET_DOCUMENT_TYPES,
    payload: api.getDocumentTypes()
  }
}

export function loadFile(attachment) {
  return {
    type: AT.SETTINGS_LOAD_FILE,
    payload: api.loadFile(attachment)
  }
}

export function addAttachment(attachment, type, expirationDate) {
  return {
    type: AT.SETTINGS_ADD_ATTACHMENT,
    payload: api.addAttachment(attachment, type, expirationDate)
  }
}

export function removeAttachmentLink(isLot, itemId, aId) {
  return {
    type: AT.SETTINGS_REMOVE_ATTACHMENT_LINK,
    payload: api.removeAttachmentLink(itemId, aId)
  }
}

export function removeAttachment(aId) {
  return {
    type: AT.SETTINGS_REMOVE_ATTACHMENT,
    payload: api.removeAttachment(aId)
  }
}

export const addTab = (payload) => ({ type: AT.ADD_TAB, payload })

export const tabChanged = (tab) => ({ type: AT.TAB_CHANGED, payload: tab })