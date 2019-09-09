import api from '~/api'

export default {
  getAll: (endpointType, filter = {}) => api.post(`/prodex/api/${endpointType}-orders/datagrid`, {
    ...filter,
    pageSize: 50,
    pageStart: 0,
    sortDirection: "DESC",
    sortPath: 'Order.orderDate'
  }),
  create: (model) => api.post('/prodex/api/orders', model),
  getOrder: (endpointType, orderId) => api.get(`/prodex/api/${endpointType}-orders/${orderId}`),
  update: (orderId, model) => api.put(`/prodex/api/orders/${orderId}`, model),
  confirm: (orderId) => api.patch(`/prodex/api/sale-orders/${orderId}/confirm`),
  reject: (orderId) => api.patch(`/prodex/api/sale-orders/${orderId}/reject`),
  downloadPdf: (endpointType, orderId) => api.get(`/prodex/api/${endpointType}-orders/${orderId}/download-pdf`, {responseType: 'blob'}),
  searchCompany: (companyText) => api.get(`/prodex/api/companies/search?pattern=${companyText}`),
  searchProducts: (productText) => api.get(`/prodex/api/products/search?limit=30&search=${productText}`),
  getLots: (poId) => api.get(`/prodex/api/product-offers/${poId}`),
  assignLots: (orderId, orderItemId, assignedLots) => api.patch(`/prodex/api/sale-orders/${orderId}/order-item/${orderItemId}/assign-lots`, assignedLots),
  linkAttachment: (lotId, aId) => api.post(`/prodex/api/attachment-links/to-lot?attachmentId=${aId}&lotId=${lotId}`),
  removeAttachment: (aId) => api.delete('/prodex/api/attachments/' + aId),
  removeAttachmentLink: (lotId, aId) => api.delete(`/prodex/api/attachment-links/to-lot?attachmentId=${aId}&lotId=${lotId}`),
  cancelPayment: (orderId) => api.patch(`/prodex/api/payments/dwolla/transfer/{orderId}/cancel`)
}