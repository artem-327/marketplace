import api from '~/api'

export function findProducts(search) {
  return api.get(`/prodex/api/products/search?search=${search}`)
}

export async function getBroadcastedProductOffers(filter) {
  return api.post(`/prodex/api/product-offers/broadcasted/datagrid/`, filter)
}

export async function searchProducts(text) {
  const response = await api.get(`/prodex/api/products/search?search=${text}&onlyMapped=true`)
  return response
}