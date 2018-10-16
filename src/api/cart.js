import axios from 'axios';

const api = {
    getCurrentAdded: (id) =>  axios.get(`/api/ux92h9/product-offers/${id}/`).then(response => response.data.data.productOffer),
    fetchCartItems: () => axios.get('/api/25tjry/cart/').then(response => response.data.data.cart),
};

export default api;
