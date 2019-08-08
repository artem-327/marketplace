import * as AT from './action-types'
import * as api from './api'
import axios from "axios/index"

export const getBusinessTypes = () => ({ type: AT.BUSINESS_TYPES_FETCH, payload: api.getBusinessTypes() })

export const getCompanyLogo = (companyId) => ({ type: AT.GET_COMPANY_LOGO, payload: api.getCompanyLogo(companyId) })