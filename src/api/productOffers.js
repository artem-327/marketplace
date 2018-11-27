import axios from 'axios';

const api = {
    removeProductOffer: (id) => axios.delete(`/prodex/api/product-offers/${id}`)
};

export default api;