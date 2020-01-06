import api from '~/api'
import { generateQueryString } from '~/utils/functions'

export default {
  getAll: (endpointType, filter = {}) =>
    api.post(`/prodex/api/${endpointType}-orders/datagrid`, {
      ...filter,
      pageSize: 50,
      pageStart: 0,
      sortDirection: 'DESC',
      sortPath: 'Order.orderDate'
    }),
  create: model => api.post('/prodex/api/orders', model),
  getOrder: (endpointType, orderId) => api.get(`/prodex/api/${endpointType}-orders/${orderId}`),
  update: (orderId, model) => api.put(`/prodex/api/orders/${orderId}`, model),
  confirm: orderId => api.patch(`/prodex/api/sale-orders/${orderId}/confirm`),
  confirmReturned: (orderId, fundingSourceId) =>
    api.patch(
      `/prodex/api/sale-orders/${orderId}/return-shipment/return-shipment-delivered?fundingSourceId=${fundingSourceId}`
    ),
  reject: orderId => api.patch(`/prodex/api/sale-orders/${orderId}/reject`),
  ship: (orderId, trackingId) => api.patch(`/prodex/api/sale-orders/${orderId}/ship?trackingId=${trackingId}`),
  returnShip: (orderId, trackingId) =>
    api.patch(`/prodex/api/purchase-orders/${orderId}/return-shipment-shipped?trackingId=${trackingId}`),
  downloadPdf: (endpointType, orderId) =>
    api.get(`/prodex/api/${endpointType}-orders/${orderId}/download-pdf`, {
      responseType: 'blob'
    }),
  searchCompany: companyText => api.get(`/prodex/api/companies/search?pattern=${companyText}`),
  searchProducts: productText => api.get(`/prodex/api/products/search?limit=30&search=${productText}`),
  getLots: poId => api.get(`/prodex/api/product-offers/${poId}`),
  assignLots: (orderId, orderItemId, assignedLots) =>
    api.patch(`/prodex/api/sale-orders/${orderId}/order-item/${orderItemId}/assign-lots`, assignedLots),
  linkAttachment: (lotId, aId) => api.post(`/prodex/api/attachment-links/to-lot?attachmentId=${aId}&lotId=${lotId}`),
  removeAttachment: aId => api.delete('/prodex/api/attachments/' + aId),
  removeAttachmentLink: (lotId, aId) =>
    api.delete(`/prodex/api/attachment-links/to-lot?attachmentId=${aId}&lotId=${lotId}`),
  payOrder: (orderId, bankAccount) =>
    api.post(`/prodex/api/payments/pay?purchaseOrderId=${orderId}&bankAccountId=${bankAccount}`), // nevraci body
  cancelPayment: orderId => api.patch(`/prodex/api/payments/dwolla/transfer/${orderId}/cancel`), // nevraci body
  loadBankAccounts: () => api.get(`/prodex/api/payments/bank-accounts`),
  getRelatedOrders: orderId => api.get(`/prodex/api/accounting-documents/order/${orderId}`),
  cancelOrder: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/cancel`),
  approveOrder: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/approve`),
  discardOrder: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/discard`),
  receivedOrder: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/received`),
  accept: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/accept`),
  rejectPurchaseOrder: (orderId, request, files) => {
    let params = { ...request, type: docType }
    const formData = new FormData()
    formData.append('file', files)
    let queryParams = generateQueryString(params)

    return api.patch(`/prodex/api/purchase-orders/${orderId}/reject${queryParams}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
  },
  creditCounterAccept: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/credit-counter-accept`),
  creditCounter: (orderId, request, files) => {
    let params = { ...request }
    const formData = new FormData()
    formData.append('file', files)
    let queryParams = generateQueryString(params)

    return api.post(`/prodex/api/sale-orders/${orderId}/credit-counter${queryParams}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
  },
  creditCounterReject: orderId => api.patch(`/prodex/api/purchase-orders/${orderId}/credit-counter-reject`),
  //TODO není hotový na BE
  creditRequest: (orderId, request, files) => {
    let params = { ...request }
    const formData = new FormData()
    formData.append('file', files)
    let queryParams = generateQueryString(params)

    return api.post(`/prodex/api/purchase-orders/${orderId}/credit-request${queryParams}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
  },
  returnShipmentRates: (orderId, pickupDate) =>
    api.get(`/prodex/api/shipment/order/${orderId}/return-shipment-rates?pickupDate=${pickupDate}`),
  returnShipmentOrder: (orderId, query) =>
    api.patch(`/prodex/api/shipment/order/${orderId}/return-shipment-order${generateQueryString(query)}`),
  getShippingQuotes: (
    orderId,
    pickupDate // ! ! TODO: 500 Internal Server Error, date not working?
  ) => api.get(`/prodex/api/shipment/order/${orderId}/shipment-rates?pickupDate=${pickupDate}`),
  getManualShippingQuote: (
    orderId,
    query //! ! TODO: 500 Internal Server Error
  ) => api.post(`/prodex/api/shipment/order/${orderId}/manual-quote${generateQueryString(query)}`),
  purchaseShipmentOrder: (
    orderId,
    query // ! ! TODO: 501 Not Implemented
  ) => api.patch(`prodex/api/shipment/order/${orderId}/shipment-order${generateQueryString(query)}`),
  downloadCreditRequestAttachments: (endpointType, orderId, creditRequestAttachmentId) =>
    api.get(
      `prodex/api/${endpointType}-orders/${orderId}/attachments/download-credit-request-attachment/${creditRequestAttachmentId}`
    ),
  creditAccept: orderId => api.patch(`/prodex/api/sale-orders/${orderId}/credit-accept`)
}
