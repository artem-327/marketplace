import * as AT from './action-types'
import * as api from './api'

export const initShipingForm = () => ({
  type: AT.SHIPING_FORM_INIT,
  async payload() {
    const zipCodes = await api.getZipCodes()

    return {
      zipCodes
    }
  }
})

export const getShipingQuotes = (params) => ({
  type: AT.SHIPING_GET_QUOTES,
  payload: api.getQuotes(params)
})