import axios from 'axios';

const api = {
    getShippingQuotes: (pack) => axios.get('/prodex/api/shipment/single', {params: {...pack}}).then(response => response.data)
};

export default api;