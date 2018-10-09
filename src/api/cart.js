import axios from 'axios';

const api = {
    getCurrentAdded: (id) =>  axios.get(`/api/v1/product-offers/${id}/`).then(response => response.data.data.productOffer),
};

export default api;
