import api from '~/api'


export const getCart = () => api.get('/prodex/api/cart').then(response => response.data)
export const deleteCart = () => api.delete(`/prodex/api/cart`)
export const addCartItem = ({ productOffer, pkgAmount }) => api.post('/prodex/api/cart/items', { productOffer, pkgAmount }).then(response => response.data)
export const deleteCartItem = (cartItemId) => api.delete(`/prodex/api/cart/items/${cartItemId}`)
export const updateCartItem = ({ cartItemId, pkgAmount }) => api.patch(`/prodex/api/cart/items/${cartItemId}?pkgAmount=${pkgAmount}`).then(response => response.data)
export const getCartItem = (cartItemId) => api.get(`/prodex/api/cart/items/${cartItemId}`)
export const getProductOffer = (id) => api.get(`/prodex/api/product-offers/${id}/`).then(response => response.data)
export const postNewDeliveryAddress = (address) => api.post('/prodex/api/delivery-addresses', address).then(response => response.data)
export const updateDeliveryAddress = (address) => api.put(`/prodex/api/delivery-addresses/id/${address.id}`, address).then(response => response.data)
export const getDeliveryAddresses = () => api.get('/prodex/api/delivery-addresses').then(response => response.data)
export const getPayments = () => api.get('/prodex/api/payments/bank-accounts').then(response => response.data)
export const getShippingQuotes = (countryId, zip) => api.get(`/prodex/api/shipment/cart?destinationCountryId=${countryId}&destinationZIP=${zip}`).then(response => response.data)

export const getRegions = (search) => api.get('/prodex/api/regions', { params: { search: search } }).then(response => response.data.regions)
export const getRegionDetail = (id) => api.get(`/prodex/api/countries/?regionId=${id}`).then(response => response.data)
export const getStates = (search) => api.get(`/prodex/api/countries`, { params: { search: search } }).then(response => response.data)
export const getProvinces = ({ countryId }) => api.get(`/prodex/api/provinces/country/${countryId}`).then(response => response.data)
export const getStateDetail = (id) => api.get(`/prodex/api/companies/?entityId=${id}&entityType=country`).then(response => response.data)
export const getBranches = () => api.get('/prodex/api/branches').then(response => response.data)
export const getWarehouses = () => api.get('/prodex/api/branches/warehouses').then(response => response.data)

export const updateHazmatInfo = (cartItemId, payload) => api.patch(`/prodex/api/cart/items/${cartItemId}/hazard-info`, payload).then(response => response.data)
export const postPurchaseOrder = (data) => api.post('/prodex/api/purchase-orders', data).then(response => response.data)

export const requestManualShipment = queryString => api.post(`/prodex/api/shipment/manual-quote${queryString}`)