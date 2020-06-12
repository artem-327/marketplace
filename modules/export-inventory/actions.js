import * as AT from './action-types'
import api from './api'

export const searchCompany = (companyText, limit) => ({
  type: AT.INVENTORY_EXPORT_SEARCH_COMPANY,
  payload: api.searchCompany(companyText, limit)
})