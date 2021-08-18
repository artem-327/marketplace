import api from '../../api'
import axios from 'axios'
import md5 from 'md5'

export const getIdentity = async () => {
  let identity = await api.get('/prodex/api/users/me').then(response => response.data)
  let gravatarSrc = await axios.get(`/gravatar/${md5(identity.email)}`).then(({ data }) => data.src)

  return {
    ...identity,
    gravatarSrc
  }
}
export const getVersion = () => api.get('/prodex/api/version')
export const resetPasswordRequest = email => api.post(`/prodex/api/users/reset-password-request?email=${encodeURIComponent(email)}`)
export const reviewCompany = values => api.patch(`/prodex/api/companies/review`, values)
export const searchCountries = searchQuery => api.get(`/prodex/api/countries/search?pattern=${encodeURIComponent(searchQuery)}`)
export const searchProvinces = countryId => api.get(`/prodex/api/provinces/country/${countryId}`)
export const updateCompany = (id, payload) => api.patch(`/prodex/api/companies/id/${id}`, payload)
export const getCompanyDetails = id => api.get(`/prodex/api/companies/id/${id}/all-info`).then(response => response.data)
export const agreeWithTOS = () => api.patch('/prodex/api/users/accept-tos')
export const updateCompanyDetails = (companyId, request) => api.patch(`/prodex/api/companies/id/${companyId}/details`, request)
