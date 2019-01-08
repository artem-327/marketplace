import axios from 'axios';

const api = {
    getCart: () => axios.get('/prodex/api/cart').then(response => response.data),
    deleteCart: (orderId) => axios.delete(`/prodex/api/cart/${orderId}`),
    postNewOrder: (order) => axios.post('/prodex/api/orders', order),
    postOrderEdit: (order) => axios.post(`/prodex/api/orders/${order.id}`, {...order}),
    getProductOffer: (id) => axios.get(`/prodex/api/product-offers/${id}/applyrules`).then(response => response.data),
    getOrderDetail: (id) => axios.get(`/prodex/api/orders/${id}`).then(response => response.data),
    postNewDeliveryAddress: (address) => axios.post('/prodex/api/delivery-addresses', address),
    putDeliveryAddressEdit: (address) => axios.put(`/prodex/api/delivery-addresses/${address.id}`, address),
    getDeliveryAddresses: () => axios.get('/prodex/api/delivery-addresses').then(response => response.data),
    getPayments: () => axios.get('/prodex/api/payments').then(response => response.data),
    getShippingQuotes: (country, zip) => axios.get('/prodex/api/shipment/cart', {params:{
            destinationCountry: country, destinationZIP: zip
        }}).then(response => response.data)
};

export default api;
