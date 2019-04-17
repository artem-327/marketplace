import * as AT from './action-types'
import * as api from './api'

export const initShippingForm = () => ({
  type: AT.SHIPPING_FORM_INIT,
  async payload() {
    const zipCodes = await api.getZipCodes()

    return {
      zipCodes
    }
  }
})

export const getShippingQuotes = (params) => ({
  type: AT.SHIPPING_GET_QUOTES,
  payload: api.getQuotes(params)
})
