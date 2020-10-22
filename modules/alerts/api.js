import api from '~/api'

export default {
  markSeen: id => api.patch(`/prodex/api/messaging-center/${id}/seen`),
  markUnseen: id => api.patch(`/prodex/api/messaging-center/${id}/unseen`),
  getCategories: () => api.get('/prodex/api/messaging-center/message-categories').then(response => response.data),
  getCountUnseen: () => api.get('/prodex/api/messaging-center/count-unseen').then(response => response.data)
}
