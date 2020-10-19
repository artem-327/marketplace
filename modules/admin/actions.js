import * as AT from './action-types'
import * as api from './api'
import { updateIdentity } from '~/modules/auth/actions'
import { Datagrid } from '~/modules/datagrid'

import Router from 'next/router'

export const removeEmpty = obj =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      removeEmpty(val)
      if (Object.entries(val).length === 0) delete obj[key]
    } else {
      if (val == null) delete obj[key]
      else if (typeof val === 'string') {
        if (val.trim() === '') delete obj[key]
        else obj[key] = val.trim()
      }
    }
  })

export function openEditPopup(editedData) {
  return {
    type: AT.ADMIN_OPEN_EDIT_POPUP,
    payload: editedData
  }
}

export function closeEditPopup() {
  return {
    type: AT.ADMIN_CLOSE_EDIT_POPUP
  }
}

export function openAddPopup(currentTab) {
  return {
    type: AT.ADMIN_OPEN_ADD_POPUP,
    payload: currentTab
  }
}
export function closeAddPopup() {
  return {
    type: AT.ADMIN_CLOSE_ADD_POPUP
  }
}

// export function handleOpenConfirmPopup(id) {
// 	return {
// 		type: AT.ADMIN_OPEN_CONFIRM_POPUP,
// 		payload: id
// 	}
// }

export function deleteConfirmation(id, config = null) {
  if (config != null) {
    if (typeof config.api.delete !== 'undefined') {
      return async dispatch => {
        await dispatch({
          type: config.api.delete.typeRequest,
          payload: api.deleteItem(config, id)
        })
        Datagrid.removeRow(id)
      }
    }
  } else {
    return {
      type: AT.ADMIN_DELETE_CONFIRM_POPUP
    }
  }
}
export function confirmationSuccess() {
  return {
    type: AT.ADMIN_CONFIRM_SUCCESS
  }
}

export function closeConfirmPopup() {
  return {
    type: AT.ADMIN_CLOSE_CONFIRM_POPUP
  }
}

export function getDataRequest(config, values = null) {
  return {
    type: config.api.get.typeRequest,
    payload: api.getDataRequest(config, values)
  }
}

export function postNewRequest(config, values) {
  return async dispatch => {
    await dispatch({
      type: config.api.post.typeRequest,
      payload: api.postNewRequest(config, values)
    })
    Datagrid.loadData()
    dispatch(closePopup())
  }
}

export function postDwollaAccount(values, companyId) {
  return {
    type: AT.ADMIN_CREATE_DWOLLA_ACCOUNT,
    payload: api.postNewDwollaAccount(values, companyId)
  }
}

export function putEditedDataRequest(config, id, values) {
  return async dispatch => {
    const editedItem = await api.putEditedDataRequest(config, values, id)

    dispatch({
      type: config.api.update.typeRequest,
      payload: editedItem
    })
    Datagrid.updateRow(id, () => editedItem)
    dispatch(closePopup())
  }
}

export function handleFiltersValue(props, value) {
  return async dispatch => {
    // save filter value
    await dispatch({
      type: AT.ADMIN_HANDLE_FILTERS_VALUE,
      payload: value
    })

    switch (props.currentTab) {
      case 'CAS Products':
        {
          // if (value.trim().length < 3) {
          // 	await dispatch({
          // 		type: AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER,
          // 		payload: api.getCasProductByFilter(value, props.casListDataRequest)
          // 	})
          // } else {
          await dispatch({
            type: AT.ADMIN_GET_CAS_PRODUCT_BY_STRING,
            payload: api.getCasProductByString(value)
          })
          // }
        }
        break
      case 'manufacturers':
        {
          await dispatch({
            type: AT.ADMIN_GET_MANUFACTURERS_BY_STRING,
            payload: api.getManufacturersByString(value)
          })
        }
        // case 'Companies':
        // 	await dispatch({
        // 		type: AT.ADMIN_GET_COMPANIES,
        // 		payload: api.getCompanies({
        // 			...props.companyListDataRequest,
        // 			filters: [{
        // 				operator: "LIKE",
        // 				path: "Company.name",
        // 				values: ['%' + value + '%']
        // 			}]
        // 		})
        // 	})
        break
    }
  }
}

