import api from '~/api'

export const searchTags = filter => api.post(`/prodex/api/tags/datagrid`, filter).then(response => response.data)

export const searchProductOffersInventory = (filter, isMarketplace) => {
  const url = isMarketplace
    ? '/prodex/api/product-offers/broadcasted/datagrid'
    : '/prodex/api/product-offers/own/datagrid'
  return api.post(url, filter).then(response => response.data)
}
