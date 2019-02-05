import api from '../../api'

export default {
    getAll: (endpointType) => api.get(`/${endpointType}-orders`),
    create: (model) => api.post('/orders', model),
    getOrder: (endpointType, orderId) => api.get(`/${endpointType}-orders/${orderId}`),
    update: (orderId, model) => api.put(`/orders/${orderId}`, model),
    confirm: (orderId) => api.post(`/sale-orders/${orderId}/confirm`),
    reject: (orderId) => api.post(`/sale-orders/${orderId}/reject`)
}