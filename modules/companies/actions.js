import * as AT from './action-types'
import * as api from './api'
import Router from 'next/router'

import { updateIdentity } from '~/modules/auth/actions'

export function udpateEnabled(id, enabled) {
  return {
    type: AT.ADMIN_ENABLED_COMPANY,
    payload: api.udpateEnabled(id, enabled)
  }
}

export function openSidebar(data) {
  return {
    type: AT.ADMIN_OPEN_POPUP,
    payload: { data }
  }
}

export function openEditCompany(id, formData) {
  return async dispatch => {
    dispatch(openSidebar(formData))
    // const data = await api.getCompany(id)
    // dispatch(openSidebar(data))
  }
}

export const deleteCompany = id => ({ type: AT.ADMIN_DELETE_COMPANIES, payload: api.deleteCompany(id) })

export const takeOverCompany = id => {
  return async dispatch => {
    let payload = await api.takeOverCompany(id)
    dispatch(updateIdentity(payload))
    Router.push('/inventory/my')
  }
}

export const resendWelcomeEmail = userId => {
  return {
    type: AT.RESEND_WELCOME_EMAIL,
    payload: api.resendWelcomeEmail(userId)
  }
}

export function handleFiltersValue(props, value) {
  return async dispatch => {
    // save filter value
    await dispatch({
      type: AT.ADMIN_HANDLE_FILTERS_VALUE,
      payload: value
    })
  }
}

export function closePopup() {
  return {
    type: AT.ADMIN_CLOSE_POPUP
  }
}

export function updateCompany(id, formData) {
  return async dispatch => {
    await dispatch(udpateEnabled(id, formData.enabled))
    delete formData.enabled
    let response = await api.updateCompany(id, formData)
    dispatch({
      type: AT.ADMIN_UPDATE_COMPANY,
      response
    })

    /* Called when uploaded logo
          Datagrid.updateRow(id, () => response)
          */

    // dispatch(updateIdentity(response))
    dispatch(closePopup())
    return response
    // dispatch(getCompanies())
  }
}

export function createCompany(formData) {
  return async dispatch => {
    const enabled = formData.enabled
    delete formData.enabled
    let response = await api.createCompany(formData)
    await dispatch({
      type: AT.ADMIN_CREATE_COMPANY,
      response
    })

    /* Called when uploaded logo
      Datagrid.clear()
      Datagrid.loadData()
      */
    await dispatch(udpateEnabled(response.id, enabled))
    dispatch(closePopup())
    return response
  }
}

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
