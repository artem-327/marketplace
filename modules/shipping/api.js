import api from '~/api'

export const getQuotes = params => api.post('/prodex/api/shipment/', params).then(({ data }) => data)

export const getCountries = () => api.get('/prodex/api/countries').then(({ data }) => data)

export const getZipCodes = () => api.get('/prodex/api/zip-codes').then(({ data }) => data)
