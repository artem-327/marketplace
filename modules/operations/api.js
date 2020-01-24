import api from '~/api'

export default {
  deleteShippingQuote: id => api.delete(`/prodex/api/shipment/manual-quotes/id/${id}`),
  createShippingQuote: data =>
    api.put('/prodex/api/shipment/manual-quotes', data).then(response => response.data),
//  updateShippingQuote: (id, data) => // endpoint not exists
//    api.TBD(`/prodex/api/shipment/manual-quotes/id/${id}`, data).then(response => response.data),
}
