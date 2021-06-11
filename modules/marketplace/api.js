import api from '../../api'
import { generateQueryString } from '../../utils/functions'

export const findProducts = search => api.get(`/prodex/api/company-products/search?search=${search}`)

export const getAutocompleteData = (pattern, limit = 15) =>
  api
    .get(`/prodex/api/product-groups/search?limit=${limit}&pattern=${encodeURIComponent(pattern)}`)
    .then(response => response.data)

export const createHold = params => {
  let queryParams = generateQueryString(params)
  return api.post(`/prodex/api/holds${queryParams}`)
}

export const getCountHolds = () => api.get(`/prodex/api/holds/my/count`)

export const rejectHold = id => api.patch(`/prodex/api/holds/${id}/reject`)

export const cancelHold = id => api.patch(`/prodex/api/holds/${id}/cancel`)

export const approveHold = id => api.patch(`/prodex/api/holds/${id}/approve`)

export const toCartHold = id => api.patch(`/prodex/api/holds/${id}/to-cart`)

export const makeOffer = body => {
  return api.post(`/prodex/api/product-offer-bids`, body).then(response => response.data)
}

export const deleteOffer = id => {
  return api.delete(`/prodex/api/product-offer-bids/id/${id}`).then(response => response.data)
}

export const acceptOffer = id => {
  return api.patch(`/prodex/api/product-offer-bids/id/${id}/accept-last-offer`).then(response => response.data)
}

export const rejectOffer = id => {
  return api.patch(`/prodex/api/product-offer-bids/id/${id}/reject-last-offer`).then(response => response.data)
}

export const counterOffer = (id, body) => {
  return api.patch(`/prodex/api/product-offer-bids/id/${id}/counter-last-offer`, body).then(response => response.data)
}

export const addOfferToCart = id => {
  return api.patch(`/prodex/api/product-offer-bids/id/${id}/to-cart`).then(response => response.data)
}

export const searchCompanies = () => {
  return api.get('/prodex/api/companies/search?onlyWithInventory=true').then(response => response.data)
}