import axios from 'axios';

const api = {
  getWarehouses: () => axios.get('/prodex/api/branches/warehouses').then(response => response.data),
  putWarehouse: (id, body) => axios.put(`/prodex/api/branches/${id}`, body ).then(response => response.data)
};

export default api;