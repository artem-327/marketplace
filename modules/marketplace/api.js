import api from '~/api'
import { generateQueryString } from '~/utils/functions'

export const findProducts = search => api.get(`/prodex/api/company-products/search?search=${search}`)

export const getAutocompleteData = (pattern, limit = 15) =>
  api
    .get(
      `/prodex/api/product-groups/search?limit=${limit}&pattern=${encodeURIComponent(
        pattern
      )}`
    )
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

// ! ! ! ! ! ******************************************************************************

export const makeOffer = body => {
  return api.post(`/prodex/api/purchase-request-offers`, body).then(response => response.data)
}

export const deleteOffer = id => {
  return api.delete(`/prodex/api/purchase-request-offers/id/${id}`).then(response => response.data)
}

export const buyerAcceptOffer = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/accept-last-offer`).then(response => response.data)
}

export const buyerDenyOffer = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/accept-last-offer`).then(response => response.data)
}

export const buyerCounterOffer = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/accept-last-offer`).then(response => response.data)
}

export const sellerAcceptOffer = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/accept-last-offer`).then(response => response.data)
}

export const sellerDenyOffer = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/accept-last-offer`).then(response => response.data)
}

export const sellerCounterOffer = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/accept-last-offer`).then(response => response.data)
}