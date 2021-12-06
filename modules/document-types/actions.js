import * as AT from './action-types'
import * as api from './api'
import Router from 'next/router'
import { Datagrid } from '~/modules/datagrid'

export function openPopup(data) {
  return {
    type: AT.DOCUMENT_TYPES_OPEN_POPUP,
    payload: data
  }
}

export function closePopup() {
  return {
    type: AT.DOCUMENT_TYPES_CLOSE_POPUP
  }
}

export function deleteDocumentType(id) {
  return {
    type: AT.DOCUMENT_TYPES_DELETE_DOCUMENT_TYPES_DATA,
    payload: api.deleteDocumentType(id)
  }
}

export function addDocumentType(values) {
  return {
    type: AT.DOCUMENT_TYPES_POST_DOCUMENT_TYPES_DATA,
    payload: api.addDocumentType(values)
  }
}

export function editDocumentType(id, values) {
  return {
    type: AT.DOCUMENT_TYPES_PUT_DOCUMENT_TYPES_DATA,
    payload: api.editDocumentType(values, id)
  }
}

export function handleFiltersValue(props, value) {
  return {
    type: AT.DOCUMENT_TYPES_HANDLE_FILTERS_VALUE,
    payload: value
  }
}

export function handleVariableSave(variable, value) {
  return {
    type: AT.DOCUMENT_TYPES_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}

export function getDocumentTypeGroupsByName(name) {
  return {
    type: AT.DOCUMENT_TYPES_GET_DOCUMENT_GROUPS_BY_NAME,
    payload: api.getDocumentTypeGroupsByName(name)
  }
}