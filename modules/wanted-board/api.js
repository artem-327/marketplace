import api from '../../api'

export default {
  getWantedBoardOwnApi: id => api.post('/prodex/api/wanted-board/own/datagrid', {
    filters: [{operator: "EQUALS", path: "WantedBoardRequest.id", values: [id]}],
    orFilters: [],
    pageNumber: 0,
    pageSize: 50
  }).then(resp => resp),
  getWantedBoardApi: id => api.get(`/prodex/api/wanted-board/id/${id}`).then(resp => resp),
  deleteWantedBoardApi: id => api.delete(`/prodex/api/wanted-board/id/${id}`).then(() => id),
  postNewWantedBoardApi: value => api.post('/prodex/api/wanted-board', value),
  updateWantedBoardApi: (id, value) => api.patch(`/prodex/api/wanted-board/id/${id}`, value)
    .then(response => response.data),
  deleteWantedBoardBidsApi: id => api.delete(`/prodex/api/wanted-board-direct-bids/id/${id}`).then(resp => resp).catch(err => console.error(err)),
  postNewWantedBoardBidsApi: value => api.post('/prodex/api/wanted-board-direct-bids', value).then(resp => resp).catch(err => console.error(err)),
  searchManufacturers: (text, limit = 5) =>
    api.get(
      `/prodex/api/manufacturers/search?search=${encodeURIComponent(text)}${
        Number.isInteger(limit) ? '&limit=' + (limit > 30 ? 30 : limit) : ''
        }`
    ).then(resp => resp).catch(err => console.error(err)),
}
