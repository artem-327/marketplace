// Api
import api from '../../api'
// Services
import { generateQueryString } from '../../utils/functions'

export function addAttachment(attachment, docType, additionalParams = {}) {
  let defaultParams = {
    isTemporary: false
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
  return api.post(`/prodex/api/product-offers/`, values).then(response => response.data)
}

export function downloadAttachmentPdf(id) {
  return api.get(`/prodex/api/accounting-documents/id/${id}/download-pdf`, {
    responseType: 'blob'
  })
}
export function downloadAttachment(id) {
  return api.get(`/prodex/api/attachments/${id}/download`, {
    responseType: 'blob'
  })
}

export const updateAttachment = (id, params) => api.put(`/prodex/api/attachments/${id}${generateQueryString(params)}`)

export function findProducts(search) {
  return api.get(`/prodex/api/products/search?search=${search}`)
}

export async function getProductOffer(poId) {
  return api.get(`/prodex/api/product-offers/${poId}`)
}

export async function getSharedProductOffer(poId) {
  return api
    .post('/prodex/api/product-offers/shared-listings/datagrid', {
      orFilters: [],
      filters: [{ operator: 'EQUALS', path: 'ProductOffer.id', values: [poId] }],
      pageSize: 50,
      pageNumber: 0
    })
    .then(response => response.data)
}

export async function deleteProductOffer(poId) {
  return api.delete(`/prodex/api/product-offers/${poId}`)
}

export async function getWarehouses() {
  const response = await api.get(`/prodex/api/branches/warehouses/`)
  return response
}

export function loadFile(attachment) {
  return api({
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
  return api.patch(`/prodex/api/product-offers/${poId}`, values).then(response => response.data)
}

export function updateGroupedProductOffer(poId, values) {
  return api.patch(`/prodex/api/product-offers/${poId}/grouped-offer`, values).then(response => response.data)
}

export const getAutocompleteData = searchUrl => api.get(searchUrl).then(response => response.data)

export const groupOffers = request =>
  api.post(`/prodex/api/product-offers/group-offers/`, request).then(response => response.data)

export const attachmentLinksToProductOffer = (attachmentId, productOfferId) =>
  api.post(
    `/prodex/api/attachment-links/to-product-offer?attachmentId=${attachmentId}&productOfferId=${productOfferId}`
  )

export const removeAttachmentLinkProductOffer = (attachmentId, productOfferId) =>
  api.delete(
    `/prodex/api/attachment-links/to-product-offer?attachmentId=${attachmentId}&productOfferId=${productOfferId}`
  )

export const getMarkUp = poId => api.get(`/prodex/api/product-offers/${poId}/mark-up`).then(response => response.data)

export function updateMarkUp(poId, values) {
  return api
    .patch(`/prodex/api/product-offers/${poId}/mark-up`, values)
    .then(response => response.data)
    .catch(e => console.error(e))
}

export const saveTdsAsTemplate = (templateName, tdsFields) =>
  api
    .post('/prodex/api/technical-datasheet-templates', { name: templateName, template: tdsFields })
    .then(response => response.data)

export const getTdsTemplates = () =>
  api.get('/prodex/api/technical-datasheet-templates').then(response => response.data)

export const deleteTdsTemplate = templateId =>
  api.delete(`/prodex/api/technical-datasheet-templates/${templateId}`).then(response => response.data)
