import * as AT from './action-types'
import * as api from './api'

export function getCountryCodes() {
  return {
    type: AT.PHONE_NUMBER_GET_COUNTRY_CODES,
    payload: api.getCountryCodes()
  }
}
