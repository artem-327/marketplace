import api from '~/api'

export function findProducts(search) {
  return api.get(`/prodex/api/products/search?search=${search}`)
}