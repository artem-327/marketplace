import axios from 'axios';

const api = {
    deleteProductOffer: (id) => axios.delete(`/prodex/api/product-offers/${id}`)
};

export default api;