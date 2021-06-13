import api from '../../api'

export default {
  getNextImmediate: () => api.get(`/prodex/api/messaging-center/next-immediate`).then(response => response.data).catch(e => console.error(e))
}
