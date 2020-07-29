import * as AT from './action-types'
import api from './api'
import { Datagrid } from '~/modules/datagrid'

export function openPopup(data = null) {
  return {
    type: AT.GUESTS_OPEN_POPUP,
    payload: data
  }
}

export function closePopup() {
  return {
    type: AT.GUESTS_CLOSE_POPUP,
    payload: null
  }
}

export const tabChanged = tab => {
  Datagrid && Datagrid.clear()
  return { type: AT.GUESTS_TAB_CHANGED, payload: tab }
}

export const handleCompanyEditTab = tab => {
  return { type: AT.GUESTS_COMPANY_EDIT_TAB_CHANGED, payload: tab }
}

export function deleteClientCompany(id) {
  return {
    type: AT.GUESTS_DELETE_CLIENT_COMPANY,
    payload: api.deleteClientCompany(id)
  }
}

export function openCompanyEdit(data = null) {
  return {
    type: AT.GUESTS_OPEN_COMPANY_EDIT,
    payload: data
  }
}

export function closeCompanyEdit() {
  return {
    type: AT.GUESTS_CLOSE_COMPANY_EDIT,
    payload: null
  }
}

export function getDocumentTypes() {
  return {
    type: AT.GUESTS_GET_DOCUMENT_TYPES,
    payload: api.getDocumentTypes()
  }
}

export function deleteDocument(id) {
  return {
    type: AT.GUESTS_GET_DOCUMENT_TYPES,
    payload: api.getDocumentTypes()
  }
}

export function handleVariableSave(variable, value) {
  return {
    type: AT.GUESTS_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}

export function getClientCompanyRoles() {
  return {
    type: AT.GUESTS_GET_CLIENT_COMPANY_ROLES,
    payload: api.getClientCompanyRoles()
  }
}

export function createClientCompany(data) {
  return {
    type: AT.GUESTS_CREATE_CLIENT_COMPANY,
    payload: api.createClientCompany(data)
  }
}

export function updateClientCompany(id, data) {
  return {
    type: AT.GUESTS_UPDATE_CLIENT_COMPANY,
    payload: api.updateClientCompany(id, data)
  }
}


