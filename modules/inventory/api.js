import api from '~/api'
import axios from 'axios'

export function addAttachment(attachment, docType) {
    const formData = new FormData()
    formData.append('file', attachment)

    return api.post(`/prodex/api/attachments?type=${docType}&isTemporary=true`, formData, {headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }})
}

export function addProductOffer(values) {
    return api.post(`/prodex/api/product-offers/`, values)
}

export async function getProductOffer(poId) {
    return api.get(`/prodex/api/product-offers/${poId}`)
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
    }).then(r => new File([r.data], attachment.name, {type: attachment.type}))
}

export async function searchProducts(text) {
    const response = await api.get(`/prodex/api/products?search=${text}`)

    return response
}

export function updateProductOffer(poId, values) {
  return api.patch(`/prodex/api/product-offers/${poId}`, values)
}