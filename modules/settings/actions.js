import * as AT from './action-types'
import api from './api'
import { Datagrid } from '~/modules/datagrid'

export const removeEmpty = obj =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      removeEmpty(val)
      // if (Object.entries(val).length === 0) delete obj[key]
    } else {
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

export function openSidebar(openTab = null) {
  return {
    type: AT.OPEN_SIDEBAR,
    payload: openTab
  }
}
export function closeSidebar(openTab = null) {
  return {
    type: AT.CLOSE_SIDEBAR,
    payload: openTab
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
      const data = await api.dwollaInitiateVerification(id)

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

export function dwollaSetPreferred(id) {
  return async dispatch => {
    await dispatch({
      type: AT.DWOLLA_SET_PREFERRED,
      payload: api.dwollaSetPreferred(id)
    })
    dispatch(getCurrentUser())
  }
}

export function getCurrentUser() {
  return {
    type: AT.GET_CURRENT_USER_DATA,
    payload: api.getCurrentUser()
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
      type: AT.SETTINGS_CLOSE_IMPORT_POPUP
    })
    dispatch({
      type: AT.SETTINGS_CLOSE_IMPORT_POPUP_FULFILLED
    })
    Datagrid.loadData()
    //dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Products list using string filters or page display
  }
}

export function closeImportPopupCancel() {
  return {
    type: AT.SETTINGS_CLOSE_IMPORT_POPUP_FULFILLED
  }
}

export function openUploadDocumentsPopup() {
  return {
    type: AT.SETTINGS_OPEN_UPLOAD_DOCUMENTS_POPUP
  }
}
export function closeUploadDocumentsPopup() {
  return {
    type: AT.SETTINGS_CLOSE_UPLOAD_DOCUMENTS_POPUP
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
    //removeEmpty(payload)
    try {
      const response = await api.patchUser(id, payload)
      dispatch({
        type: AT.HANDLE_SUBMIT_USER_EDIT_POPUP,
        payload: response
      })
      Datagrid.updateRow(id, () => response.data)

      dispatch(closePopup())
    } catch (e) {
      // TODO
      console.error(e)
    }
  }
}
export function putNewUserRoleRequest(payload, id) {
  // return dispatch => ({
  //   type: AT.PUT_NEW_USER_ROLES_REQUEST,
  //   async payload() {
  //     const response = await api.patchUserRole(id, roles)
  //     dispatch(closeRolesPopup())
  //     return response
  //   }
  // })
  return async dispatch => {
    await dispatch({
      type: AT.PUT_NEW_USER_ROLES_REQUEST,
      async payload() {
        const response = await api.patchUserRole(id, payload)
        Datagrid.updateRow(id, () => response.data)
        return response
      }
    })
    dispatch(closeRolesPopup())
    //dispatch(getUsersDataRequest())
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

export function changeHeadersCSV(mappedHeaders, missingRequired) {
  return {
    type: AT.CHANGE_HEADERS_CSV,
    payload: { mappedHeaders, missingRequired }
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

export const deleteBranch = id => ({
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

export const deleteBankAccount = id => ({
  type: AT.DELETE_BANK_ACCOUNT,
  async payload() {
    const response = await api.deleteBankAccount(id)
    Datagrid.removeRow(id)
    return response
  }
})

export const deleteDeliveryAddress = id => ({
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
//////////////////////
export function putEditWarehouse(payload, id, attachmentFiles) {
  return async dispatch => {
    const response = await api.putWarehouse(id, payload)
    await dispatch({
      type: AT.PUT_WAREHOUSE_EDIT_POPUP,
      payload: response
    })
    if (attachmentFiles && attachmentFiles.length) {
      attachmentFiles.forEach(attachment => {
        dispatch({
          type: AT.ATTACHMENT_LINKS_TO_BRANCH,
          payload: api.attachmentLinksToBranch(attachment.id, id)
        })
      })
    }
    dispatch(closeSidebar())
    Datagrid.updateRow(id, () => response)
  }
}

///////////////////
export function postNewWarehouseRequest(payload, attachmentFiles) {
  return async dispatch => {
    const newWarehouse = await dispatch({
      type: AT.POST_NEW_WAREHOUSE_REQUEST,
      payload: api.postNewWarehouse(payload)
    })
    if (attachmentFiles && attachmentFiles.length) {
      attachmentFiles.forEach(attachment => {
        dispatch({
          type: AT.ATTACHMENT_LINKS_TO_BRANCH,
          payload: api.attachmentLinksToBranch(attachment.id, newWarehouse.value.data.id)
        })
      })
    }
    //dispatch(getWarehousesDataRequest())
    dispatch(closeSidebar())
    Datagrid.loadData()
  }
}

export function handleSubmitProductEditPopup(payload, id) {
  return async dispatch => {
    //removeEmpty(payload)
    const response = await api.updateProduct(id, payload)
    dispatch({
      type: AT.SETTINGS_UPDATE_PRODUCT_CATALOG,
      payload: response
    })
    if (payload.attachments && payload.attachments.length) {
      for (let i = 0; i < payload.attachments.length; i++) {
        dispatch({
          type: AT.SETTINGS_POST_LINK_ATTACHMENT,
          payload: api.postLinkAttachment(payload.attachments[i].id, id)
        })
      }
    }
    dispatch(closePopup())
    Datagrid.loadData()
  }
}

export function handleAddNewWarehousePopup() {
  return {
    type: AT.POST_NEW_WAREHOUSE_POPUP
  }
}

export function getUsersDataRequest() {
  return dispatch => {
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
          type: AT.GET_CURRENT_USER_DATA_FULFILLED,
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
  return dispatch => {
    dispatch({
      type: AT.GET_WAREHOUSES_DATA,
      async payload() {
        const [warehouses, country] = await Promise.all([api.getWarehouses(), api.getCountry()])
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
  return dispatch => {
    dispatch({
      type: AT.GET_BRANCHES_DATA,
      async payload() {
        const [branches, country] = await Promise.all([api.getBranches(), api.getCountry()])
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
    const creditCardsData = [
      // TODO - temporary fake function
      {
        id: '3',
        cardNumber: '15',
        last4: '7891',
        expMonth: 8,
        expYear: 21,
        cvcCheck: '123'
      },
      {
        id: '2',
        cardNumber: '75',
        last4: '4569',
        expMonth: 5,
        expYear: 19,
        cvcCheck: '951'
      },
      {
        id: '8',
        cardNumber: '9849',
        last4: '123',
        expMonth: 5,
        expYear: 21,
        cvcCheck: '753'
      }
    ]

    dispatch({
      type: AT.GET_CREDIT_CARDS_DATA,
      async payload() {
        return creditCardsData
      }
    })
  }
}

export function getProductsCatalogRequest(data) {
  return dispatch => {
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
  return dispatch => {
    dispatch({
      type: AT.GET_BANK_ACCOUNTS_DATA,
      async payload() {
        const [
          bankAccountsData,
          country
          // currency
        ] = await Promise.all([
          api.getBankAccountsData(),
          api.getCountry()
          // api.getCurrencies(),
        ])
        const newCountryFormat = country.map(country => {
          return {
            text: country.name,
            value: country.id
          }
        })
        // const newCurrencyFormat = currency.map(currency => {
        //   return {
        //     text: currency.code,
        //     value: currency.id
        //   }
        // })
        return {
          bankAccountsData,
          newCountryFormat
          // newCurrencyFormat
        }
      }
    })
  }
}

export function getDwollaAccBalance() {
  return {
    type: AT.SETTINGS_GET_DWOLLA_BALANCE,
    payload: api.getDwollaAccBalance()
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
    //removeEmpty(payload)
    await dispatch({
      type: AT.POST_NEW_USER_REQUEST,
      payload: api.postNewUser(payload)
    })
    //dispatch(getUsersDataRequest())
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

export function userSwitchEnableDisable(id) {
  return {
    type: AT.USER_SWITCH_ENABLE_DISABLE,
    payload: api.userSwitchEnableDisable(id)
  }
}

export function handleSubmitProductAddPopup(payload) {
  return async dispatch => {
    //removeEmpty(payload)
    const newProd = await dispatch({
      type: AT.SETTINGS_POST_NEW_PRODUCT_REQUEST,
      payload: api.postNewProduct(payload)
    })
    if (payload.attachments && payload.attachments.length) {
      for (let i = 0; i < payload.attachments.length; i++) {
        dispatch({
          type: AT.SETTINGS_POST_LINK_ATTACHMENT,
          payload: api.postLinkAttachment(payload.attachments[i].id, newProd.value.data.id)
        })
      }
    }
    dispatch(closePopup())
  }
}

export function postNewBankAccountRequest(payload) {
  return {
    type: AT.POST_NEW_BANK_ACCOUNT_REQUEST,
    async payload() {
      const { data } = await api.postNewBankAccount(payload)
      Datagrid.loadData()
      return data
    }
  }
}

export function putBankAccountRequest(account, id) {
  return {
    // ! ! missing in saga
    type: AT.PUT_BANK_ACCOUNT_EDIT_POPUP,
    async payload() {
      Datagrid.updateRow(id, () => account)
      return account
    },
    id
  }
}

export function deleteCreditCard(cardId) {
  return {
    // ! ! saga calls api.deleteWarehouse ???
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

export function getCSVMapEchoProduct() {
  return {
    type: AT.GET_CSV_MAP_ECHO_PRODUCT,
    payload: api.getCSVMapEchoProduct()
  }
}

export function getCSVMapProductOffer() {
  return {
    type: AT.GET_CSV_MAP_PRODUCT_OFFER,
    payload: api.getCSVMapProductOffer()
  }
}

export function postCSVMapEchoProduct(payload) {
  return {
    type: AT.POST_CSV_MAP_ECHO_PRODUCT,
    payload: api.postCSVMapEchoProduct(payload)
  }
}

export function putCSVMapEchoProduct(mapId, data) {
  return {
    type: AT.PUT_CSV_MAP_ECHO_PRODUCT,
    payload: api.putCSVMapEchoProduct(mapId, data)
  }
}

export function deleteCSVMapEchoProduct(mapId) {
  return {
    type: AT.DELETE_CSV_MAP_ECHO_PRODUCT,
    meta: mapId,
    payload: api.deleteCSVMapEchoProduct(mapId)
  }
}

export function postCSVMapProductOffer(payload) {
  return {
    type: AT.POST_CSV_MAP_PRODUCT_OFFER,
    payload: api.postCSVMapProductOffer(payload)
  }
}

export function putCSVMapProductOffer(mapId, data) {
  return {
    type: AT.PUT_CSV_MAP_PRODUCT_OFFER,
    payload: api.putCSVMapProductOffer(mapId, data)
  }
}

export function deleteCSVMapProductOffer(mapId) {
  return {
    type: AT.DELETE_CSV_MAP_PRODUCT_OFFER,
    meta: mapId,
    payload: api.deleteCSVMapProductOffer(mapId)
  }
}

export function handleSaveMapCSV() {
  return {
    type: AT.SAVE_MAP_CSV
  }
}

export function handleChangeMapCSVName(payload) {
  return {
    type: AT.CHANGE_MAP_CSV_NAME,
    payload
  }
}

export function postImportProductCSV(payload, id) {
  return {
    type: AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS,
    payload: api.postImportProductCSV(payload, id)
  }
}

export function postImportEchoProductCSV(payload, id) {
  return {
    type: AT.SETTINGS_POST_CSV_IMPORT_ECHO_PRODUCTS,
    payload: api.postImportEchoProductCSV(payload, id)
  }
}

export function postImportProductOfferCSV(payload, id) {
  return {
    type: AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS_OFFER,
    payload: api.postImportProductOfferCSV(payload, id)
  }
}

export function selectSavedMap(payload) {
  return {
    type: AT.SELECT_SAVED_MAP,
    payload
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
    const response = await api.updateDeliveryAddresses(id, value)
    dispatch({
      type: AT.SETTINGS_UPDATE_DELIVERY_ADDRESSES,
      payload: response
    })
    dispatch(closePopup())
    Datagrid.updateRow(id, () => response.data)
    return response.data
    //dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Delivery Addresses list using string filters or page display
  }
}

export function createDeliveryAddress(value, reloadFilter) {
  return async dispatch => {
    const response = await api.createDeliveryAddress(value)
    await dispatch({
      type: AT.SETTINGS_CREATE_NEW_DELIVERY_ADDRESS,
      payload: response
    })
    dispatch(closePopup())
    Datagrid.loadData()
    return response.data
    //dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))  // Reload Delivery Addresses list using string filters or page display
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

export function addVerificationDocument(attachment, type) {
  return {
    type: AT.SETTINGS_ADD_VERIFICATION_DOCUMENT,
    async payload() {
      return await api.addVerificationDocument(attachment, type)
    }
  }
}

export function addAttachment(attachment, type, expirationDate) {
  return {
    type: AT.SETTINGS_ADD_ATTACHMENT,
    async payload() {
      const data = await api.addAttachment(attachment, type, expirationDate)
      Datagrid && Datagrid.loadData()
      return data
    }
  }
}

export function removeAttachmentLink(isLot, itemId, aId) {
  return {
    type: AT.SETTINGS_REMOVE_ATTACHMENT_LINK,
    payload: api.removeAttachmentLink(itemId, aId)
  }
}

export function removeAttachmentLinkCompanyProduct(itemId, aId) {
  return {
    type: AT.SETTINGS_REMOVE_ATTACHMENT_LINK_PRODUCT,
    payload: api.removeAttachmentLinkCompanyProduct(itemId, aId)
  }
}

export function removeAttachment(aId) {
  return {
    type: AT.SETTINGS_REMOVE_ATTACHMENT,
    payload: api.removeAttachment(aId)
  }
}

export const addTab = payload => ({ type: AT.ADD_TAB, payload })

export const tabChanged = tab => ({ type: AT.TAB_CHANGED, payload: tab })

export const resendWelcomeEmail = userId => ({
  type: AT.SETTINGS_RESEND_WELCOME_EMAIL,
  payload: api.resendWelcomeEmail(userId)
})

export const getLogisticsProviders = () => ({ type: AT.GET_LOGISTICS_PROVIDERS, payload: api.getLogisticsProviders() })

export const createLogisticsAccount = payload => ({
  type: AT.CREATE_LOGISTICS_ACCOUNT,
  payload: api.createLogisticsAccount(payload)
})

export const getLogisticsAccounts = () => ({ type: AT.GET_LOGISTICS_ACCOUNTS, payload: api.getLogisticsAccounts() })

export const updateLogisticsAccount = (id, payload) => ({
  type: AT.UPDATE_LOGISTICS_ACCOUNT,
  payload: api.updateLogisticsAccount(id, payload)
})

export const deleteLogisticsAccount = id => ({
  type: AT.DELETE_LOGISTICS_ACCOUNT,
  payload: api.deleteLogisticsAccount(id)
})

export const resetSettings = () => ({ type: AT.RESET_SETTINGS, payload: true })

// export const getSettings = role => ({ type: AT.GET_SETTINGS, payload: api.getSettings(role) })

// export const updateSettings = (role, payload) => ({ type: AT.UPDATE_SETTINGS, payload: api.updateSettings(role, payload) })

export const triggerSystemSettingsModal = (force = null) => ({ type: AT.TRIGGER_SYSTEM_SETTINGS_MODAL, payload: force })

export const getBusinessClassifications = () => ({
  type: AT.GET_BUSINESS_CLASSIFICATIONS,
  payload: api.getBusinessClassifications()
})

export const triggerAgreementModal = (force = null, modalProps = {}) => ({
  type: AT.TRIGGER_AGREEMENT_MODAL,
  payload: { force, modalProps }
})

export const getVerificationDocumentTypes = () => ({
  type: AT.SETTINGS_GET_VERIFICATION_DOCUMENT_TYPES,
  payload: api.getVerificationDocumentTypes()
})

export const getLanguages = () => ({ type: AT.GET_LANGUAGES, payload: api.getLanguages() })

export const setPreferredLanguage = lang => ({
  type: AT.SET_PREFERRED_LANGUAGE,
  payload: api.setPreferredLanguage(lang)
})

export const searchEchoProducts = (searchQuery, limit = 30) => ({
  type: AT.SEARCH_ECHO_PRODUCTS,
  payload: api.searchEchoProducts(searchQuery, limit)
})

export const getNmfcNumbersByString = value => ({
  type: AT.SEARCH_NMFC_NUMBERS,
  payload: api.getNmfcNumbersByString(value)
})

export const addNmfcNumber = value => ({ type: AT.ADD_NMFC_NUMBERS, payload: value })

export function removeAttachmentLinkToBranch(attachmentId, branchId) {
  return {
    type: AT.REMOVE_ATTACHMENT_LINK_TO_BRANCH,
    async payload() {
      return await api.removeAttachmentLinkToBranch(attachmentId, branchId)
    }
  }
}

export const getBranch = branchId => ({
  type: AT.GET_BRANCH,
  payload: api.getBranch(branchId)
})
