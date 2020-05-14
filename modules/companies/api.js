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
