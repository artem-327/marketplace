import axios from 'axios';

const api = {
    removeProductOffer: (id) => axios.delete(`/api/yskk4u/product-offers/${id}/`)
};

export default api;