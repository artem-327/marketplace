import api from '~/api'

export const searchTags = filter => api.post(`/prodex/api/tags/datagrid`, filter).then(response => response.data)

export const searchProductOffersInventory = filter =>
  api.post(`/prodex/api/product-offers/own/datagrid`, filter).then(response => response.data)
