import api from '../../api'

export default {
  getNetworks: () => api.get(`/prodex/api/networks`).then(response => response.data)
}
