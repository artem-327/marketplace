import api from '~/api'
import { generateQueryString } from '~/utils/functions'

export const getQuotes = params => api.post('/prodex/api/shipment/', params).then(({ data }) => data)

export const getCountries = () => api.get('/prodex/api/countries').then(({ data }) => data)

export const getZipCodes = (queryParams = {}) =>
  api.get(`/prodex/api/zip-codes${generateQueryString(queryParams)}`).then(({ data }) => data)
