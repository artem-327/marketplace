import * as AT from './action-types'
import * as api from './api'

export const getBusinessTypes = () => ({ type: AT.BUSINESS_TYPES_FETCH, payload: api.getBusinessTypes() })