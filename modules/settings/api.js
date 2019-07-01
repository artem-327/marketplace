import api from '~/api'
import axios from "axios/index"

export default {

  addAttachment: (attachment, docType, expirationDate) => {
    const formData = new FormData()
    formData.append('file', attachment)

    return api.post(`/prodex/api/attachments?type=${docType}&isTemporary=true`+(expirationDate ? '&expirationDate='+expirationDate : ''), formData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Pragma': 'no-handle-error, no-cache'
      }
    })
  },
  getDocumentTypes: () => api.get(`/prodex/api/document-types/`),
  getUsers: () => api.get('/prodex/api/users').then(response => response.data),
  getRoles: () => api.get('/prodex/api/roles?includeSuperAdmin=false').then(response => response.data),
  userSwitchEnableDisable: id => api.patch(`/prodex/api/users/id/${id}/switch-enabled`),
  getCurrentUser: () =>
    api.get('/prodex/api/users/me').then(response => response.data),
  getWarehouses: () =>
    api.get('/prodex/api/branches/warehouses').then(response => response.data),
  getBranches: () =>
    api.get('/prodex/api/branches').then(response => response.data),
  getCreditCardsData: () =>
    api.get('/prodex/api/payments/cards').then(response => response.data),
  getBankAccountsData: () =>
    api
      .get('/prodex/api/payments/bank-accounts')
      .then(response => response.data),
  getProductsCatalogByString: async (data, limit = 30) => {
    return await
      api.get(`/prodex/api/products/search?limit=${limit}&onlyMapped=${data.unmapped}&search=${data.body}`).then(response => response.data)
  },
  getProductsCatalogByFilter: async (data) => {
    return await
      api.post(`/prodex/api/products/datagrid?unmappedOnly=${data.unmapped}`, data.body).then(response => response.data)
  },

  getProductTypes: async () => {
    return await
      api.get('/prodex/api/packaging-types').then(response => response.data)
  },
  getUnitsType: async () => { return await api.get('/prodex/api/units') },
  getHazardClasses: async () => { return await api.get('/prodex/api/hazard-classes') },
  getPackagingGroups: async () => { return await api.get('/prodex/api/packaging-groups') },
  getProductsWithRequiredParamPar: char =>
    api
      .get(`/prodex/api/product-templates?search=${char}`)
      .then(response => response.data),
  getCountry: () =>
    api.get('/prodex/api/countries').then(response => response.data),
  getCurrencies: () =>
    api.get('/prodex/api/currencies').then(response => response.data),
  getStoredCSV: body => {
    return api
      .get(`/prodex/api/imports/read-stored-csv?temporaryFileId=${body}`)
      .then(response => response.data)
  },


  loadFile: (attachment) => {
    return axios({
      baseURL: '',
      url: attachment.preview,
      method: "GET",
      responseType: "blob"
    }).then(r => new File([r.data], attachment.name, { type: attachment.type }))
  },
  postLinkAttachment: (attachmentId, productId) => api.post(`/prodex/api/attachment-links/to-product?attachmentId=${attachmentId}&productId=${productId}`),
  postNewUser: body => api.post('/prodex/api/users', body),
  postNewWarehouse: body => api.post('/prodex/api/branches/', body),
  postNewCreditCard: body => api.post('/prodex/api/payments/cards/add', body),
  postNewBankAccount: body =>
    api.post('/prodex/api/payments/bank-accounts/add', body),
  postNewProduct: async body => { return await api.post('/prodex/api/products', body) },
  updateProduct: (id, body) => api.put(`/prodex/api/products/id/${id}`, body),

  postNewDwollaAccount: async body => {return await api.post('/prodex/api/payments/dwolla/register', body)},

  postImportProductCSV: (body, id) => {
    return api
      .post(
        `/prodex/api/imports/csv-import-products?temporaryFileId=${id}`,
        body
      )
      .then(response => response.data)
  },
  uploadCSVFile: body => {
    const formData = new FormData()
    formData.append('file', body)
    return api
      .post('/prodex/api/imports/temporary-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => response.data)
  },
  putWarehouse: (branchId, body) =>
    api.put(`/prodex/api/branches/${branchId}`, body),
  // putUser: (id, body) => api.put(`/prodex/api/users/${id}`, body),
  patchUser: (id, body) => api.patch(`/prodex/api/users/id/${id}`, body),
  patchUserRole: (id, body) =>
    api.put(`/prodex/api/users/id/${id}/roles`, body),
  putProduct: (id, body) => api.put(`/prodex/api/products/id/${id}`, body), //! ! delete
  searchCasProduct: (pattern) => api.get(`/prodex/api/cas-products/search?limit=5&pattern=${pattern}`),
  searchUnNumber: (pattern) => api.get(`/prodex/api/un-numbers/search?limit=5&pattern=${pattern}`),
  deleteUser: userId => api.delete(`/prodex/api/users/id/${userId}`).then(() => userId),
  deleteWarehouse: branchId => api.delete(`/prodex/api/branches/${branchId}`).then(() => branchId),
  deleteProduct: productId => api.delete(`/prodex/api/products/id/${productId}`).then(() => productId),
  deleteCreditCard: cardId =>
    api.delete(`/prodex/api/payments/cards/${cardId}`).then(() => cardId),
  deleteBankAccount: bankAccountId =>
    api.delete(`/prodex/api/payments/bank-accounts/${bankAccountId}`).then(() => bankAccountId),
  getAddressSearch: body =>
    api.post('/prodex/api/addresses/search', body).then(response => response.data),
  getDeliveryAddressesByStringRequest: async (value, limit = 30) => {
    return await api.get(`/prodex/api/delivery-addresses/search?limit=${limit}&pattern=${value}`)
      .then(response => response.data)
  },
  getDeliveryAddressesByFilterRequest: async (value) => {
    return await api.post('/prodex/api/delivery-addresses/datagrid', value)
      .then(response => response.data)
  },
  deleteDeliveryAddress: async (id) => api.delete(`/prodex/api/delivery-addresses/id/${id}`).then(() => id),
  getCountries: async () => {
    return await api.get('/prodex/api/countries')
      .then(response => response.data)
  },
  getProvinces: async (id) => {
    return await api.get(`/prodex/api/provinces/country/${id}`)
      .then(response => response.data)
  },
  createDeliveryAddress: async (value) => {
    return await api.post('/prodex/api/delivery-addresses', value)
  },
  updateDeliveryAddresses: async (id, value) => {
    return await api.put(`/prodex/api/delivery-addresses/id/${id}`, value)
  },
  dwollaInitiateVerification: async (id) => {
    return await api.post(`/prodex/api/payments/bank-accounts/${id}/verify/initialize`)
  },
  dwollaFinalizeVerification: async (id, value1, value2) => {
    return await api.post(`/prodex/api/payments/bank-accounts/${id}/verify?value1=${value1}&value2=${value2}`)
  },
  removeAttachment: (aId) => {
    return api.delete('/prodex/api/attachments/' + aId)
  },
  removeAttachmentLink: (itemId, aId) => {
    return api.delete(`/prodex/api/attachment-links/to-product?attachmentId=${aId}&productId=${itemId}`)
  }

}
