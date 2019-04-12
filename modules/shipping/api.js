import api from '~/api'

export const getQuotes = params => api.post('/prodex/api/shipment/', pack).then(response => response.data)