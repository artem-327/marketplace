import * as AT from './action-types'
import api from './api'
import { Datagrid } from '~/modules/datagrid'

export function handleActiveTab(tab, currentTab) {
  if (tab.type !== currentTab.type) Datagrid.clear()
  return {
    type: AT.PRODUCTS_HANDLE_ACTIVE_TAB,
    payload: { tab }
  }
}

export function openPopup(data) {
  return {
    type: AT.PRODUCTS_OPEN_POPUP,
    payload: { data }
  }
}

export function closeAddPopup() {
  return {
    type: AT.PRODUCTS_CLOSE_ADD_POPUP
  }
}

export function closePopup() {
  return {
    type: AT.PRODUCTS_CLOSE_POPUP
  }
}

export function openEditAltNamesCasPopup(value) {
  const data = {
    casIndexName: value.casIndexName,
    casNumber: value.casNumber,
    id: value.id
  }
  return {
    type: AT.PRODUCTS_OPEN_EDIT_2_POPUP,
    payload: { data }
  }
}

export function closeConfirmPopup() {
  return {
    type: AT.PRODUCTS_CLOSE_CONFIRM_POPUP
  }
}

export function getHazardClassesDataRequest() {
  return {
    type: AT.PRODUCTS_GET_HAZARD_CLASSES,
    payload: api.getHazardClasses()
  }
}

export function getPackagingGroupsDataRequest() {
  return {
    type: AT.PRODUCTS_GET_PACKAGING_GROUPS,
    payload: api.getPackagingGroups()
  }
}

export const deleteCasProduct = id => {
  return async dispatch => {
    await dispatch({
      type: AT.PRODUCTS_CAS_DELETE_PRODUCT,
      payload: api.deleteCasProduct(id)
    })
    Datagrid.removeRow(id)
  }
}

export function postNewCasProductRequest(values) {
  return async dispatch => {
    await dispatch({
      type: AT.PRODUCTS_POST_NEW_CAS_PRODUCT,
      payload: api.postNewCasProduct(values)
    })
    Datagrid.loadData()
    dispatch(closePopup())
    // Reload CAS Product list using filters
    // dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))
  }
}

export function updateCasProductRequest(id, values) {
  return async dispatch => {
    const editedCasProduct = await api.updateCasProduct(id, values)
    await dispatch({
      type: AT.PRODUCTS_UPDATE_CAS_PRODUCT,
      payload: editedCasProduct
    })
    dispatch(closePopup())
    Datagrid.updateRow(id, () => ({ ...values, id: id }))
    // Reload CAS Product list using filters
    // dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))
  }
}

export function closeEditPopup() {
  return {
    type: AT.PRODUCTS_CLOSE_EDIT_POPUP
  }
}

export function getAlternativeProductNames(value) {
  return {
    type: AT.PRODUCTS_GET_ALTERNATIVE_CAS_PRODUCT_NAMES,
    payload: api.getAlternativeProductNames(value)
  }
}

export function postNewProductName(productId, value) {
  return async dispatch => {
    await dispatch({
      type: AT.PRODUCTS_POST_NEW_PRODUCT_NAME,
      payload: api.postNewProductName(productId, value)
    })
    await dispatch(getAlternativeProductNames(productId))
  }
}

export function updateProductName(productId, id, value) {
  return async dispatch => {
    await dispatch({
      type: AT.PRODUCTS_UPDATE_PRODUCT_NAME,
      payload: api.updateProductName(id, value)
    })
    await dispatch(getAlternativeProductNames(productId))
  }
}

export function deleteProductName(productId, id) {
  return async dispatch => {
    await dispatch({
      type: AT.PRODUCTS_DELETE_PRODUCT_NAME,
      payload: api.deleteProductName(id)
    })
    await dispatch(getAlternativeProductNames(productId))
  }
}

export function openEditEchoProduct(id, editTab, force = false) {
  return async dispatch => {
    dispatch(editEchoProductChangeTab(editTab, force, { id }))
  }
}

export function editEchoProductChangeTab(editTab, force = false, data = null) {
  return {
    type: AT.PRODUCTS_EDIT_COMPANY_GENERIC_PRODUCT_CHANGE_TAB,
    payload: { editTab, force, data }
  }
}

export function openEditEchoAltNamesPopup(value) {
  const data = {
    name: value.name,
    code: value.code,
    id: value.id
  }
  return {
    type: AT.PRODUCTS_OPEN_EDIT_2_POPUP,
    payload: { ...data }
  }
}

export function deleteCompanyGenericProduct(echoProductId) {
  return {
    type: AT.PRODUCTS_DELETE_COMPANY_GENERIC_PRODUCT,
    async payload() {
      const response = await api.deleteCompanyGenericProduct(echoProductId)
      Datagrid.removeRow(echoProductId)
      return response
    }
  }
}

export const searchCasProduct = (pattern, index) => ({
  type: AT.PRODUCTS_SEARCH_CAS_PRODUCT,
  payload: api.searchCasProduct(pattern)
})

export function putCompanyGenericProducts(id, values) {
  return {
    type: AT.PRODUCTS_PUT_COMPANY_GENERIC_PRODUCT,
    payload: api.putCompanyGenericProducts(id, values)
  }
}

