import axios from 'axios';

const api = {
    getCurrentAdded: (id) =>  axios.get(`/api/v1/product-offers/${id}/`).then(response => response.data.data.productOffer),
    fetchCartItems: () => axios.get('/api/25tjry/cart/').then(response => response.data.data.cart),
};

export default api;
