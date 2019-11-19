import axios from 'axios'

const api = {
  getMerchant: id => axios.get(`/prodex/api/users/id/${id}`).then(response => response.data),
  getMerchants: () => axios.get(`/prodex/api/users`).then(response => response.data),
  putMerchantEdit: merchant => axios.put(`/prodex/api/merchants/${merchant.id}`, {...merchant}),
  deleteMerchant: id => axios.delete(`/prodex/api/users/id/${id}`)
}

export default api
