import api from '~/api'

import {transformRequestOptions} from "../../utils/functions";

export default {
    getAll: (endpointType, filter) => api.get(`/prodex/api/${endpointType}-orders`, {
        params: {
            ...filter
        },
        'paramsSerializer': params => transformRequestOptions(params)}),
    create: (model) => api.post('/prodex/api/orders', model),
    getOrder: (endpointType, orderId) => api.get(`/prodex/api/${endpointType}-orders/${orderId}`),
    update: (orderId, model) => api.put(`/prodex/api/orders/${orderId}`, model),
    confirm: (orderId) => api.patch(`/prodex/api/sale-orders/${orderId}/confirm`),
    reject: (orderId) => api.patch(`/prodex/api/sale-orders/${orderId}/reject`)
}