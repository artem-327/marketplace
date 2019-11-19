import api from '~/api'

export const getProvinces = countryId =>
  api.get(`/prodex/api/provinces/country/${countryId}`).then(response => response.data)