export function getHazardClassesDataRequest() {
  return {
    type: AT.ADMIN_GET_HAZARD_CLASSES,
    payload: api.getHazardClasses()
  }
}

export function getPackagingGroupsDataRequest() {
  return {
    type: AT.ADMIN_GET_PACKAGING_GROUPS,
    payload: api.getPackagingGroups()
  }
}

export function getMeasureTypesDataRequest() {
  return {
    type: AT.ADMIN_GET_MEASURE_TYPES,
    payload: api.getMeasureTypes()
  }
}

export function getAllUnNumbersDataRequest() {
  return {
    type: AT.ADMIN_GET_UN_NUMBERS,
    payload: api.getAllUnNumbers()
  }
}

export function getUnNumbersByString(value) {
  return {
    type: AT.ADMIN_GET_UN_NUMBERS_BY_STRING,
    payload: api.getUnNumbersByString(value)
  }
}

// export function casDeleteItem(value, reloadFilter) {
// 	return async dispatch => {
// 		await dispatch({
// 			type: AT.ADMIN_DELETE_CAS_PRODUCT,
// 			payload: api.deleteCasProduct(value)
// 		})
// 		// Reload CAS Product list using filters
// 		// dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))
// 	}
// }

export function getCountries() {
  return (dispatch, getState) => {
    const { admin } = getState()
    admin.countries.length === 0 &&
      dispatch({
        type: AT.ADMIN_GET_COUNTRIES,
        async payload() {
          const countries = await api.getCountries()

          return { countries }
        }
      })
  }
}

export function getPrimaryBranchProvinces(id) {
  return {
    type: AT.ADMIN_GET_PRIMARY_BRANCH_PROVINCES,
    payload: api.getProvinces(id)
  }
}

export function getMailingBranchProvinces(id) {
  return {
    type: AT.ADMIN_GET_MAILING_BRANCH_PROVINCES,
    payload: api.getProvinces(id)
  }
}

export function getCompany(params) {
  return {
    type: AT.ADMIN_GET_FULL_COMPANY,
    payload: api.getCompany(params)
  }
}

/*
export function getCompany(id) {
	return {
		type: AT.ADMIN_GET_COMPANY,
		payload: api.getCompany(id)
	}
}
*/

export function udpateEnabled(id, enabled) {
  return {
    type: AT.ADMIN_ENABLED_COMPANY,
    payload: api.udpateEnabled(id, enabled)
  }
}

export function searchUnNumber(pattern) {
  return {
    type: AT.ADMIN_SEARCH_UN_NUMBER,
    payload: api.searchUnNumber(pattern)
  }
}

export function searchManufacturers(text, limit = false) {
  return {
    type: AT.ADMIN_SEARCH_MANUFACTURERS,
    payload: api.searchManufacturers(text, limit)
  }
}

export function prepareSearchedCasProducts(elements) {
  return {
    type: AT.ADMIN_PREPARE_CAS_PRODUCTS,
    payload: {
      elements
    }
  }
}

export function getProductsCatalogRequest() {
  return dispatch => {
    dispatch({
      type: AT.ADMIN_GET_PRODUCTS_CATALOG_DATA,
      async payload() {
        const [hazardClasses, packagingGroups] = await Promise.all([api.getHazardClasses(), api.getPackagingGroups()])
        return {
          hazardClasses: hazardClasses,
          packagingGroups: packagingGroups
        }
      }
    })
  }
}

export function editEchoProductChangeTab(editTab, force = false, data = null) {
  return {
    type: AT.ADMIN_EDIT_COMPANY_GENERIC_PRODUCT_CHANGE_TAB,
    payload: { editTab, force, data }
  }
}

export function openEditEchoProduct(id, editTab, force = false) {
  return async dispatch => {
    dispatch(editEchoProductChangeTab(editTab, force, { id }))
  }
}

export function openRegisterDwollaAccount(data) {
  return async dispatch => {
    dispatch(getCompany(data.id))
    dispatch(registerDwollaAccount(data))
  }
}

