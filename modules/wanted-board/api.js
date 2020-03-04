import api from '~/api'
import { generateQueryString } from '~/utils/functions'


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

export function getWarehouses() {
  return api.get(`/prodex/api/branches/warehouses`).then(response => response.data)
}

export function searchManufacturers(text, limit) {
  return api.get(
    `/prodex/api/manufacturers/search?search=${text}${
      Number.isInteger(limit) ? '&limit=' + (limit > 30 ? 30 : limit) : ''
      }`
  ).then(response => response.data)
}

export const getCountries = () => {
  return api.get('/prodex/api/countries').then(response => response.data)
}