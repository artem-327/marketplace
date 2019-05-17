import api from '~/api'

export default {
  getUsers: () => api.get('/prodex/api/users').then(response => response.data),
  getRoles: () => api.get('/prodex/api/roles').then(response => response.data),
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
  getProductsCatalog: () =>
    api.get('/prodex/api/products/search').then(response => response.data),
  getProductTypes: () =>
    api.get('/prodex/api/packaging-types').then(response => response.data),
  getUnitsType: () => api.get('/prodex/api/units'),
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
  postNewProduct: body => api.post('/prodex/api/products', body),
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
    api.patch(`/prodex/api/users/id/${id}/add-roles`, body),
  putProduct: (id, body) => api.put(`/prodex/api/products/id/${id}`, body),
  searchCasProduct: (pattern) => api.get(`/prodex/api/cas-products/search?limit=5&pattern=${pattern}`),

  deleteUser: userId => api.delete(`/prodex/api/users/id/${userId}`),
  deleteWarehouse: branchId => api.delete(`/prodex/api/branches/${branchId}`),
  deleteProduct: branchId => api.delete(`/prodex/api/products/id/${branchId}`),
  deleteCreditCard: cardId =>
    api.delete(`/prodex/api/payments/cards/${cardId}`),
  deleteBankAccount: bankAccountId =>
    api.delete(`/prodex/api/payments/bank-accounts/${bankAccountId}`)
}
