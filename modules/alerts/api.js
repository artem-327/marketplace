import api from '../../api'
import { generateQueryString } from '../../utils/functions'

export default {
  markSeen: id => api.patch(`/prodex/api/messaging-center/${id}/seen`),
  markUnseen: id => api.patch(`/prodex/api/messaging-center/${id}/unseen`),
  getCategories: () => api.get('/prodex/api/messaging-center/message-categories').then(response => response.data),
  getCountUnseen: () => api.get('/prodex/api/messaging-center/count-unseen').then(response => response.data),
  markSeenArray: arr => api.patch(`/prodex/api/messaging-center/seen${generateQueryString(arr)}`),
  markUnseenArray: arr => api.patch(`/prodex/api/messaging-center/unseen${generateQueryString(arr)}`),
  deleteArray: arr => api.delete(`/prodex/api/messaging-center/messages${generateQueryString(arr)}`)
}
