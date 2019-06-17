import api from '~/api'


export default {
  getUsersMe: () => api.get('/prodex/api/users/me').then(response => response.data),
  getCurrencies: () =>
    api.get('/prodex/api/currencies').then(response => response.data),





}