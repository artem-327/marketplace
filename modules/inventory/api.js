import api from '~/api'
import axios from 'axios'
import { generateQueryString } from '~/utils/functions'

export function addAttachment(attachment, docType, additionalParams = {}) {
  let defaultParams = {
    isTemporary: true
  }
  let params = { ...defaultParams, ...additionalParams, type: docType }
  const formData = new FormData()
  formData.append('file', attachment)

  let queryParams = generateQueryString(params)

  return api.post(`/prodex/api/attachments${queryParams}`, formData, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
    }
  })
}

export function addProductOffer(values) {
  return api.post(`/prodex/api/product-offers/`, values)
}

export function downloadAttachment(id) {
  return api.get(`/prodex/api/accounting-documents/id/${id}/download-pdf`, {
    responseType: 'blob'
  })
}

export const updateAttachment = (id, params) => api.put(`/prodex/api/attachments/${id}${generateQueryString(params)}`)

export function findProducts(search) {
  return api.get(`/prodex/api/products/search?search=${search}`)
}

export function getDocumentTypes() {
  return api.get(`/prodex/api/document-types/`)
}

export function getProductConditions() {
  return api.get(`/prodex/api/product-conditions/`)
}

export function getProductForms() {
  return api.get(`/prodex/api/product-forms/`)
}

export function getProductGrades() {
  return api.get(`/prodex/api/product-grades/`)
}

export async function getProductOffer(poId) {
  return api.get(`/prodex/api/product-offers/${poId}`)
}

export async function deleteProductOffer(poId) {
  return api.delete(`/prodex/api/product-offers/${poId}`)
}

export async function getWarehouses() {
  const response = await api.get(`/prodex/api/branches/warehouses/`)
  return response
}

export function linkAttachment(isLot, itemId, aId) {
  return api.post(
    `/prodex/api/attachment-links/to-${isLot ? 'lot' : 'product-offer'}?attachmentId=${aId}&${
      isLot ? 'lotId' : 'productOfferId'
    }=${itemId}`
  )
}

export function loadFile(attachment) {
  return axios({
    baseURL: '',
    url: attachment.preview,
    method: 'GET',
    responseType: 'blob'
  }).then(r => new File([r.data], attachment.name, { type: attachment.type }))
}

export function patchBroadcast(broadcasted, productOfferId) {
  return api.patch(`/prodex/api/product-offers/${productOfferId}/broadcast?broadcasted=${!!broadcasted}`)
}

export function removeAttachment(aId) {
  return api.delete('/prodex/api/attachments/' + aId)
}

export function removeAttachmentLink(isLot, itemId, aId) {
  return api.delete(
    `/prodex/api/attachment-links/to-${isLot ? 'lot' : 'product-offer'}?attachmentId=${aId}&${
      isLot ? 'lotId' : 'productOfferId'
    }=${itemId}`
  )
}

export async function searchManufacturers(text, limit) {
  const response = await api.get(
    `/prodex/api/manufacturers/search?search=${text}${
      Number.isInteger(limit) ? '&limit=' + (limit > 30 ? 30 : limit) : ''
    }`
  )
  return response
}

export async function searchOrigins(text, limit) {
  const response = await api.get(
    `/prodex/api/countries/search?pattern=${text}${
      Number.isInteger(limit) ? '&limit=' + (limit > 30 ? 30 : limit) : ''
    }`
  )
  return response
}

export function updateProductOffer(poId, values) {
  return api.patch(`/prodex/api/product-offers/${poId}`, values)
}

export const getAutocompleteData = searchUrl => api.get(searchUrl).then(response => response.data)
