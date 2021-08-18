import api from '../../api'

export const getAutocompleteData = searchUrl => api.get(searchUrl).then(response => response.data)

export function getPackagingTypes() {
  return api.get(`/prodex/api/packaging-types`).then(response => response.data)
}

export function getProductConditions() {
  return api.get(`/prodex/api/product-conditions`).then(response => response.data)
}

export function getProductForms() {
  return api.get(`/prodex/api/product-forms`).then(response => response.data)
}

export function getProductGrades() {
  return api.get(`/prodex/api/product-grades`).then(response => response.data)
}

export function getUnits() {
  return api.get(`/prodex/api/units`).then(response => response.data)
}

export function getWarehouses() {
  return api.get(`/prodex/api/branches/warehouses`).then(response => response.data)
}

export function searchManufacturers(text, limit) {
  return api
    .get(
      `/prodex/api/manufacturers/search?search=${encodeURIComponent(text)}${
        Number.isInteger(limit) ? '&limit=' + (limit > 30 ? 30 : limit) : ''
      }`
    )
    .then(response => response.data)
}

export function searchCasNumber(text, limit) {
  return api
    .get(
      `/prodex/api/cas-products/search?pattern=${encodeURIComponent(text)}${
        Number.isInteger(limit) ? '&limit=' + (limit > 30 ? 30 : limit) : ''
      }`
    )
    .then(response => response.data)
}

export const getProvinces = countryId => {
  return api.get(`/prodex/api/provinces/country/${countryId}`).then(response => response.data)
}

export const addPurchaseRequest = body => {
  return api.post('/prodex/api/purchase-requests', body).then(response => response.data)
}

export const editPurchaseRequest = (id, body) => {
  return api.patch(`/prodex/api/purchase-requests/id/${id}`, body).then(response => response.data)
}

export const submitOffer = myOffer => {
  return api.post(`/prodex/api/purchase-request-offers`, myOffer)
}

export const editMyPurchaseOffer = (id, body) => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}`, body)
}

export const deleteMyOfferItem = id => {
  return api.delete(`/prodex/api/purchase-request-offers/id/${id}`).then(response => response.data)
}

export const deletePurchaseRequestItem = id => {
  return api.delete(`/prodex/api/purchase-requests/id/${id}`).then(response => response.data)
}

export const purchaseRequestedItem = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/to-cart`).then(response => response.data)
}

export const rejectRequestedItem = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/reject-last-offer`).then(response => response.data)
}

export const getPurchaseRequest = id => {
  return api.get(`/prodex/api/purchase-requests/id/${id}`).then(response => response.data)
}

export const acceptRequestedItem = id => {
  return api.patch(`/prodex/api/purchase-request-offers/id/${id}/accept-last-offer`).then(response => response.data)
}

export const counterRequestedItem = (id, body) => {
  return api
    .patch(`/prodex/api/purchase-request-offers/id/${id}/counter-last-offer`, body)
    .then(response => response.data)
}

export const matchingProductOfferInfo = (id, productOfferId) => {
  return api
    .get(`/prodex/api/purchase-requests/id/${id}/matching-product-offer-info/${productOfferId}`)
    .then(response => response.data)
}
