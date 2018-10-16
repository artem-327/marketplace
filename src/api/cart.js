import axios from 'axios';

const api = {
    getCurrentAdded: (id) =>  axios.get(`/api/ux92h9/product-offers/${id}/`).then(response => response.data.data.productOffer),
    fetchCartItems: () => axios.get('/api/25tjry/cart/').then(response => response.data.data.cart),
    fetchDeliveryAddresses: () => axios.get('/api/51zjrk/delivery-addresses/').then(response => response.data.data),
    removeProductFromCart: (id) => axios.delete(`api/jdr9gj/cart/${id}/`),
    createCartItem: (product) => axios.post('api/tz6pap/cart/', product),
};

export default api;
