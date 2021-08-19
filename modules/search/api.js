import api from '../../api'
import { GA_TRACK_QUERY } from '../../constants'

export const searchTags = (filter, searchQuery) => 
  api.post(searchQuery
    ? `/prodex/api/tags/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(searchQuery)}`
    : `/prodex/api/tags/datagrid`, filter
  )
  .then(response => response.data)

export const searchProductOffersInventory = (filter, filterType, searchQuery) => {
  let url
  switch (filterType) {
    case 'marketplace':
      url = searchQuery
        ? `/prodex/api/product-offers/broadcasted/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(searchQuery)}`
        : '/prodex/api/product-offers/broadcasted/datagrid'
      break
    case 'sharedListings':
      url = searchQuery
        ? `/prodex/api/product-offers/shared-listings/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(searchQuery)}`
        : '/prodex/api/product-offers/shared-listings/datagrid'
      break
    default:  // Inventory
    url = searchQuery
      ? `/prodex/api/product-offers/own/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(searchQuery)}`
      : '/prodex/api/product-offers/own/datagrid'
  }
  return api.post(url, filter).then(response => response.data)
}

export const searchCasElements = (filter, searchQuery) => 
  api.post(searchQuery
    ? `/prodex/api/cas-products/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(searchQuery)}`
    : `/prodex/api/cas-products/datagrid`, filter
  )
  .then(response => response.data)
