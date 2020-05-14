import api from '~/api'

import { getSafe, generateQueryString } from '~/utils/functions'

export default {
  getHazardClasses: () => api.get('/prodex/api/hazard-classes'),
  getPackagingGroups: () => api.get('/prodex/api/packaging-groups'),
  deleteCasProduct: () => api.delete(`/prodex/api/cas-products/id/${id}`).then(() => id),
  postNewCasProduct: () => api.post('/prodex/api/cas-products', value),
  updateCasProduct: () => api.put(`/prodex/api/cas-products/id/${id}`, value),
  getAlternativeProductNames: () => api.get(`/prodex/api/cas-products/alternative-names/cas-product/${value}`),
  postNewProductName: () => api.post(`/prodex/api/cas-products/alternative-names/cas-product/${productId}`, value),
  updateProductName: () => api.patch(`/prodex/api/cas-products/alternative-names/id/${id}`, value),
  deleteProductName: () => api.delete(`/prodex/api/cas-products/alternative-names/id/${id}`),
  deleteEchoProduct: () => api.delete(`/prodex/api/echo-products/id/${id}`)
}
// export const getHazardClasses = async () => {
//   const { data } = await api.get('/prodex/api/hazard-classes')
//   return data
// }

// export async function getPackagingGroups() {
//   const { data } = await api.get('/prodex/api/packaging-groups')
//   return data
// }

//export const deleteCasProduct = id => api.delete(`/prodex/api/cas-products/id/${id}`).then(() => id)

// export async function postNewCasProduct(value) {
//   const { data } = await api.post('/prodex/api/cas-products', value)
//   return data
// }

// export async function updateCasProduct(id, value) {
//   const { data } = await api.put(`/prodex/api/cas-products/id/${id}`, value)
//   return data
// }

// export async function getAlternativeProductNames(value) {
//   const { data } = await api.get(`/prodex/api/cas-products/alternative-names/cas-product/${value}`)
//   return data
// }

// export async function postNewProductName(productId, value) {
//   const { data } = await api.post(`/prodex/api/cas-products/alternative-names/cas-product/${productId}`, value)
//   return data
// }

// export async function updateProductName(id, value) {
//   const { data } = await api.patch(`/prodex/api/cas-products/alternative-names/id/${id}`, value)
//   return data
// }

// export async function deleteProductName(id) {
//   await api.delete(`/prodex/api/cas-products/alternative-names/id/${id}`)
// }

// export const deleteEchoProduct = id => api.delete(`/prodex/api/echo-products/id/${id}`)
