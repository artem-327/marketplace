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
    Datagrid.updateRow(id, () => editedCasProduct)
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
    type: AT.PRODUCTS_EDIT_ECHO_PRODUCT_CHANGE_TAB,
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

export function deleteEchoProduct(echoProductId) {
  return {
    type: AT.PRODUCTS_DELETE_ECHO_PRODUCT,
    async payload() {
      const response = await api.deleteEchoProduct(echoProductId)
      Datagrid.removeRow(echoProductId)
      return response
    }
  }
}
