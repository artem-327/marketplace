import axios from 'axios'

const api = {
  getCart: () => axios.get('/prodex/api/cart').then(response => response.data),
  deleteCart: () => axios.delete(`/prodex/api/cart`),
  addCartItem: ({ productOffer, quantity }) => axios.post('/prodex/api/cart/items', { productOffer, quantity }).then(response => response.data),
  deleteCartItem: (cartItemId) => axios.delete(`/prodex/api/cart/items/${cartItemId}`),
  updateCartItem: ({ cartItemId, quantity }) => axios.patch(`/prodex/api/cart/items/${cartItemId}?quantity=${quantity}`).then(response => response.data),
  getCartItem: (cartItemId) => axios.get(`/prodex/api/cart/items/${cartItemId}`),
  getProductOffer: (id) => axios.get(`/prodex/api/product-offers/${id}/applyrules`).then(response => response.data),
  // getOrderDetail: (id) => axios.get(`/prodex/api/orders/${id}`).then(response => response.data),
  postNewDeliveryAddress: (address) => axios.post('/prodex/api/delivery-addresses', address),
  putDeliveryAddressEdit: (address) => axios.put(`/prodex/api/delivery-addresses/${address.id}`, address),
  getDeliveryAddresses: () => axios.get('/prodex/api/delivery-addresses').then(response => response.data),
  getPayments: () => axios.get('/prodex/api/payments/cards').then(response => response.data),
  getShippingQuotes: (countryId, zip) => axios.get('/prodex/api/shipment/cart', {
    params: {
      destinationCountryId: countryId, destinationZIP: zip
    }
  }).then(response => response.data)
}

export default api
