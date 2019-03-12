import axios from 'axios';

const api = {
    getMerchant: (id) => axios.get(`/prodex/api/merchants/${id}`).then(response => response.data),
    getMerchants: () => axios.get(`/prodex/api/merchants`).then(response => response.data),
    putMerchantEdit: (merchant) => axios.put(`/prodex/api/merchants/${merchant.id}`, {...merchant}),
    deleteMerchant: (id) => axios.delete(`/prodex/api/merchants/${id}`),
};

export default api;