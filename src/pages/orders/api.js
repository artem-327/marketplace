import api from '../../api'

export default {
    getAll: () => api.get('/sale-orders'),
    create: (model) => api.post('/orders', model),
    getOrder: (orderId) => api.get(`/sale-orders/${orderId}`),
    update: (orderId, model) => api.put(`/orders/${orderId}`, model),
    confirm: (orderId) => api.post(`/sale-orders/${orderId}/confirm`)
}