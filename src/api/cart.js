import axios from 'axios';

const api = {
    createNewOrder: (product) => axios.post('api/exEe66/orders/', product),
    createDeliveryAddress: (address) => axios.post('api/rh587b/delivery-addresses/', address),
    fetchCart: () => axios.get('/api/mnU0lp/cart/').then(response => response.data.data.cart),
    fetchDeliveryAddresses: () => axios.get('/api/1t8e2h/delivery-addresses/').then(response => response.data.data["delivery addresses"]),
    fetchPayments: () => axios.get('/api/jklpuz/payments').then(response => response.data.data.payments),
    getProductOffer: (id) =>  axios.get(`/api/ux92h9/product-offers/${id}/`).then(response => response.data.data.productOffer),
    removeProductFromCart: (id) => axios.delete(`api/4eijtx/cart/${id}/`),
};

export default api;
