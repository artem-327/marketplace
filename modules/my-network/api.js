import api from '../../api'

export default {
  disconnect: id => api.patch(`/prodex/api/tradepass/connection/${id}/disconnect`).then(response => response.data),
  accept: id => api.patch(`/prodex/api/tradepass/connection/${id}/accept`).then(response => response.data),
  reject: id => api.patch(`/prodex/api/tradepass/connection/${id}/decline`).then(response => response.data),
  delete: id => api.delete(`/prodex/api/tradepass/connection/${id}`).then(response => response.data),
  search: id => api.get(`/prodex/api/tradepass/connection/${id}`)
}
