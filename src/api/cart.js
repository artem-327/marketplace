import axios from 'axios';

const api = {
    getProductOffer: (id) =>  axios.get(`/api/ux92h9/product-offers/${id}/`).then(response => response.data.data.productOffer),
    //     getProductOffer: (id) =>  axios.get(`/api/product-offers/${id}/applyrules/`).then(response => response.data.data.productOffer), TODO: call this in the future
    createNewOrder: (order) => axios.post('/api/eXe66/orders/', order),
    editOrder: (order) => axios.post(`/api/jul096/orders/${order.id}/`, {...order}),
    getOrderDetail: (id) =>  axios.get(`/api/m600tl/orders/${id}/`).then(response => response.data.data.order),
    fetchCart: () => axios.get('/api/mnU0lp/cart/').then(response => response.data.data.cart),
    removeProductFromCart: (id) => axios.delete(`/api/4eijtx/cart/${id}/`),
    createDeliveryAddress: (address) => axios.post('/api/rh587b/delivery-addresses/', address),
    editDeliveryAddress: (address) => axios.put(`/api/97hub0/delivery-addresses/${address.id}/`, address),
    fetchDeliveryAddresses: () => axios.get('/api/1t8e2h/delivery-addresses/').then(response => response.data.data["delivery addresses"]),
    fetchPayments: () => axios.get('/api/jklpuz/payments/').then(response => response.data.data.payments),
};

export default api;
