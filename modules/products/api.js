import api from '../../api'

import { generateQueryString } from '../../utils/functions'

export default {
  getHazardClasses: () => api.get('/prodex/api/hazard-classes'),
  getPackagingGroups: () => api.get('/prodex/api/packaging-groups'),
  deleteCasProduct: id => api.delete(`/prodex/api/cas-products/id/${id}`).then(() => id),
  postNewCasProduct: value => api.post('/prodex/api/cas-products', value),
  updateCasProduct: (id, value) => api.put(`/prodex/api/cas-products/id/${id}`, value)
    .then(response => response.data),
  getAlternativeProductNames: value => api.get(`/prodex/api/cas-products/alternative-names/cas-product/${value}`),
  postNewProductName: (productId, value) =>
    api.post(`/prodex/api/cas-products/alternative-names/cas-product/${productId}`, value),
  updateProductName: (id, value) => api.patch(`/prodex/api/cas-products/alternative-names/id/${id}`, value),
  deleteProductName: id => api.delete(`/prodex/api/cas-products/alternative-names/id/${id}`),
  deleteCompanyGenericProduct: id => api.delete(`/prodex/api/company-generic-products/id/${id}`),
  searchCasProduct: pattern =>
    api
      .get(`/prodex/api/cas-products/search?limit=5&pattern=${encodeURIComponent(pattern)}`)
      .then(response => response.data),
  putCompanyGenericProducts: (id, values) =>
    api.put(`/prodex/api/company-generic-products/id/${id}/`, values).then(response => response.data),
  postCompanyGenericProducts: values =>
    api.post(`/prodex/api/company-generic-products`, values).then(response => response.data),
  searchManufacturers: (text, limit) =>
    api.get(
      `/prodex/api/manufacturers/search?search=${text}${
        Number.isInteger(limit) ? '&limit=' + (limit > 30 ? 30 : limit) : ''
      }`
    ),
  loadFile: attachment => {
    return api({
      baseURL: '',
      url: attachment.preview,
      method: 'GET',
      responseType: 'blob'
    }).then(r => new File([r.data], attachment.name, { type: attachment.type }))
  },
  addAttachment: (attachment, docType, additionalParams = {}) => {
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
  },
  linkAttachment: (echoId, attachmentId) =>
    api.post(
      `/prodex/api/attachment-links/to-company-generic-product?attachmentId=${attachmentId}&companyGenericProductId=${echoId}`
    ),
  removeAttachmentLink: (echoId, attachmentId) =>
    api.delete(
      `/prodex/api/attachment-links/to-company-generic-product?attachmentId=${attachmentId}&companyGenericProductId=${echoId}`
    ),
  removeAttachment: attachmentId => api.delete(`/prodex/api/attachments/${attachmentId}`),
  getUnNumbersByString: async (value, limit = 30) => {
    const { data } = await api.get(`/prodex/api/un-numbers/search?limit=${limit}&pattern=${encodeURIComponent(value)}`)
    return data
  },
  searchTags: filter => api.post(`/prodex/api/tags/datagrid`, filter).then(response => response.data),
  searchMarketSegments: filter =>
    api.post(`/prodex/api/market-segments/datagrid`, filter).then(response => response.data),
  getCompanyGenericProduct: id => api.get(`/prodex/api/company-generic-products/id/${id}`),
  getAlternativeCompanyGenericProductsNames: async id => {
    const { data } = await api.get(
      `/prodex/api/company-generic-products/alternative-names/company-generic-product/${id}`
    )
    return data
  },
  postNewCompanyGenericProductsAltName: (id, data) =>
    api.post(`/prodex/api/company-generic-products/alternative-names/company-generic-product/${id}`, data),
  updateCompanyGenericProductsAltName: (id, value) =>
    api.patch(`/prodex/api/company-generic-products/alternative-names/id/${id}`, value),
  deleteCompanyGenericProductsAltName: id =>
    api.delete(`/prodex/api/company-generic-products/alternative-names/id/${id}`),
  postProductGroups: request => api.post(`/prodex/api/product-groups`, request),
  putProductGroups: (id, request) => api.put(`/prodex/api/product-groups/${id}`, request),
  deleteProductGroups: id => api.delete(`/prodex/api/product-groups/${id}`),
  searchProductGroups: filter =>
    api.post(`/prodex/api/product-groups/datagrid`, filter).then(response => response.data),
  searchCompany: (companyText, limit = 30) =>
    api
      .get(`/prodex/api/companies/search?limit=${limit}&pattern=${encodeURIComponent(companyText)}`)
      .then(response => response.data)
}
