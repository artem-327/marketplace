import axios from 'axios';

const api = {
    getCart: () => axios.get('/prodex/api/cart').then(response => response.data),
    deleteCart: (orderId) => axios.delete(`/prodex/api/cart/${orderId}`),
    createNewOrder: (order) => axios.post('/prodex/api/eXe66/orders', order), //POST /api/cart ?
    editOrder: (order) => axios.post(`/prodex/api/orders/${order.id}`, {...order}), //

    getProductOffer: (id) =>  axios.get(`/prodex/api/product-offers/${id}/applyrules`).then(response => response.data),
    getOrderDetail: (id) =>  axios.get(`/prodex/api/orders/${id}`).then(response => response.data.order),
    createDeliveryAddress: (address) => axios.post('/prodex/api/delivery-addresses', address),
    editDeliveryAddress: (address) => axios.put(`/prodex/api/delivery-addresses/${address.id}`, address),
    fetchDeliveryAddresses: () => axios.get('/prodex/api/delivery-addresses').then(response => response.data.deliveryAddresses),
    fetchPayments: () => axios.get('/prodex/api/payments').then(response => response.data.payments),
};

export default api;
