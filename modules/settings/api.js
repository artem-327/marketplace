import api from '~/api'

export default {
  getUsers: () => api.get('/prodex/api/users').then(response => response.data),
  getRoles: () => api.get('/prodex/api/roles?includeSuperAdmin=true').then(response => response.data),
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

  postNewUser: body => api.post('/prodex/api/users', body),
  postNewWarehouse: body => api.post('/prodex/api/branches/', body),
  postNewCreditCard: body => api.post('/prodex/api/payments/cards/add', body),
  postNewBankAccount: body =>
    api.post('/prodex/api/payments/bank-accounts/add', body),
  postNewProduct: async body => { return await api.post('/prodex/api/products', body) },
  updateProduct: async (id, body) => {
    await api.put(`/prodex/api/products/id/${id}`, body)
  },

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

}
