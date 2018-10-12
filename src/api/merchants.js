import axios from 'axios';

const api = {
    fetchMerchant: (id) => axios.get(`api/5u79ey/merchants/${id}/`).then(response => response.data.data.merchant),
    fetchMerchants: () => axios.get(`api/9jgzas/merchants/`).then(response => response.data.data.merchants),
    editMerchant: (merchant) => axios.put(`api/6ijfz8/merchants/${merchant.id}/`, {...merchant})
};

export default api;