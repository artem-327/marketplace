import axios from 'axios';

const api = {
    deleteProductOffer: (id) => axios.delete(`/prodex/api/product-offers/${id}`),
    getShippingQuotes: (pack) => axios.get('/prodex/api/shipment/single', {params: {...pack}}).then(response => response.data)
};

export default api;