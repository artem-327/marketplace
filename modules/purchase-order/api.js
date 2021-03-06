import api from '~/api'
import { generateQueryString } from '../../utils/functions'

export const getCart = () => api.get('/prodex/api/cart').then(response => response.data)
export const getCartCountItems = () =>
  api
    .get('/prodex/api/cart/count-items')
    .then(response => response.data)
    .catch(error => console.error(error))
export const deleteCart = () => api.delete(`/prodex/api/cart`)
export const addCartItem = ({ productOffer, pkgAmount, sellerId }) =>
  api.post('/prodex/api/cart/items', { productOffer, pkgAmount, sellerId }).then(response => response.data)
export const deleteCartItem = cartItemId => api.delete(`/prodex/api/cart/items/${cartItemId}`)
export const updateCartItem = ({ cartItemId, pkgAmount }) =>
  api.patch(`/prodex/api/cart/items/${cartItemId}?pkgAmount=${pkgAmount}`).then(response => response.data)
export const getCartItem = cartItemId => api.get(`/prodex/api/cart/items/${cartItemId}`)
export const getProductOffer = params => api.get(`/prodex/api/product-offers/${params}`).then(response => response.data)
export const postNewDeliveryAddress = address =>
  api.post('/prodex/api/delivery-addresses', address).then(response => response.data)
export const updateDeliveryAddress = (address, id) =>
  api.put(`/prodex/api/delivery-addresses/id/${id}`, address).then(response => response.data)

export const getDeliveryAddresses = (returnWhenEmpty = true) => api.get(`/prodex/api/delivery-addresses/search-broadcasted-by-cart${returnWhenEmpty ? '?returnWhenEmpty=true' : ''}`)
  .then(response => response.data)

export const getDwollaPayments = () =>
  api.get('/prodex/api/payments/bank-accounts/dwolla').then(response => response.data)
export const getVellociPayments = () =>
  api.get('/prodex/api/payments/bank-accounts/velloci').then(response => response.data)
export const getShippingQuotes = (body) =>
  api
    .get(`/prodex/api/shipment/cart-offers${generateQueryString(body)}`)
    .then(response => response.data)

export const getRegions = search =>
  api.get('/prodex/api/regions', { params: { search: search } }).then(response => response.data.regions)
export const getRegionDetail = id => api.get(`/prodex/api/countries/?regionId=${id}`).then(response => response.data)
export const getStates = search =>
  api.get(`/prodex/api/countries`, { params: { search: search } }).then(response => response.data)
export const getProvinces = ({ countryId }) =>
  api.get(`/prodex/api/provinces/country/${countryId}`).then(response => response.data)
export const getStateDetail = id =>
  api.get(`/prodex/api/companies/?entityId=${id}&entityType=country`).then(response => response.data)
export const getBranches = () => api.get('/prodex/api/branches').then(response => response.data)

export const getWarehouses = (returnWhenEmpty = true) => api.get(`/prodex/api/branches/warehouses/search-broadcasted-by-cart${returnWhenEmpty ? '?returnWhenEmpty=true' : ''}`)
  .then(response => response.data)


export const updateHazmatInfo = (cartItemId, payload) =>
  api.patch(`/prodex/api/cart/items/${cartItemId}/hazard-info`, payload).then(response => response.data)
export const postPurchaseOrder = data => api.post('/prodex/api/purchase-orders', data).then(response => response.data)

export const validatePurchaseOrder = data => api.post('/prodex/api/purchase-orders/validate', data)
  .then(response => response.data)
export const mfaGetOptions = () => api.get('/prodex/api/mfa/options').then(response => response.data)
export const mfaRequestCode = option => api
  .post(`/prodex/api/mfa?option=${option}&type=NEW_PURCHASE_ORDER`).then(response => response.data)
export const mfaGetPass = code => api
  .post(`/prodex/api/mfa/validate?code=${code}&type=NEW_PURCHASE_ORDER`).then(response => response.data)

export const requestManualShipment = queryString => api.post(`/prodex/api/shipment/manual-quotes/request${queryString}`)
export const getManualQuoteById = id => api.get(`/prodex/api/shipment/manual-quotes/quote/${id}`).then(response => response.data).catch(e => null)
export const getIdentity = () => api.get('/prodex/api/users/me').then(response => response.data)

export const postNewWarehouse = (createWarehouse, payload) =>
  api
    .post(`/prodex/api/branches?createWarehouse=${createWarehouse ? 'true' : 'false'}`, payload)
    .then(response => response.data)
export const updateWarehouse = (payload, id) =>
  api.put(`/prodex/api/branches/${id}`, payload).then(response => response.data)

export const searchDeliveryAddresses = (val, returnWhenEmpty = true) =>
  api.get(`/prodex/api/delivery-addresses/search-broadcasted-by-cart?pattern=${encodeURIComponent(val)}${returnWhenEmpty ? '&returnWhenEmpty=true' : ''}`).then(response => response.data)
export const searchWarehouses = (val, returnWhenEmpty = true) =>
  api.get(`/prodex/api/branches/warehouses/search-broadcasted-by-cart?pattern=${encodeURIComponent(val)}${returnWhenEmpty ? '&returnWhenEmpty=true' : ''}`).then(response => response.data)
