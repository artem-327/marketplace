import axios from 'axios'

const api = {
  getCart: () => axios.get('/prodex/api/cart').then(response => response.data),
  deleteCart: () => axios.delete(`/prodex/api/cart`),
  addCartItem: ({productOffer, pkgAmount}) =>
    axios.post('/prodex/api/cart/items', {productOffer, pkgAmount}).then(response => response.data),
  deleteCartItem: cartItemId => axios.delete(`/prodex/api/cart/items/${cartItemId}`),
  updateCartItem: ({cartItemId, pkgAmount}) =>
    axios.patch(`/prodex/api/cart/items/${cartItemId}?pkgAmount=${pkgAmount}`).then(response => response.data),
  getCartItem: cartItemId => axios.get(`/prodex/api/cart/items/${cartItemId}`),
  getProductOffer: id => axios.get(`/prodex/api/product-offers/${id}/applyrules`).then(response => response.data),
  // getOrderDetail: (id) => axios.get(`/prodex/api/orders/${id}`).then(response => response.data),
  postNewDeliveryAddress: address =>
    axios.post('/prodex/api/delivery-addresses', address).then(response => response.data),
  updateDeliveryAddress: address =>
    axios.put(`/prodex/api/delivery-addresses/id/${address.id}`, address).then(response => response.data),
  getDeliveryAddresses: () => axios.get('/prodex/api/delivery-addresses').then(response => response.data),
  getPayments: () => axios.get('/prodex/api/payments/cards').then(response => response.data),
  getShippingQuotes: (countryId, zip) =>
    axios
      .get('/prodex/api/shipment/cart', {
        params: {
          destinationCountryId: countryId,
          destinationZIP: zip
        }
      })
      .then(response => response.data)
}

export default api
