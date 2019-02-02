import api from '../../api'

export default {
    getAll: () => api.get('/sale-orders'),
    create: (model) => api.post('/orders', model),
    get: (orderId) => api.get(`/orders/${orderId}`),
    update: (orderId, model) => api.put(`/orders/${orderId}`, model)
}