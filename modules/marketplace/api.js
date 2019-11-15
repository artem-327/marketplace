import api from '~/api'

export const findProducts = search =>
  api.get(`/prodex/api/company-products/search?search=${search}`)

export const getAutocompleteData = (pattern, limit = 15) =>
  api
    .get(
      `/prodex/api/echo-products/search/all-alternatives?limit=${limit}&pattern=${pattern}`
    )
    .then(response => response.data)
