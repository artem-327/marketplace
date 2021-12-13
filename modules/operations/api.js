import api from '../../api'

export default {
  deleteShippingQuote: id => api.delete(`/prodex/api/shipment/manual-quotes/id/${id}`),
  createShippingQuote: data => api.put('/prodex/api/shipment/manual-quotes', data).then(response => response.data),
  deleteTag: id => api.delete(`/prodex/api/tags/id/${id}`),
  createTag: name => api.post(`/prodex/api/tags?name=${encodeURIComponent(name)}`),
  updateTag: (id, name) => api.patch(`/prodex/api/tags/id/${id}?name=${encodeURIComponent(name)}`),
  searchCompany: (companyText, limit = 30) =>
    api
      .get(`/prodex/api/companies/search?limit=${limit}&pattern=${encodeURIComponent(companyText)}`)
      .then(response => response.data),
  cancelOrder: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/cancel`),
  getOrderById: orderId => api.post('/prodex/api/admin/orders/datagrid', {
    orFilters: [],
    filters: [{ operator: 'EQUALS', path: 'Order.id', values: [orderId] }],
    pageSize: 50,
    pageNumber: 0
  }).then(response => response.data),
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
      .catch(e => console.error(e)),
  resolveDisputeCredit: (orderId, amount) =>
    api
      .patch(`/prodex/api/purchase-orders/${orderId}/resolve-dispute-credit?amount=${amount}`)
      .then(response => response.data)
      .catch(e => console.error(e)),
  resolveDisputeReject: orderId =>
    api
      .patch(`/prodex/api/purchase-orders/${orderId}/resolve-dispute-reject`)
      .then(response => response.data)
      .catch(e => console.error(e)),
  generateBOL: (id, carrierName, pickupDate) => 
    api
      .post(`/prodex/api/shipment/manual-quotes/id/${id}/generate-bol`, {carrierName, pickupDate}).then(response => response.data),
  downloadPdf: orderId =>
    api.get(`/prodex/api/purchase-orders/${orderId}/download-pdf`, {
      responseType: 'blob'
    }),
}
