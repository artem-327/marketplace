import * as AT from './action-types'
import * as api from './api'
import Router from 'next/router'
import { Datagrid } from '~/modules/datagrid'

import { updateIdentity } from '~/modules/auth/actions'

export function handleActiveTab(tab, currentTab) {
  if (tab.type !== currentTab.type && Datagrid) Datagrid.clear()
  return {
    type: AT.COMPANIES_HANDLE_ACTIVE_TAB,
    payload: { tab }
  }
}

export function udpateEnabled(id, enabled) {
  return {
    type: AT.COMPANIES_ENABLED_COMPANY,
    payload: api.udpateEnabled(id, enabled)
  }
}

export function openSidebar(data) {
  return {
    type: AT.COMPANIES_OPEN_POPUP,
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

export const deleteCompany = id => ({ type: AT.COMPANIES_DELETE_COMPANIES, payload: api.deleteCompany(id) })

export const takeOverCompany = id => {
  return async dispatch => {
    let payload = await api.takeOverCompany(id)
    dispatch(updateIdentity(payload))
    Router.push('/inventory/my-listings')
  }
}

export const resendWelcomeEmail = userId => {
  return {
    type: AT.RESEND_WELCOME_EMAIL,
    payload: api.resendWelcomeEmail(userId)
  }
}

export function closePopup() {
  return {
    type: AT.COMPANIES_CLOSE_POPUP
  }
}

export function updateCompany(id, formData) {
  return async dispatch => {
    await dispatch(udpateEnabled(id, formData.enabled))
    delete formData.enabled
    let response = await api.updateCompany(id, formData)
    dispatch({
      type: AT.COMPANIES_UPDATE_COMPANY,
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
      type: AT.COMPANIES_CREATE_COMPANY,
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
        type: AT.COMPANIES_GET_COUNTRIES,
        async payload() {
          const countries = await api.getCountries()

          return { countries }
        }
      })
  }
}

export function getPrimaryBranchProvinces(id) {
  return {
    type: AT.COMPANIES_GET_PRIMARY_BRANCH_PROVINCES,
    payload: api.getProvinces(id)
  }
}

export function getMailingBranchProvinces(id) {
  return {
    type: AT.COMPANIES_GET_MAILING_BRANCH_PROVINCES,
    payload: api.getProvinces(id)
  }
}

export function getAddressSearchPrimaryBranch(body) {
  return {
    type: AT.COMPANIES_GET_ADDRESSES_SEARCH_PRIMARY_BRANCH,
    payload: api.getAddressSearch(body)
  }
}

export function getAddressSearchMailingBranch(body) {
  return {
    type: AT.COMPANIES_GET_ADDRESSES_SEARCH_MAILING_BRANCH,
    payload: api.getAddressSearch(body)
  }
}

export function reRegisterP44(id) {
  return {
    type: AT.COMPANIES_RE_REGISTER_P44,
    payload: api.reRegisterP44(id)
  }
}

export const deleteUser = id => ({
  type: AT.COMPANIES_DELETE_USER,
  payload: api.deleteUser(id)
})

export const getUser = id => ({ type: AT.COMPANIES_GET_USER, payload: api.getUser(id) })
export const getUsersMe = () => ({ type: AT.COMPANIES_GET_USERS_ME, payload: api.getUsersMe() })

export const userSwitchEnableDisable = (id, row) => {
  Datagrid.updateRow(id, () => ({ ...row, enabled: !row.enabled }))
  return { type: AT.COMPANIES_USER_SWITCH_ENABLE_DISABLE, payload: api.userSwitchEnableDisable(id) }
}

export const getUserRoles = () => ({
  type: AT.COMPANIES_GET_USER_ROLES,
  payload: api.getUserRoles()
})

export const getClientCompanyRoles = () => ({
  type: AT.COMPANIES_GET_CLIENT_COMPANY_ROLES,
  payload: api.getClientCompanyRoles()
})

export const getAdminRoles = () => ({
  type: AT.COMPANIES_GET_ADMIN_ROLES,
  payload: api.getAdminRoles()
})

export const postNewUserRequest = data => ({
  type: AT.COMPANIES_POST_NEW_USER,
  payload: api.postNewUserRequest(data)
})

export const submitUserEdit = (id, data) => ({
  type: AT.COMPANIES_EDIT_USER,
  payload: api.submitUserEdit(id, data)
})

export const searchCompany = (companyText, limit) => ({
  type: AT.COMPANIES_SEARCH_COMPANY,
  payload: api.searchCompany(companyText, limit)
})

export const searchCompanyFilter = (companyText, limit) => ({
  type: AT.COMPANIES_SEARCH_COMPANY_FILTER,
  payload: api.searchCompany(companyText, limit)
})

export const initSearchCompany = id => ({
  type: AT.COMPANIES_INIT_SEARCH_COMPANY,
  payload: api.getCompanyInfo(id)
})

export const searchSellMarketSegments = segment => ({
  type: AT.COMPANIES_SEARCH_SELL_MARKET_SEGMENTS,
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
  type: AT.COMPANIES_SEARCH_BUY_MARKET_SEGMENTS,
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

export function saveFilters(filters) {
  return {
    type: AT.COMPANIES_SAVE_FILTERS,
    payload: filters
  }
}