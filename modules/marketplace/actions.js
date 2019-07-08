import * as AT from './action-types'
import * as api from './api'

export function findProducts(search) {
  return {
    type: AT.MARKETPLACE_FIND_PRODUCTS,
    payload: api.findProducts(search)
  }
}