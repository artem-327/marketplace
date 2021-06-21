import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import * as AT from './action-types'
import * as api from './api'
import Router from 'next/router'

import { updateIdentity } from '../auth/actions'

export const udpateEnabled = createAsyncAction('COMPANIES_ENABLED_COMPANY', (id, enabled) =>
  api.udpateEnabled(id, enabled)
)
export const openSidebar = createAction('COMPANIES_OPEN_POPUP', (data, currentTab) => ({ data, currentTab }))
export const openEditCompany = createAction('COMPANIES_OPEN_POPUP', (id, data) => ({ data, currentTab: 'companies' }))
export const deleteCompany = createAsyncAction('COMPANIES_DELETE_COMPANIES',  id =>
  api.deleteCompany(id)
)

export const takeOverCompany = id => {
  return async dispatch => {
    let payload = await api.takeOverCompany(id)
    dispatch(updateIdentity(payload))
    Router.push('/inventory/my-listings')
  }
}

export const resendWelcomeEmail = createAsyncAction('RESEND_WELCOME_EMAIL',  userId =>
  api.resendWelcomeEmail(userId)
)

export const closePopup = createAction('COMPANIES_CLOSE_POPUP')

export const updateCompany = createAsyncAction('COMPANIES_UPDATE_COMPANY', (id, formData) =>
  api.updateCompany(id, formData)
)

export const createCompany = createAsyncAction('COMPANIES_CREATE_COMPANY', formData =>
  api.createCompany(formData)
)

export const getPrimaryBranchProvinces = createAsyncAction(
  'COMPANIES_GET_PRIMARY_BRANCH_PROVINCES',
  id => api.getProvinces(id)
)

export const getMailingBranchProvinces = createAsyncAction(
  'COMPANIES_GET_MAILING_BRANCH_PROVINCES',
  id => api.getProvinces(id)
)

export const getAddressSearchPrimaryBranch = createAsyncAction(
  'COMPANIES_GET_ADDRESSES_SEARCH_PRIMARY_BRANCH',
  body => api.getAddressSearch(body)
)

export const getAddressSearchMailingBranch = createAsyncAction(
  'COMPANIES_GET_ADDRESSES_SEARCH_MAILING_BRANCH',
  body => api.getAddressSearch(body)
)

export const reRegisterP44 = createAsyncAction('COMPANIES_RE_REGISTER_P44', id =>
  api.reRegisterP44(id)
)
export const deleteUser = createAsyncAction('COMPANIES_DELETE_USER',  id => api.deleteUser(id))
export const getUser = createAsyncAction('COMPANIES_GET_USER',  id => api.getUser(id))
export const getUsersMe = createAsyncAction('COMPANIES_GET_USERS_ME',  () => api.getUsersMe())

export const userSwitchEnableDisable = createAsyncAction(
  'COMPANIES_USER_SWITCH_ENABLE_DISABLE',
  id => api.userSwitchEnableDisable(id)
)

export const postNewUserRequest = createAsyncAction('COMPANIES_POST_NEW_USER', data =>
  api.postNewUserRequest(data)
)

export const submitUserEdit = createAsyncAction('COMPANIES_EDIT_USER',  (id, data) =>
  api.submitUserEdit(id, data)
)

export const searchCompany = createAsyncAction('COMPANIES_SEARCH_COMPANY',  (companyText, limit) =>
  api.searchCompany(companyText, limit)
)

export const searchCompanyFilter = createAsyncAction(
  'COMPANIES_SEARCH_COMPANY_FILTER',
  (companyText, limit) => api.searchCompany(companyText, limit)
)

export const initSearchCompany = createAsyncAction('COMPANIES_INIT_SEARCH_COMPANY',  id =>
  api.getCompanyInfo(id)
)

export const searchSellMarketSegments = createAsyncAction(
  'COMPANIES_SEARCH_SELL_MARKET_SEGMENTS',
  segment => api.searchMarketSegments({
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
)

export const searchBuyMarketSegments = createAsyncAction(
  'COMPANIES_SEARCH_BUY_MARKET_SEGMENTS',
  segment => api.searchMarketSegments({
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
)

export const saveFilters = createAction('COMPANIES_SAVE_FILTERS', filters => filters)