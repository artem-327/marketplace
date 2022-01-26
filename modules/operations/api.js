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
  getOrderBol: orderId => api.get(`/prodex/api/order-documents/order/${orderId}/bill-of-lading`).then(response => response.data),
  updateOrderBol: (orderId, type, body) => api.patch(`/prodex/api/order-documents/order/${orderId}/bill-of-lading?type=${type}`, body)
    .then(response => response.data),
  submitCarrierBol: (orderId, body) => api.patch(`/prodex/api/order-documents/order/${orderId}/bill-of-lading/submit-carrier-bol`, body)
    .then(response => response.data),
  getAccountingDocuments: orderId => api.get(`/prodex/api/accounting-documents/order/${orderId}`),
  markRequestAsProcessed: (id, cgp_id) =>
    api.patch(`/prodex/api/company-generic-product-requests/${id}/processed?companyGenericProductId=${cgp_id}`)
      .then(response => response.data),
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
  searchCompanyGenericProduct: (searchQuery, limit, companyId) => {
    let url = `/prodex/api/company-generic-products/search?pattern=${encodeURIComponent(searchQuery)}&limit=${limit}`
    if (companyId) {
      url += `&companyId=${companyId}`
    }
    return api
        .get(url)
        .then(response => response.data)
  }
}
