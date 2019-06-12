import * as AT from './action-types'
import * as api from './api'
import { toggleFilter, filterSaving, filterApplying } from '~/modules/filter/actions'

export function findProducts(search) {
  return {
    type: AT.MARKETPLACE_FIND_PRODUCTS,
    payload: api.findProducts(search)
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


export const getBroadcastedFilters = () => ({
  type: AT.GET_BROADCASTED_FILTERS,
  payload: api.getBroadcastedFilters()
})

export const saveBroadcastedFilter = (filter) => {
  return async dispatch => {
    dispatch({
      type: AT.SAVE_BROADCASTED_FILTER, async payload() {
        dispatch(filterSaving(true))
        try {
          var data = await api.saveBroadcastedFilter(filter)
        } catch (_) { }
        finally {
          dispatch(filterSaving(false))
        }
        return { data, filter }
      }
    })
  }
}