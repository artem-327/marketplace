import axios from 'axios';

const api = {
    fetchMerchant: (id) => axios.get(`api/5u79ey/merchants/${id}/`).then(response => response.data.data.merchant),
};

export default api;