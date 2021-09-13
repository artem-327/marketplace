import api from '../../api'

export default {
  deleteWantedBoardApi: id => api.delete(`/prodex/api/wanted-board/id/${id}`).then(() => id),
  postNewWantedBoardApi: value => api.post('/prodex/api/wanted-board', value),
  updateWantedBoardApi: (id, value) => api.patch(`/prodex/api/wanted-board/id/${id}`, value)
    .then(response => response.data),
}