export function postCompanyGenericProducts(values) {
  return {
    type: AT.PRODUCTS_POST_COMPANY_GENERIC_PRODUCT,
    payload: api.postCompanyGenericProducts(values)
  }
}

export function searchManufacturers(text, limit = false) {
  return {
    type: AT.PRODUCTS_SEARCH_MANUFACTURERS,
    payload: api.searchManufacturers(text, limit)
  }
}

export function loadFile(attachment) {
  return {
    type: AT.PRODUCTS_LOAD_FILE,
    payload: api.loadFile(attachment)
  }
}

export function addAttachment(attachment, type, additionalParams = {}) {
  return {
    type: AT.PRODUCTS_ADD_ATTACHMENT,
    async payload() {
      const data = await api.addAttachment(attachment, type, additionalParams)
      return data
    }
  }
}

export function linkAttachment(isLot, echoId, attachmentIds) {
  return {
    type: AT.PRODUCTS_LINK_ATTACHMENT,
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

export function removeAttachmentLink(isLot, echoId, aId) {
  return {
    type: AT.PRODUCTS_REMOVE_ATTACHMENT_LINK,
    payload: api.removeAttachmentLink(echoId, aId)
  }
}

export function removeAttachment(aId) {
  return async dispatch => {
    await dispatch({ type: AT.PRODUCTS_REMOVE_ATTACHMENT, payload: api.removeAttachment(aId) })
  }
}

export function getCompanyGenericProduct(id) {
  return {
    type: AT.PRODUCTS_GET_COMPANY_GENERIC_PRODUCT,
    async payload() {
      const response = await api.getCompanyGenericProduct(id)
      Datagrid.updateRow(id, () => response.data)
      return response
    }
  }
}

export function loadEditEchoProduct(id, editTab) {
  return async dispatch => {
    // get newest data
    const response = await dispatch(getCompanyGenericProduct(id))
    let formData = {
      ...response.value.data
    }

    // mark attachments as linked
    if (formData.attachments) {
      formData.attachments = formData.attachments.map(att => {
        return {
          ...att,
          linked: true
        }
      })
    }
    await dispatch(editEchoProductChangeTab(editTab, false, formData))
  }
}

export function getUnNumbersByString(value) {
  return {
    type: AT.PRODUCTS_GET_UN_NUMBERS_BY_STRING,
    payload: api.getUnNumbersByString(value)
  }
}

export const searchTags = tag => ({
  type: AT.PRODUCTS_SEARCH_TAGS,
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

export const getDocumentTypes = () => ({ type: AT.PRODUCTS_GET_DOCUMENT_TYPES, payload: api.getDocumentTypes() })

export const searchMarketSegments = segment => ({
  type: AT.PRODUCTS_SEARCH_MARKET_SEGMENTS,
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

export function getAlternativeCompanyGenericProductsNames(value) {
  return {
    type: AT.PRODUCTS_GET_ALTERNATIVE_COMPANY_GENERIC_PRODUCT_NAMES,
    payload: api.getAlternativeCompanyGenericProductsNames(value)
  }
}

export function postNewCompanyGenericProductsAltName(productId, value) {
  return async dispatch => {
    await dispatch({
      type: AT.PRODUCTS_POST_NEW_COMPANY_GENERIC_PRODUCT_ALTERNATIVE_NAME,
      payload: api.postNewCompanyGenericProductsAltName(productId, value)
    })
    await dispatch(getAlternativeCompanyGenericProductsNames(productId))
  }
}

export function updateCompanyGenericProductsAltName(productId, id, value) {
  return async dispatch => {
    const response = await dispatch({
      type: AT.PRODUCTS_UPDATE_COMPANY_GENERIC_PRODUCT_ALTERNATIVE_NAME,
      payload: api.updateCompanyGenericProductsAltName(id, value)
    })
    await dispatch(getAlternativeCompanyGenericProductsNames(productId))
  }
}

export function deleteCompanyGenericProductsAltName(productId, id) {
  return async dispatch => {
    await dispatch({
      type: AT.PRODUCTS_DELETE_COMPANY_GENERIC_PRODUCT_ALTERNATIVE_NAME,
      payload: api.deleteCompanyGenericProductsAltName(id)
    })
    await dispatch(getAlternativeCompanyGenericProductsNames(productId))
  }
}

export function postProductGroups(request) {
  return {
    type: AT.PRODUCTS_GROUPS_CREATE,
    async payload() {
      const response = await api.postProductGroups(request)
      Datagrid.loadData()
      return response
    }
  }
}

export function putProductGroups(id, request) {
  return {
    type: AT.PRODUCTS_GROUPS_UPDATE,
    async payload() {
      const response = await api.putProductGroups(id, request)
      Datagrid.updateRow(id, () => response.data)
      return response
    }
  }
}

export function deleteProductGroups(id) {
  return {
    type: AT.PRODUCTS_GROUPS_DELETE,
    async payload() {
      await api.deleteProductGroups(id)
      Datagrid.loadData()
    }
  }
}
