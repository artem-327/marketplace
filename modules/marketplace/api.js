import api from '~/api'

export async function getBroadcastedProductOffers(filter) {
  return api.post(`/prodex/api/product-offers/broadcasted/datagrid/`, filter)
}