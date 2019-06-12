import api from '~/api'

export function findProducts(search) {
  return api.get(`/prodex/api/products/search?search=${search}`)
}

export async function searchProducts(text) {
  const response = await api.get(`/prodex/api/products/search?search=${text}&onlyMapped=true`)
  return response
}

export const getBroadcastedFilters = () => api.get('/prodex/api/product-offers/broadcasted/datagrid/saved-filters').then(response => response.data)

export const saveBroadcastedFilter = filter => api.post('/prodex/api/product-offers/broadcasted/datagrid/saved-filters', filter).then(response => response.data)
