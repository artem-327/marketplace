import api from '~/api'

import { getSafe, generateQueryString } from '~/utils/functions'

export const udpateEnabled = (id, enabled) =>
  api.patch(`/prodex/api/companies/admin/id/${id}/enabled?enabled=${enabled}`)

export const deleteCompany = id => api.delete(`/prodex/api/companies/id/${id}`).then(() => id)

export const takeOverCompany = id =>
  api.patch(`/prodex/api/admin/company/${id}/take-over`).then(response => response.data)

export const resendWelcomeEmail = userId =>
  api
    .get(`/prodex/api/users/id/${userId}/email/welcome`)
    .then(response => response.data)
    .catch(e => console.error(e.clientMessage))

export async function updateCompany(id, formData) {
  const { data } = await api.patch(`/prodex/api/companies/admin/id/${id}`, formData)

  return data
}

export async function createCompany(formData) {
  const { data } = await api.post('/prodex/api/companies', formData)
  return data
}

export async function getCountries() {
  const { data } = await api.get('/prodex/api/countries')
  return data
}

export const getProvinces = id => api.get(`/prodex/api/provinces/country/${id}`).then(response => response.data)

export async function getAddressSearch(body) {
  const { data } = await api.post('/prodex/api/addresses/search', body)
  return data
}

export const reRegisterP44 = id => api.patch(`/prodex/api/shipment/${id}/re-register`).then(response => response.data)

export const getUserRoles = () => api.get('/prodex/api/roles?type=COMPANY_COMPATIBLE').then(response => response.data)
export const getAdminRoles = () => api.get('/prodex/api/roles?type=ONLY_ADMIN').then(response => response.data)

export const getUser = id => api.get(`/prodex/api/users/id/${id}`).then(response => response.data)
export const getUsersMe = () => api.get('/prodex/api/users/me').then(response => response.data)
export const userSwitchEnableDisable = id =>
  api.patch(`/prodex/api/users/id/${id}/switch-enabled`).then(response => response.data)
export const postNewUserRequest = body => api.post('/prodex/api/users', body).then(response => response.data)
export const submitUserEdit = (id, body) =>
  api.patch(`/prodex/api/users/id/${id}`, body).then(response => response.data)
export const deleteUser = id => api.delete(`/prodex/api/users/id/${id}`).then(() => id)

export const searchCompany = (companyText, limit = 30) =>
  api
    .get(`/prodex/api/companies/search/all-info?limit=${limit}&pattern=${encodeURIComponent(companyText)}`)
    .then(response => response.data)
export const getCompanyInfo = id => api.get(`/prodex/api/companies/id/${id}`).then(response => response.data)

export const searchMarketSegments = filter =>
  api.post(`/prodex/api/market-segments/datagrid`, filter).then(response => response.data)
