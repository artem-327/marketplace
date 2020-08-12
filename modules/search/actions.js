import * as AT from './action-types'
import * as api from './api'

export const searchTags = tag => ({
  type: AT.SEARCH_TAGS,
  payload: api.searchTags({
    orFilters: [
      {
        operator: 'LIKE',
        path: 'Tag.name',
        values: [tag.toString()]
      }
    ],
    pageNumber: 0,
    pageSize: 50
  })
})

export const searchProductOffersInventory = (filter, isMarketplace) => ({
  type: AT.SEARCH_PRODUCT_OFFERS_INVENTORY,
  payload: api.searchProductOffersInventory(
    {
      orFilters: [
        { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${filter.toString()}%`] },
        { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${filter.toString()}%`] }
      ],
      pageNumber: 0,
      pageSize: 50
    },
    isMarketplace
  )
})

export const clearProductOffers = () => ({ type: AT.SEARCH_CLEAR_PRODUCT_OFFERS })
