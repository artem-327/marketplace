import api from '../../api'
import {transformRequestOptions} from "../../utils/functions";

export default {
    getAll: (endpointType, filter) => api.get(`/${endpointType}-orders`, {
        params: {
            ...filter
        },
        'paramsSerializer': params => transformRequestOptions(params)}),
    create: (model) => api.post('/orders', model),
    getOrder: (endpointType, orderId) => api.get(`/${endpointType}-orders/${orderId}`),
    update: (orderId, model) => api.put(`/orders/${orderId}`, model),
    confirm: (orderId) => api.post(`/sale-orders/${orderId}/confirm`),
    reject: (orderId) => api.post(`/sale-orders/${orderId}/reject`)
}