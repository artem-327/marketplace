import api from '~/api'

export const findProducts = search => api.get(`/prodex/api/products/search?search=${search}`)

export const getAutocompleteData = (pattern, limit = 15) => api.get(`/prodex/api/products/broadcasted/search?limit=${limit}&pattern=${pattern}&onlyMapped=true`).then(response => response.data)
