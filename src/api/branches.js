import axios from 'axios';

const api = {
  getWarehouses: () => axios.get('/prodex/api/branches/warehouses/').then(response => response.data),
  putWarehouse: (branchId, body) => axios.put(`/prodex/api/branches/${branchId}`, body ).then(response => response.data),
  deleteWarehouse: branchId => axios.delete(`/prodex/api/branches/${branchId}`)
};

export default api;