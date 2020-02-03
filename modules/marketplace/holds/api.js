import api from '~/api'
import { getSafe, generateQueryString } from '~/utils/functions'

export const createHold = params => {
  let queryParams = generateQueryString(params)
  return api.post(`/prodex/api/holds${queryParams}`)
}

export const getMyHolds = () => api.get(`/prodex/api/holds/my`)

export const getForeignHolds = () => api.get(`/prodex/api/holds/foreign`)

export const rejectHold = id => api.patch(`/prodex/api/holds/${id}/reject`)

export const cancelHold = id => api.patch(`/prodex/api/holds/${id}/cancel`)

export const approveHold = id => api.patch(`/prodex/api/holds/${id}/approve`)

export const toCartHold = id => api.patch(`/prodex/api/holds/${id}/to-cart`)
