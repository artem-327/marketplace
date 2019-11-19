import api from '~/api'

export const getCountryCodes = () => {
  return api.get('/prodex/api/countries').then(response => response.data)
}
