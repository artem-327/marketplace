import api from '~/api'
import axios from 'axios/index'

export default {
  addAttachment: (attachment, docType, expirationDate) => {
    const formData = new FormData()
    formData.append('file', attachment)

    return api.post(
      `/prodex/api/attachments?type=${docType}&isTemporary=true` +
        (expirationDate ? '&expirationDate=' + expirationDate : ''),
      formData,
      {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Pragma: 'no-handle-error, no-cache'
        }
      }
    )
  },

  addVerificationDocument: (attachment, docType) => {
    const formData = new FormData()
    formData.append('file', attachment)

    return api.post(`/prodex/api/payments/dwolla/documents/upload?type=${docType}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
  },
  getDocumentTypes: () => api.get(`/prodex/api/document-types/`),
  getUsers: () => api.get('/prodex/api/users').then(response => response.data),
  getRoles: () => api.get('/prodex/api/roles?includeSuperAdmin=false').then(response => response.data),
  userSwitchEnableDisable: id => api.patch(`/prodex/api/users/id/${id}/switch-enabled`),
  getCurrentUser: () => api.get('/prodex/api/users/me').then(response => response.data),
  getWarehouses: () => api.get('/prodex/api/branches/warehouses').then(response => response.data),
  getBranches: () => api.get('/prodex/api/branches').then(response => response.data),
  getCreditCardsData: () => api.get('/prodex/api/payments/cards').then(response => response.data),
  getBankAccountsData: () => api.get('/prodex/api/payments/bank-accounts').then(response => response.data),
  getDwollaAccBalance: () => api.get('/prodex/api/payments/dwolla/balance').then(response => response.data),
  getProductsCatalogByString: async (data, limit = 30) => {
    return await api
      .get(`/prodex/api/products/search?limit=${limit}&onlyMapped=${data.unmapped}&search=${data.body}`)
      .then(response => response.data)
  },
  getProductsCatalogByFilter: async data => {
    return await api
      .post(`/prodex/api/company-products/datagrid?unmappedOnly=${data.unmapped}`, data.body)
      .then(response => response.data)
  },
  getProductTypes: async () => {
    return await api.get('/prodex/api/packaging-types').then(response => response.data)
  },
  getUnitsType: async () => {
    return await api.get('/prodex/api/units')
  },
  getHazardClasses: async () => {
    return await api.get('/prodex/api/hazard-classes')
  },
  getPackagingGroups: async () => {
    return await api.get('/prodex/api/packaging-groups')
  },
  getProductsWithRequiredParamPar: char =>
    api.get(`/prodex/api/product-templates?search=${char}`).then(response => response.data),
  getCountry: () => api.get('/prodex/api/countries').then(response => response.data),
  getCurrencies: () => api.get('/prodex/api/currencies').then(response => response.data),
  getStoredCSV: body => {
    return api.get(`/prodex/api/imports/read-stored-csv?temporaryFileId=${body}`).then(response => response.data)
  },

  loadFile: attachment => {
    return axios({
      baseURL: '',
      url: attachment.preview,
      method: 'GET',
      responseType: 'blob'
    }).then(r => new File([r.data], attachment.name, { type: attachment.type }))
  },
  postLinkAttachment: (attachmentId, productId) =>
    api.post(`/prodex/api/attachment-links/to-product?attachmentId=${attachmentId}&productId=${productId}`),
  postNewUser: body => api.post('/prodex/api/users', body),
  postNewWarehouse: body => api.post('/prodex/api/branches/', body),
  postNewCreditCard: body => api.post('/prodex/api/payments/cards/add', body),
  postNewBankAccount: body => api.post('/prodex/api/payments/bank-accounts/add', body),
  postNewProduct: body => api.post('/prodex/api/company-products', body),
  updateProduct: (id, body) => api.put(`/prodex/api/company-products/id/${id}`, body),
  postNewDwollaAccount: body => api.post('/prodex/api/payments/dwolla/register', body),
  postImportProductCSV: (body, id) => {
    return api
      .post(`/prodex/api/imports/company-products/csv-import?temporaryFileId=${id}`, body)
      .then(response => response.data)
      .catch(error => console.error(error))
  },
  postImportEchoProductCSV: (body, id) => {
    return api
      .post(`/prodex/api/imports/echo-products/csv-import?temporaryFileId=${id}`, body)
      .then(response => response.data)
  },
  postImportProductOfferCSV: (body, id) => {
    return api
      .post(`/prodex/api/imports/product-offers/csv-import?temporaryFileId=${id}`, body)
      .then(response => response.data)
  },
  uploadCSVFile: body => {
    const formData = new FormData()
    formData.append('file', new Blob([body], { type: 'text/plain' }))

    return api
      .post('/prodex/api/imports/temporary-files', formData, {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
      .then(response => response.data)
  },
  getCSVMapEchoProduct: () => api.get('/prodex/api/imports/echo-products/import-maps').then(response => response.data),
  postCSVMapEchoProduct: data => api.post('/prodex/api/imports/echo-products/import-maps', data),
  putCSVMapEchoProduct: (mapId, data) => api.put(`/prodex/api/imports/echo-products/import-maps/${mapId}`, data),
  deleteCSVMapEchoProduct: mapId => api.delete(`/prodex/api/imports/echo-products/import-maps/${mapId}`),
  getCSVMapProductOffer: () =>
    api.get('/prodex/api/imports/product-offers/import-maps').then(response => response.data),
  postCSVMapProductOffer: data => api.post('/prodex/api/imports/product-offers/import-maps', data),
  putCSVMapProductOffer: (mapId, data) => api.put(`/prodex/api/imports/product-offers/import-maps/${mapId}`, data),
  deleteCSVMapProductOffer: mapId => api.delete(`/prodex/api/imports/product-offers/import-maps/${mapId}`),
  putWarehouse: (branchId, body) => api.put(`/prodex/api/branches/${branchId}`, body).then(r => r.data),
  // putUser: (id, body) => api.put(`/prodex/api/users/${id}`, body),
  patchUser: (id, body) => api.patch(`/prodex/api/users/id/${id}`, body),
  patchUserRole: (id, body) => api.put(`/prodex/api/users/id/${id}/roles`, body),
  putProduct: (id, body) => api.put(`/prodex/api/products/id/${id}`, body), //! ! delete
  searchCasProduct: pattern => api.get(`/prodex/api/cas-products/search?limit=5&pattern=${pattern}`),
  searchUnNumber: pattern => api.get(`/prodex/api/un-numbers/search?limit=5&pattern=${pattern}`),
  deleteUser: userId => api.delete(`/prodex/api/users/id/${userId}`).then(() => userId),
  deleteWarehouse: branchId => api.delete(`/prodex/api/branches/${branchId}`).then(() => branchId),
  deleteProduct: productId => api.delete(`/prodex/api/company-products/id/${productId}`).then(() => productId),
  deleteCreditCard: cardId => api.delete(`/prodex/api/payments/cards/${cardId}`).then(() => cardId),
  deleteBankAccount: bankAccountId =>
    api.delete(`/prodex/api/payments/bank-accounts/${bankAccountId}`).then(() => bankAccountId),
  getAddressSearch: body => api.post('/prodex/api/addresses/search', body).then(response => response.data),
  getDeliveryAddressesByStringRequest: async (value, limit = 30) => {
    return await api
      .get(`/prodex/api/delivery-addresses/search?limit=${limit}&pattern=${value}`)
      .then(response => response.data)
  },
  getDeliveryAddressesByFilterRequest: async value => {
    return await api.post('/prodex/api/delivery-addresses/datagrid', value).then(response => response.data)
  },
  deleteDeliveryAddress: async id => api.delete(`/prodex/api/delivery-addresses/id/${id}`).then(() => id),
  getCountries: async () => {
    return await api.get('/prodex/api/countries').then(response => response.data)
  },
  getProvinces: async id => {
    return await api.get(`/prodex/api/provinces/country/${id}`).then(response => response.data)
  },
  createDeliveryAddress: async value => {
    return await api.post('/prodex/api/delivery-addresses', value)
  },
  updateDeliveryAddresses: (id, value) => api.put(`/prodex/api/delivery-addresses/id/${id}`, value),
  dwollaInitiateVerification: async id => {
    return await api.post(`/prodex/api/payments/bank-accounts/${id}/verify/initialize`).then(response => response.data)
  },
  dwollaFinalizeVerification: async (id, value1, value2) => {
    return await api.post(`/prodex/api/payments/bank-accounts/${id}/verify?value1=${value1}&value2=${value2}`)
  },
  removeAttachment: aId => {
    return api.delete('/prodex/api/attachments/' + aId)
  },
  removeAttachmentLink: (itemId, aId) => {
    return api.delete(`/prodex/api/attachment-links/to-product?attachmentId=${aId}&productId=${itemId}`)
  },
  resendWelcomeEmail: userId =>
    api
      .get(`/prodex/api/users/id/${userId}/email/welcome`)
      .then(response => response.data)
      .catch(e => console.error(e.clientMessage)),
  getLogisticsProviders: () => api.get('/prodex/api/logistics-providers/').then(response => response.data),
  createLogisticsAccount: payload =>
    api.post('/prodex/api/logistics-accounts/', payload).then(response => response.data),
  getLogisticsAccounts: () => api.get('/prodex/api/logistics-accounts/').then(response => response.data),
  updateLogisticsAccount: payload =>
    api.put(`/prodex/api/logistics-accounts/id/${payload.id}`, payload).then(response => response.data),
  deleteLogisticsAccount: id => api.delete(`/prodex/api/logistics-accounts/id/${id}`).then(() => id),
  getSettings: role => api.get(`/prodex/api/settings/${role}`).then(response => response.data),
  updateSettings: (role, payload) => api.patch(`/prodex/api/settings/${role}`, payload).then(response => response.data),
  getBusinessClassifications: () => api.get('/prodex/api/business-classifications').then(response => response.data),
  getVerificationDocumentTypes: () =>
    api.get('/prodex/api/payments/dwolla/documents/types').then(response => response.data),
  getLanguages: () => api.get('/prodex/api/cms/languages/').then(response => response.data),
  setPreferredLanguage: language =>
    api.patch(`/prodex/api/users/me/preferred-language?language=${language.language}`).then(() => language),
  searchEchoProducts: (searchQuery, limit) =>
    api.get(`/prodex/api/echo-products/search?pattern=${searchQuery}&limit=${limit}`).then(response => response.data),
  getNmfcNumbersByString: pattern =>
    api.get(`/prodex/api/nmfc-numbers/search?limit=5&pattern=${pattern}`).then(response => response.data)
}