export function registerDwollaAccount(data) {
  return {
    type: AT.ADMIN_OPEN_REGISTER_DWOLLA_ACCOUNT_POPUP,
    payload: data
  }
}

export function closeRegisterDwollaAccount() {
  return {
    type: AT.ADMIN_CLOSE_REGISTER_DWOLLA_ACCOUNT_POPUP
  }
}

export function openPopup(data) {
  return {
    type: AT.ADMIN_OPEN_POPUP,
    payload: { data }
  }
}

export function closePopup() {
  return {
    type: AT.ADMIN_CLOSE_POPUP
  }
}

export const deleteUnit = id => {
  return async dispatch => {
    await dispatch({
      type: AT.ADMIN_DELETE_UNIT,
      payload: api.deleteUnit(id)
    })
    Datagrid.removeRow(id)
  }
}

export const deleteUnitOfPackaging = id => {
  return async dispatch => {
    await dispatch({
      type: AT.ADMIN_DELETE_UNIT_OF_PACKAGING,
      payload: api.deleteUnitOfPackaging(id)
    })
    Datagrid.removeRow(id)
  }
}

export function getAddressSearchPrimaryBranch(body) {
  return {
    type: AT.ADMIN_GET_ADDRESSES_SEARCH_PRIMARY_BRANCH,
    payload: api.getAddressSearch(body)
  }
}

export function getAddressSearchMailingBranch(body) {
  return {
    type: AT.ADMIN_GET_ADDRESSES_SEARCH_MAILING_BRANCH,
    payload: api.getAddressSearch(body)
  }
}

export const takeOverCompanyFinish = () => {
  return async dispatch => {
    let payload = await api.takeOverCompanyFinish()
    await dispatch(updateIdentity(payload))
    Router.push('/companies/companies')
  }
}

export const reviewRequest = companyId => {
  return {
    type: AT.ADMIN_REVIEW_REQUESTED,
    payload: api.reviewRequest(companyId)
  }
}

export function loadFile(attachment) {
  return {
    type: AT.ADMIN_LOAD_FILE,
    payload: api.loadFile(attachment)
  }
}

export function addAttachment(attachment, type, additionalParams = {}) {
  return {
    type: AT.ADMIN_ADD_ATTACHMENT,
    async payload() {
      const data = await api.addAttachment(attachment, type, additionalParams)
      return data
    }
  }
}

export function linkAttachment(isLot, echoId, attachmentIds) {
  return {
    type: AT.ADMIN_LINK_ATTACHMENT,
    async payload() {
      if (Array.isArray(attachmentIds)) {
        async function asyncForEach(array, callback) {
          for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array)
          }
        }

        await asyncForEach(attachmentIds, async (attachment, index) => {
          await api.linkAttachment(echoId, attachment.id)
        })
      } else {
        await api.linkAttachment(echoId, attachmentIds)
      }

      return true
    }
  }
}

export function removeAttachment(aId) {
  return async dispatch => {
    await dispatch({ type: AT.ADMIN_REMOVE_ATTACHMENT, payload: api.removeAttachment(aId) })
  }
}

export function removeAttachmentLink(isLot, echoId, aId) {
  return {
    type: AT.ADMIN_REMOVE_ATTACHMENT_LINK,
    payload: api.removeAttachmentLink(echoId, aId)
  }
}

export const getDocumentTypes = () => ({ type: AT.ADMIN_GET_DOCUMENT_TYPES, payload: api.getDocumentTypes() })

export const addUnNumber = payload => ({ type: AT.ADMIN_ADD_UN_NUMBER, payload })

export const getCompanyDetails = id => ({ type: AT.ADMIN_GET_COMPANY_DETAILS, payload: api.getCompanyDetails(id) })

export const addNmfcNumber = nmfc => {
  return async dispatch => {
    await dispatch({ type: AT.ADD_NMFC_NUMBER, payload: api.addNmfcNumber(nmfc) })
    Datagrid.loadData()
  }
}

export const editNmfcNumber = nmfc => {
  return async dispatch => {
    await dispatch({ type: AT.EDIT_NMFC_NUMBER, payload: api.editNmfcNumber(nmfc) })
    Datagrid.updateRow(nmfc.id, () => nmfc)
  }
}

