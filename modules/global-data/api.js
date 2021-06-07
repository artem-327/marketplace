import api from '../../api'

export default {
  getCountries: () => api.get('/prodex/api/countries').then(response => response.data)
}