import api from '~/api'

export const getIdentity = () => api.get('/prodex/api/users/me').then(response => response.data)

export const getVersion = () => api.get('/prodex/api/version').then(response => response.data)

export const resetPasswordRequest = email => api.post(`/prodex/api/users/reset-password-request?email=${email}`)

export const reviewCompany = values => api.patch(`/prodex/api/companies/review`, values)

export const searchCountries = searchQuery => api.get(`/prodex/api/countries/search?pattern=${searchQuery}`)

export const searchProvinces = countryId => api.get(`/prodex/api/provinces/country/${countryId}`)

export const updateCompany = (id, payload) => api.patch(`/prodex/api/companies/id/${id}`, payload).then(response => response.data)

export const getCompanyDetails = id => api.get(`/prodex/api/companies/id/${id}/all-info`).then(response => response.data)

export const agreeWithTOS = () => api.patch('/prodex/api/users/accept-tos')