export const deleteNmfcNumber = id => {
  return async dispatch => {
    await dispatch({ type: AT.DELETE_NMFC_NUMBER, payload: api.deleteNmfcNumber(id) })
    Datagrid.removeRow(id)
  }
}

export const getUsersMe = () => ({ type: AT.ADMIN_GET_USERS_ME, payload: api.getUsersMe() })

export const getUser = id => ({ type: AT.ADMIN_GET_USER, payload: api.getUser(id) })

export const userSwitchEnableDisable = (id, row) => {
  Datagrid.updateRow(id, () => ({ ...row, enabled: !row.enabled }))
  return { type: AT.ADMIN_USER_SWITCH_ENABLE_DISABLE, payload: api.userSwitchEnableDisable(id) }
}

export const postNewUserRequest = data => ({
  type: AT.ADMIN_POST_NEW_USER,
  payload: api.postNewUserRequest(data)
})

export const submitUserEdit = (id, data) => ({
  type: AT.ADMIN_EDIT_USER,
  payload: api.submitUserEdit(id, data)
})

export const deleteUser = id => ({
  type: AT.ADMIN_DELETE_USER,
  payload: api.deleteUser(id)
})

export const getUserRoles = () => ({
  type: AT.ADMIN_GET_ROLES,
  payload: api.getUserRoles()
})

export const getAdminRoles = () => ({
  type: AT.ADMIN_GET_ADMIN_ROLES,
  payload: api.getAdminRoles()
})

export const searchCompany = (companyText, limit) => ({
  type: AT.ADMIN_SEARCH_COMPANY,
  payload: api.searchCompany(companyText, limit)
})

export const initSearchCompany = id => ({
  type: AT.ADMIN_INIT_SEARCH_COMPANY,
  payload: api.getCompanyInfo(id)
})

export const searchTags = tag => ({
  type: AT.ADMIN_SEARCH_TAGS,
  payload: api.searchTags({
    orFilters: [
      {
        operator: 'LIKE',
        path: 'Tag.name',
        values: [tag.toString()]
      }
    ],
    pageNumber: 0,
    pageSize: 50
  })
})

export const searchMarketSegments = segment => ({
  type: AT.ADMIN_SEARCH_MARKET_SEGMENTS,
  payload: api.searchMarketSegments({
    orFilters: [
      {
        operator: 'LIKE',
        path: 'MarketSegment.name',
        values: [segment.toString()]
      }
    ],
    pageNumber: 0,
    pageSize: 50
  })
})

export const searchSellMarketSegments = segment => ({
  type: AT.ADMIN_SEARCH_SELL_MARKET_SEGMENTS,
  payload: api.searchMarketSegments({
    orFilters: [
      {
        operator: 'LIKE',
        path: 'MarketSegment.name',
        values: [segment.toString()]
      }
    ],
    pageNumber: 0,
    pageSize: 50
  })
})

export const searchBuyMarketSegments = segment => ({
  type: AT.ADMIN_SEARCH_BUY_MARKET_SEGMENTS,
  payload: api.searchMarketSegments({
    orFilters: [
      {
        operator: 'LIKE',
        path: 'MarketSegment.name',
        values: [segment.toString()]
      }
    ],
    pageNumber: 0,
    pageSize: 50
  })
})

export function handleVariableSave(variable, value) {
  return {
    type: AT.ADMIN_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}

export const getLogisticsProviders = () => ({
  type: AT.ADMIN_GET_LOGISTICS_PROVIDERS,
  payload: api.getLogisticsProviders()
})

export const postNewLogisticsProvider = data => ({
  type: AT.ADMIN_POST_NEW_LOGISTICS_PROVIDER,
  payload: api.postNewLogisticsProvider(data)
})

export const updateLogisticsProvider = (id, data) => ({
  type: AT.ADMIN_EDIT_LOGISTICS_PROVIDER,
  payload: api.updateLogisticsProvider(id, data)
})

export const deleteLogisticsProvider = id => ({
  type: AT.ADMIN_DELETE_LOGISTICS_PROVIDER,
  payload: api.deleteLogisticsProvider(id)
})