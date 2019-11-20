import * as AT from './action-types'
import * as api from './api'

export const getBusinessTypes = () => ({ type: AT.BUSINESS_TYPES_FETCH, payload: api.getBusinessTypes() })

export const getCompanyLogo = companyId => ({ type: AT.GET_COMPANY_LOGO, payload: api.getCompanyLogo(companyId) })

export const postCompanyLogo = (companyId, companyLogo) => ({
  type: AT.POST_COMPANY_LOGO,
  payload: api.postCompanyLogo(companyId, companyLogo)
})

export const deleteCompanyLogo = companyId => ({
  type: AT.DELETE_COMPANY_LOGO,
  payload: api.deleteCompanyLogo(companyId)
})
