import * as AT from './action-types'
import * as api from './api'

export const initShipingForm = () => ({
  type: AT.SHIPPING_FORM_INIT,
  payload: api.getZipCodes()
})

export const getShipingQuotes = params => ({
  type: AT.SHIPPING_GET_QUOTES,
  payload: api.getQuotes(params)
})

export const clearShippingQuotes = params => ({
  type: AT.SHIPPING_CLEAR_QUOTES,
  payload: null
})

export const getZipCodes = (queryParams) => ({
  type: AT.SHIPPING_GET_ZIP_CODES,
  payload: api.getZipCodes(queryParams)
})

export const getCountries = (queryParams) => ({
  type: AT.SHIPPING_GET_COUNTRIES,
  payload: api.getCountries(queryParams)
})
