import api from '~/api'
import axios from 'axios'

export function addAttachment(attachment, docType) {
  const formData = new FormData()
  formData.append('file', attachment)

  return api.post(`/prodex/api/attachments?type=${docType}&isTemporary=true`, formData, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
    }
  })
}

export function addProductOffer(values) {
  return api.post(`/prodex/api/product-offers/`, values)
}

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
  return api.post(`/prodex/api/attachment-links/to-${isLot ? 'lot' : 'product-offer'}?attachmentId=${aId}&${isLot ? 'lotId' : 'productOfferId'}=${itemId}`)
}

export function loadFile(attachment) {
  return axios({
    baseURL: '',
    url: attachment.preview,
    method: "GET",
    responseType: "blob"
  }).then(r => new File([r.data], attachment.name, { type: attachment.type }))
}

export function patchBroadcast(broadcasted, productOfferId) {
  return api.patch(`/prodex/api/product-offers/${productOfferId}/broadcast?broadcasted=${!!broadcasted}`)
}

export function removeAttachment(aId) {
  return api.delete('/prodex/api/attachments/' + aId)
}

export function removeAttachmentLink(isLot, itemId, aId) {
  return api.delete(`/prodex/api/attachment-links/to-${isLot ? 'lot' : 'product-offer'}?attachmentId=${aId}&${isLot ? 'lotId' : 'productOfferId'}=${itemId}`)
}

export async function searchManufacturers(text) {
  const response = await api.get(`/prodex/api/manufacturers/search?search=${text}`)
  return response
}

export async function searchOrigins(text) {
  const response = await api.get(`/prodex/api/countries/search?pattern=${text}`)
  return response
}

export async function searchProducts(text) {
  const response = await api.get(`/prodex/api/products/search?search=${text}&onlyMapped=false`)
  return response
}

export function updateProductOffer(poId, values) {
  return api.patch(`/prodex/api/product-offers/${poId}`, values)
}

export const getSavedFilters = () => api.get('/prodex/api/product-offers/own/datagrid/saved-filters').then((response) => response.data)

export const saveFilter = filter => api.post('/prodex/api/product-offers/own/datagrid/saved-filters', filter).then(response => response.data)
