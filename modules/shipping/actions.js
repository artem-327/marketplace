import * as AT from './action-types'
import * as api from './api'

export const getQuotes = (params) => ({
  type: AT.SHIPPING_GET_QUOTES,
  payload: api.getQuotes(params)
})
