import * as AT from './action-types'
import * as api from './api'

export function findProducts(search) {
  return {
    type: AT.MARKETPLACE_FIND_PRODUCTS,
    payload: api.findProducts(search)
  }
}

export function getBroadcastedProductOffers(filters = {}, pageSize = 50, pageNumber = 0) {
  let filtersReady = {
    filters: Object.keys(filters).reduce((filtered, option) => {
      switch (option) {
        case 'product':
          filtered.push({
            operator: 'EQUALS',
            path: 'ProductOffer.product.id',
            values: filters[option]
          })
          break
        case 'qntylb':
          filtered.push({
            operator: 'GREATER_THAN_OR_EQUAL_TO',
            path: 'ProductOffer.quantity',
            values: [filters[option]]
          })
          break
        case 'qntyub':
          filtered.push({
            operator: 'LESS_THAN_OR_EQUAL_TO',
            path: 'ProductOffer.quantity',
            values: [filters[option]]
          })
          break
        case 'prclb':
          filtered.push({
            operator: 'GREATER_THAN_OR_EQUAL_TO',
            path: 'ProductOffer.pricingPrice',
            values: [filters[option]]
          })
          break
        case 'prcub':
          filtered.push({
            operator: 'LESS_THAN_OR_EQUAL_TO',
            path: 'ProductOffer.pricingPrice',
            values: [filters[option]]
          })
          break
        case 'pckgs':
          if (filters[option].length) {
            filtered.push({
              operator: 'EQUALS',
              path: 'ProductOffer.product.packagingType.id',
              values: filters[option]
            })
          }
          break
        // TODO: activate search by grades when BE is ready
        /*case 'grade':
          filtered.push({
            operator: 'CONTAINS',
            path: 'ProductOffer.productGrades',
            values: filters[option]
          })
          break*/
        case 'cndt':
          if (filters[option].length) {
            filtered.push({
              operator: 'EQUALS',
              path: 'ProductOffer.productCondition.id',
              values: filters[option]
            })
          }
          break
        case 'frm':
          if (filters[option].length) {
            filtered.push({
              operator: 'EQUALS',
              path: 'ProductOffer.productForm.id',
              values: filters[option]
            })
          }
          break
        case 'agelb':
          filtered.push({
            operator: 'GREATER_THAN_OR_EQUAL_TO',
            path: 'ProductOffer.expirationDate',
            values: [filters[option] + 'T00:00:00Z']
          })
          break
        case 'ageub':
          filtered.push({
            operator: 'LESS_THAN_OR_EQUAL_TO',
            path: 'ProductOffer.expirationDate',
            values: [filters[option] + 'T00:00:00Z']
          })
          break
        case 'assaylb':
          filtered.push({
            operator: 'GREATER_THAN_OR_EQUAL_TO',
            path: 'ProductOffer.assayMin',
            values: [filters[option]]
          })
          break
        case 'assayub':
          filtered.push({
            operator: 'LESS_THAN_OR_EQUAL_TO',
            path: 'ProductOffer.assayMax',
            values: [filters[option]]
          })
          break
      }
      return filtered
    }, [])
  }

  return {
    type: AT.MARKETPLACE_GET_BROADCASTED_PRODUCT_OFFERS,
    async payload() {
      const {data} = await api.getBroadcastedProductOffers({
        ...filtersReady,
        pageSize,
        pageNumber
      })

      return {
        data,
        pageNumber
      }
    }
  }
}

export function searchProducts(text) {
  return {
    type: AT.MARKETPLACE_SEARCH_PRODUCTS,
    async payload() {
      const response = await api.searchProducts(text)

      return {
        data: response.data ? response.data.map(p => ({
          key: p.casProduct ? p.casProduct.id : '',
          id: p ? p.id : '',
          name: p.productName + (p.productCode ? ' (' + p.productCode + ')' : ''),
          casName: p.casProduct ? p.casProduct.casIndexName + ' (' + p.casProduct.casNumber + ')' : ''
        })) : []
      }
    }
  }
}