import api from '../../api'

export default {
  deleteShippingQuote: id => api.delete(`/prodex/api/shipment/manual-quotes/id/${id}`),
  createShippingQuote: data => api.put('/prodex/api/shipment/manual-quotes', data).then(response => response.data),
  deleteTag: id => api.delete(`/prodex/api/tags/id/${id}`),
  createTag: name => api.post(`/prodex/api/tags?name=${name}`),
  updateTag: (id, name) => api.patch(`/prodex/api/tags/id/${id}?name=${name}`),
  searchCompany: (companyText, limit = 30) =>
    api
      .get(`/prodex/api/companies/search?limit=${limit}&pattern=${encodeURIComponent(companyText)}`)
      .then(response => response.data),
  cancelOrder: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/cancel`),
  getAccountingDocuments: orderId => api.get(`/prodex/api/accounting-documents/order/${orderId}`),
  markRequestAsProcessed: id =>
    api.patch(`/prodex/api/company-generic-product-requests/${id}/processed`).then(response => response.data),
  denyRequest: id => api.patch(`/prodex/api/company-generic-product-requests/${id}/deny`),
  deleteRequest: id => api.delete(`/prodex/api/company-generic-product-requests/${id}`),
  searchManualQuoteRequest: filter =>
    api.post(`/prodex/api/shipment/manual-quotes/requests/datagrid`, filter).then(response => response.data),
  resolveDisputeAccept: orderId =>
    api
      .patch(`/prodex/api/purchase-orders/${orderId}/resolve-dispute-accept`)
      .then(response => response.data)
      .catch(e => console.log(e)),
  resolveDisputeCredit: (orderId, amount) =>
    api
      .patch(`/prodex/api/purchase-orders/${orderId}/resolve-dispute-credit?amount=${amount}`)
      .then(response => response.data)
      .catch(e => console.log(e)),
  resolveDisputeReject: orderId =>
    api
      .patch(`/prodex/api/purchase-orders/${orderId}/resolve-dispute-reject`)
      .then(response => response.data)
      .catch(e => console.log(e))
}
