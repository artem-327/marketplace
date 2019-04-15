import api from '~/api'

export const getQuotes = params => api.post('/prodex/api/shipment/', params).then(response => response.data)