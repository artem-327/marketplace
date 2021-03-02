import api from '../../api'

export default {
  disconnect: id => api.patch(`/prodex/api/tradepass/connection/${id}/disconnect`).then(response => response.data), //FIXME
  accept: id => api.patch(`/prodex/api/tradepass/connection/${id}/accept`).then(response => response.data),
  reject: id => api.patch(`/prodex/api/tradepass/connection/${id}/decline`).then(response => response.data) //FIXME
}
