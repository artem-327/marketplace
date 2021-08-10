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
  },
  tag.toString())
})

export const searchProductOffersInventory = (filter, filterType = 'inventory') => ({
  type: AT.SEARCH_PRODUCT_OFFERS_INVENTORY,
  payload: api.searchProductOffersInventory(
    {
      orFilters: [
        { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${filter.toString()}%`] },
        { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${filter.toString()}%`] },
        { operator: 'LIKE', path: 'ProductOffer.companyProduct.companyGenericProduct.code', values: [`%${filter.toString()}%`] },
        { operator: 'LIKE', path: 'ProductOffer.companyProduct.companyGenericProduct.company.name', values: [`%${filter.toString()}%`] }
      ],
      pageNumber: 0,
      pageSize: 50
    },
    filterType,
    filter.toString()
  )
})

export const searchCasElements = filter => ({
  type: AT.SEARCH_CAS_ELEMENTS,
  payload: api.searchCasElements({
    orFilters: [
      { operator: 'LIKE', path: 'CasProduct.casIndexName', values: [`%${filter.toString()}%`] },
      { operator: 'LIKE', path: 'CasProduct.casNumber', values: [`%${filter.toString()}%`] },
      { operator: 'LIKE', path: 'CasProduct.alternativeNames.alternativeName', values: [`%${filter.toString()}%`] }
    ],
    pageNumber: 0,
    pageSize: 10
  },
  filter.toString())
})

export const clearProductOffers = () => ({ type: AT.SEARCH_CLEAR_PRODUCT_OFFERS })
