import api from '~/api'

export const searchTags = filter => api.post(`/prodex/api/tags/datagrid`, filter).then(response => response.data)

export const searchProductOffersInventory = (filter, filterType) => {
  let url
  switch (filterType) {
    case 'marketplace':
      url = '/prodex/api/product-offers/broadcasted/datagrid'
      break
    case 'sharedListings':
      url = '/prodex/api/product-offers/shared-listings/datagrid'
      break
    default:  // Inventory
    url ='/prodex/api/product-offers/own/datagrid'
  }
  return api.post(url, filter).then(response => response.data)
}

export const searchCasElements = filter => api.post(`/prodex/api/cas-products/datagrid`, filter).then(response => response.data)
