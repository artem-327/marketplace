import axios from 'axios';

const api = {
  getWarehouses: () => axios.get('/prodex/api/branches/warehouses').then(response => response.data),
};

export default api;