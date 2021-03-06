import * as AT from './action-types'
import * as api from './api'
import Router from 'next/router'
import { Datagrid } from '~/modules/datagrid'

export function closePopup() {
  return {
    type: AT.MARKET_SEGMENTS_CLOSE_POPUP
  }
}

export function getDataRequest(config, values = null) {
  return {
    type: config.api.get.typeRequest,
    payload: api.getDataRequest(config, values)
  }
}

export function openEditPopup(editedData) {
  return {
    type: AT.MARKET_SEGMENTS_OPEN_EDIT_POPUP,
    payload: editedData
  }
}

export function closeConfirmPopup() {
  return {
    type: AT.MARKET_SEGMENTS_CLOSE_CONFIRM_POPUP
  }
}
export function deleteConfirmation(id) {
  return async dispatch => {
    await dispatch({
      type: AT.MARKET_SEGMENTS_DELETE_MARKET_SEGMENTS_DATA,
      payload: api.deleteItem(id)
    })
    Datagrid.removeRow(id)
  }
}

export function closeAddPopup() {
  return {
    type: AT.MARKET_SEGMENTS_CLOSE_ADD_POPUP
  }
}
export function postNewRequest(values) {
  return async dispatch => {
    const newItem = await api.postNewRequest(values)
    await dispatch({
      type: AT.MARKET_SEGMENTS_POST_MARKET_SEGMENTS_DATA,
      payload: newItem
    })
    Datagrid.loadData()
    dispatch(closePopup())
  }
}

export function closeEditPopup() {
  return {
    type: AT.MARKET_SEGMENTS_CLOSE_EDIT_POPUP
  }
}
export function putEditedDataRequest(id, values) {
  return async dispatch => {
    const editedItem = await api.putEditedDataRequest(values, id)
    await dispatch({
      type: AT.MARKET_SEGMENTS_PUT_MARKET_SEGMENTS_DATA,
      payload: editedItem
    })
    // Datagrid.updateRow(id, () => editedItem)
    Datagrid.loadData()
    dispatch(closePopup())
  }
}

export function openPopup(data) {
  return {
    type: AT.MARKET_SEGMENTS_OPEN_POPUP,
    payload: { data }
  }
}

export function handleFiltersValue(props, value) {
  return async dispatch => {
    // save filter value
    await dispatch({
      type: AT.MARKET_SEGMENTS_HANDLE_FILTERS_VALUE,
      payload: value
    })
  }
}

export function handleVariableSave(variable, value) {
  return {
    type: AT.MARKET_SEGMENTS_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}