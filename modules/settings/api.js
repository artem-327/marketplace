import api from '../../api'
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

  addDeaAttachment: (attachment, branchId) => {
    const formData = new FormData()
    formData.append('file', attachment)

    return api.post(`/prodex/api/branches/uploadDeaListCertificate/${branchId}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Pragma: 'no-handle-error, no-cache'
      }
    })
  },

  addTaxExemptAttachment: (attachment, branchId) => {
    const formData = new FormData()
    formData.append('file', attachment)

    return api.post(`/prodex/api/branches/uploadTaxExemptCertificate/${branchId}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Pragma: 'no-handle-error, no-cache'
      }
    })
  },

  dwollaAddVerificationDocument: (attachment, docType) => {
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
  getUsers: () => api.get('/prodex/api/users').then(response => response.data),
  userSwitchEnableDisable: id => api.patch(`/prodex/api/users/id/${id}/switch-enabled`),
  getCurrentUser: () => api.get('/prodex/api/users/me').then(response => response.data),
  getWarehouses: () => api.get('/prodex/api/branches/warehouses').then(response => response.data),
  getBranches: () => api.get('/prodex/api/branches').then(response => response.data),
  getCreditCardsData: () => api.get('/prodex/api/payments/cards').then(response => response.data),
  getDwollaBankAccountsData: () => api.get('/prodex/api/payments/bank-accounts/dwolla').then(response => response.data),
  getVellociBankAccountsData: () =>
    api.get('/prodex/api/payments/bank-accounts/velloci').then(response => response.data).catch(err => console.error(err)),
  getDwollaAccBalance: () => api.get('/prodex/api/payments/dwolla/balance').then(response => response.data),
  getVellociAccBalance: () => api.get('/prodex/api/payments/velloci/balance').then(response => response.data),
  getDwollaBeneficiaryOwners: () =>
    api.get(`/prodex/api/payments/dwolla/beneficiary-owners`).then(response => response.data),
  getProductsCatalogByString: async (data, limit = 30) => {
    return await api
      .get(
        `/prodex/api/products/search?limit=${limit}&onlyMapped=${data.unmapped}&search=${encodeURIComponent(data.body)}`
      )
      .then(response => response.data)
  },
  getProductsCatalogByFilter: async data => {
    return await api
      .post(`/prodex/api/company-products/datagrid?unmappedOnly=${data.unmapped}`, data.body)
      .then(response => response.data)
  },
  getProductsWithRequiredParamPar: char =>
    api.get(`/prodex/api/product-templates?search=${char}`).then(response => response.data),
  getCurrencies: () => api.get('/prodex/api/currencies').then(response => response.data),
  getStoredCSV: body => {
    return api
      .get(`/prodex/api/imports/read-stored-spreadsheet?temporaryFileId=${body}`)
      .then(response => response.data)
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
    api.post(
      `/prodex/api/attachment-links/to-company-product?attachmentId=${attachmentId}&companyProductId=${productId}`
    ),
  postNewUser: body => api.post('/prodex/api/users', body).then(response => response.data),
  postNewWarehouse: (createWarehouse, body) =>
    api.post(`/prodex/api/branches?createWarehouse=${createWarehouse ? 'true' : 'false'}`, body),
  postNewCreditCard: body => api.post('/prodex/api/payments/cards/add', body),
  postNewDwollaBankAccount: body => api.post('/prodex/api/payments/bank-accounts/dwolla', body),
  postNewProduct: body => api.post('/prodex/api/company-products', body),
  updateProduct: (id, body) => api.put(`/prodex/api/company-products/id/${id}`, body),
  postNewDwollaAccount: body => api.post('/prodex/api/payments/dwolla/register', body),
  postImportProductCSV: (body, id) => {
    return api
      .post(`/prodex/api/imports/company-products/spreadsheet-import?temporaryFileId=${id}`, body)
      .then(response => response.data)
      .catch(error => console.error(error))
  },
  postImportProductMap: (id, mapId) => {
    return api
      .post(`/prodex/api/imports/company-products/spreadsheet-import/existing?mapId=${mapId}&temporaryFileId=${id}`)
      .then(response => response.data)
  },
  postImportCompanyGenericProductCSV: (body, id) => {
    return api
      .post(`/prodex/api/imports/company-generic-products/spreadsheet-import?temporaryFileId=${id}`, body)
      .then(response => response.data)
  },
  postImportCompanyGenericProductMap: (id, mapId) => {
    return api
      .post(
        `/prodex/api/imports/company-generic-products/spreadsheet-import/existing?mapId=${mapId}&temporaryFileId=${id}`
      )
      .then(response => response.data)
  },
  postImportProductOfferCSV: (body, id, paramBroadcast) => {
    return api
      .post(`/prodex/api/imports/product-offers/spreadsheet-import?temporaryFileId=${id}${paramBroadcast}`, body)
      .then(response => response.data)
  },
  postImportProductOfferMap: (id, mapId, paramBroadcast) => {
    return api
      .post(
        `/prodex/api/imports/product-offers/spreadsheet-import/existing?mapId=${mapId}&temporaryFileId=${id}${paramBroadcast}`
      )
      .then(response => response.data)
  },
  uploadCSVFile: (file, type) => {
    const formData = new FormData()
    formData.append('file', new Blob([file], { type }), file.name)
    return api.post('/prodex/api/imports/temporary-files', formData).then(response => response.data)
  },
  getCSVMapCompanyGenericProduct: () =>
    api.get('/prodex/api/imports/company-generic-products/import-maps').then(response => response.data),
  postCSVMapCompanyGenericProduct: data => api.post('/prodex/api/imports/company-generic-products/import-maps', data),
  putCSVMapCompanyGenericProduct: (mapId, data) =>
    api.put(`/prodex/api/imports/company-generic-products/import-maps/${mapId}`, data),
  deleteCSVMapCompanyGenericProduct: mapId =>
    api.delete(`/prodex/api/imports/company-generic-products/import-maps/${mapId}`),

  getCSVMapProductOffer: () =>
    api.get('/prodex/api/imports/product-offers/import-maps').then(response => response.data),
  postCSVMapProductOffer: data => api.post('/prodex/api/imports/product-offers/import-maps', data),
  putCSVMapProductOffer: (mapId, data) => api.put(`/prodex/api/imports/product-offers/import-maps/${mapId}`, data),
  deleteCSVMapProductOffer: mapId => api.delete(`/prodex/api/imports/product-offers/import-maps/${mapId}`),

  postImportCompaniesCSV: (body, id) => {
    return api
      .post(`/prodex/api/imports/companies/spreadsheet-import?temporaryFileId=${id}`, body)
      .then(response => response.data)
  },
  postImportCompaniesMap: (id, mapId) => {
    return api
      .post(`/prodex/api/imports/companies/spreadsheet-import/existing?mapId=${mapId}&temporaryFileId=${id}`)
      .then(response => response.data)
  },
  getCSVMapCompanies: () => api.get('/prodex/api/imports/companies/import-maps').then(response => response.data),
  postCSVMapCompanies: data => api.post('/prodex/api/imports/companies/import-maps', data),
  putCSVMapCompanies: (mapId, data) => api.put(`/prodex/api/imports/companies/import-maps/${mapId}`, data),
  deleteCSVMapCompanies: mapId => api.delete(`/prodex/api/imports/companies/import-maps/${mapId}`),

  putWarehouse: (branchId, body) => api.put(`/prodex/api/branches/${branchId}`, body).then(r => r.data),
  // putUser: (id, body) => api.put(`/prodex/api/users/${id}`, body),
  patchUser: (id, body) => api.patch(`/prodex/api/users/id/${id}`, body).then(r => r.data),
  patchUserRole: (id, body) => api.put(`/prodex/api/users/id/${id}/roles`, body),
  putProduct: (id, body) => api.put(`/prodex/api/products/id/${id}`, body), //! ! delete
  searchCasProduct: pattern =>
    api.get(`/prodex/api/cas-products/search?limit=5&pattern=${encodeURIComponent(pattern)}`),
  searchUnNumber: pattern => api.get(`/prodex/api/un-numbers/search?limit=5&pattern=${encodeURIComponent(pattern)}`),
  deleteUser: userId => api.delete(`/prodex/api/users/id/${userId}`).then(() => userId),
  deleteWarehouse: branchId => api.delete(`/prodex/api/branches/${branchId}`).then(() => branchId),
  deleteProduct: productId => api.delete(`/prodex/api/company-products/id/${productId}`).then(() => productId),
  deleteCreditCard: cardId => api.delete(`/prodex/api/payments/cards/${cardId}`).then(() => cardId),
  deleteDwollaBankAccount: bankAccountId =>
    api.delete(`/prodex/api/payments/bank-accounts/dwolla/${bankAccountId}`).then(() => bankAccountId),
  deleteVellociBankAccount: bankAccountId =>
    api.delete(`/prodex/api/payments/bank-accounts/velloci/${bankAccountId}`).then(() => bankAccountId),
  getAddressSearch: body => api.post('/prodex/api/addresses/search', body).then(response => response.data),
  getDeliveryAddressesByStringRequest: async (value, limit = 30) => {
    return await api
      .get(`/prodex/api/delivery-addresses/search?limit=${limit}&pattern=${encodeURIComponent(value)}`)
      .then(response => response.data)
  },
  getDeliveryAddressesByFilterRequest: async value => {
    return await api.post('/prodex/api/delivery-addresses/datagrid', value).then(response => response.data)
  },
  deleteDeliveryAddress: async id => api.delete(`/prodex/api/delivery-addresses/id/${id}`).then(() => id),
  getProvinces: async id => {
    return await api.get(`/prodex/api/provinces/country/${id}`).then(response => response.data)
  },
  createDeliveryAddress: async value => {
    return await api.post('/prodex/api/delivery-addresses', value)
  },
  updateDeliveryAddresses: (id, value) => api.put(`/prodex/api/delivery-addresses/id/${id}`, value),
  dwollaInitiateVerification: async id => {
    return await api
      .post(`/prodex/api/payments/bank-accounts/dwolla/${id}/verify/initialize`)
      .then(response => response.data)
  },
  dwollaFinalizeVerification: async (id, value1, value2) => {
    return await api.post(`/prodex/api/payments/bank-accounts/dwolla/${id}/verify?value1=${value1}&value2=${value2}`)
  },
  dwollaSetPreferred: async id => {
    return await api.patch(`/prodex/api/payments/bank-accounts/${id}/preferred`)
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
  updateLogisticsAccount: (id, payload) =>
    api.put(`/prodex/api/logistics-accounts/id/${id}`, payload).then(response => response.data),
  deleteLogisticsAccount: id => api.delete(`/prodex/api/logistics-accounts/id/${id}`).then(() => id),
  getSettings: role =>
    api
      .get(`/prodex/api/settings/${role}`)
      .then(response => response.data)
      .catch(err => err),
  updateSettings: (role, payload) => api.patch(`/prodex/api/settings/${role}`, payload).then(response => response.data),
  getBusinessClassifications: () => api.get('/prodex/api/business-classifications').then(response => response.data),
  dwollaGetVerificationDocumentTypes: () =>
    api.get('/prodex/api/payments/dwolla/documents/types').then(response => response.data),
  setPreferredLanguage: language =>
    api.patch(`/prodex/api/users/me/preferred-language?language=${language.language}`).then(() => language),
  searchCompanyGenericProduct: (searchQuery, limit) =>
    api
      .get(`/prodex/api/company-generic-products/search?pattern=${searchQuery}&limit=${limit}`)
      .then(response => response.data),
  getNmfcNumbersByString: pattern =>
    api
      .get(`/prodex/api/nmfc-numbers/search?limit=5&pattern=${encodeURIComponent(pattern)}`)
      .then(response => response.data),
  removeAttachmentLinkCompanyProduct: (itemId, aId) =>
    api.delete(`/prodex/api/attachment-links/to-company-product?attachmentId=${aId}&companyProductId=${itemId}`),
  attachmentLinksToBranch: (attachmentId, branchId) =>
    api.post(`/prodex/api/attachment-links/to-branch?attachmentId=${attachmentId}&branchId=${branchId}`),
  getBranch: branchId => api.get(`/prodex/api/branches/${branchId}`),
  removeAttachmentLinkToBranch: (attachmentId, branchId) =>
    api.delete(`/prodex/api/attachment-links/to-branch?attachmentId=${attachmentId}&branchId=${branchId}`),
  addVerificationDocumentsOwner: (attachment, id, docType) => {
    const formData = new FormData()
    formData.append('file', attachment)
    return api.post(`/prodex/api/payments/dwolla/beneficiary-owners/${id}/documents/upload?type=${docType}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
  },
  setPrimaryUser: (companyId, userId) =>
    api.patch(`/prodex/api/companies/${companyId}/primary-user?userId=${userId}`).then(response => response.data),
  setPrimaryBranch: (companyId, branchId) =>
    api
      .patch(`/prodex/api/companies/id/${companyId}/primary-branch?branchId=${branchId}`)
      .then(response => response.data),
  getCompanyDetails: id => api.get(`/prodex/api/companies/id/${id}/all-info`).then(response => response.data),

  vellociOnEvent: (eventName, metadata) =>
    api
      .post(`/prodex/api/payments/bank-accounts/velloci/add/log?eventName=${eventName}`, metadata)
      .then(response => response.data),
  vellociGetToken: () =>
    api.get('/prodex/api/payments/bank-accounts/velloci/add/token').then(response => response.data).catch(err => console.error(err)),
  vellociAddAcount: (publicToken, metadata) =>
    api
      .post(`/prodex/api/payments/bank-accounts/velloci/add?publicToken=${publicToken}`, metadata)
      .then(response => response.data)
      .catch(e => console.error(e)),
  deleteInstitution: institutionId =>
    api
      .delete(`/prodex/api/payments/bank-accounts/velloci/institution/${institutionId}`)
      .then(response => response.data),
  inviteToAddBankAccounts: (companyId, emailAddress, name) => {
    const id = companyId ? `companyId=${companyId}&` : ''
    return api
      .post(
        `/prodex/api/payments/bank-accounts/velloci/invite-to-add-bank-accounts?${id}emailAddress=${emailAddress}&name=${name}`
      )
      .then(response => response.data)
  },
  getCompanyUser: id =>
    api
      .get(`/prodex/api/settings/company-user/${id}`)
      .then(response => response.data)
      .catch(err => console.error(err)),
  putTradeCriteria: body =>
    api
      .put('/prodex/api/tradepass/my-criteria', body)
      .then(response => response.data)
      .catch(err => err),
  getTradeCriteria: () =>
    api
      .get('/prodex/api/tradepass/my-criteria')
      .then(response => response.data)
      .catch(err => err),
  updateSettingsCompanyUser: (userId, request) =>
    api
      .patch(`/prodex/api/settings/company-user/${userId}`, request)
      .then(response => response.data)
      .catch(err => err),
  addCustomer: customerData =>
    api
      .post(`/prodex/api/customers/`, customerData)
      .then(response => response.data)
      .catch(err => err),
  updateCustomer: (customerId, customerData) =>
    api
      .patch(`/prodex/api/customers/${customerId}`, customerData)
      .then(response => response.data)
      .catch(err => err),
  deleteCustomer: id => api.delete(`/prodex/api/customers/${id}`),
  addCustomerWarehouse: (customerId, warehouse) =>
    api
      .post(`/prodex/api/customers/warehouses?customerId=${customerId}`, warehouse)
      .then(response => response.data)
      .catch(err => err),
  updateCustomerWarehouse: (customerId, warehouseId, warehouse) =>
    api
      .patch(`/prodex/api/customers/warehouses?customerId=${customerId}&warehouseId=${warehouseId}`, warehouse)
      .then(response => response.data)
      .catch(err => err),
  deleteCustomerWarehouse: (customerId, warehouseId) =>
    api.delete(`/prodex/api/customers/warehouses?customerId=${customerId}&warehouseId=${warehouseId}`),
  getUser: userId =>
    api
      .get(`/prodex/api/users/id/${userId}`)
      .then(res => res.data)
      .catch(e => console.error(e)),
  getInsuranceDocuments: () => api.get(`/prodex/api/tradepass-insurance-documents`),
  getInsuranceDocumentsTypes: () => api.get(`/prodex/api/tradepass-insurance-documents/types`),
  uploadInsuranceDocument: (file, type) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/prodex/api/tradepass-insurance-documents?type=${type}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
  },
  getMyTradePass: () =>
    api
      .get(`/prodex/api/tradepass/my-tradepass`)
      .then(res => res.data)
      .catch(err => console.error(err)),
  downloadStatement: (companyId, year, month, type) =>
    api.get(`/prodex/api/payments/velloci/transactions/export/${type}?companyId=${companyId}&month=${month}&year=${year}`, {
      responseType: 'blob'
    })
}
