import axios from 'axios';

const api = {
    fetchMerchant: (id) => axios.get(`/prodex/api/merchants/${id}`).then(response => response.data),
    fetchMerchants: () => axios.get(`/prodex/api/merchants`).then(response => response.data),
    editMerchant: (merchant) => axios.put(`/prodex/api/merchants/${merchant.id}`, {...merchant}),
    removeMerchant: (id) => axios.delete(`/prodex/api/merchants/${id}`),
};

export default api;