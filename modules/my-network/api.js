import api from '../../api'

export default {
  disconnect: id =>
    api
      .patch(`/prodex/api/tradepass/connection/${id}/disconnect`)
      .then(response => response.data)
      .catch(err => console.error(err)),
  accept: id =>
    api
      .patch(`/prodex/api/tradepass/connection/${id}/accept`)
      .then(response => response.data)
      .catch(err => console.error(err)),
  reject: id =>
    api
      .patch(`/prodex/api/tradepass/connection/${id}/decline`)
      .then(response => response.data)
      .catch(err => console.error(err)),
  remove: id =>
    api
      .delete(`/prodex/api/tradepass/connection/${id}`)
      .then(response => response.data)
      .catch(err => console.error(err)),
  search: id => api.get(`/prodex/api/tradepass/search?tradepassId=${id}`),
  invite: id =>
    api
      .post(`/prodex/api/tradepass/connection?tradepassId=${id}`)
      .then(res => res.data)
      .catch(err => console.error(err))
}
