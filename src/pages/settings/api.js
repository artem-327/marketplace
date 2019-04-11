import api from '~/api'

export default {
  getUsers: () => api.get('/prodex/api/users').then(response => response.data),
  getCurrentUser: () =>
    api.get('/prodex/api/users/me').then(response => response.data),
  getWarehouses: () =>
    api.get('/prodex/api/branches/warehouses/').then(response => response.data),
  getBranches: () =>
    api.get('/prodex/api/branches').then(response => response.data),
  getCreditCardsData: () =>
    api.get('/prodex/api/payments/cards').then(response => response.data),
  getBankAccountsData: () =>
    api
      .get('/prodex/api/payments/bank-accounts')
      .then(response => response.data),
  getProductsCatalog: () =>
    api.get('/prodex/api/products').then(response => response.data),
  getProductTypes: () =>
    api.get('/prodex/api/packaging-types').then(response => response.data),
  getProductsWithRequiredParamPar: char =>
    api
      .get(`/prodex/api/product-templates?search=${char}`)
      .then(response => response.data),
  getCountry: () =>
    api.get('/prodex/api/countries').then(response => response.data),

  postNewUser: body => api.post('/prodex/api/users', body),
  postNewWarehouse: body => api.post('/prodex/api/branches/', body),
  postNewCreditCard: body => api.post('/prodex/api/payments/cards/add', body),
  postNewBankAccount: body =>
    api.post('/prodex/api/payments/bank-accounts/add', body),
  postNewProduct: body => api.post('/prodex/api/products', body),

  putWarehouse: (branchId, body) =>
    api.put(`/prodex/api/branches/${branchId}`, body),
  putUser: (id, body) => api.put(`/prodex/api/users/${id}`, body),
  putProduct: (id, body) => api.put(`/prodex/api/products/${id}`, body),

  deleteUser: userId => api.delete(`/prodex/api/users/${userId}`),
  deleteWarehouse: branchId => api.delete(`/prodex/api/branches/${branchId}`),
  deleteProduct: branchId => api.delete(`/prodex/api/products/${branchId}`),
  deleteCreditCard: cardId =>
    api.delete(`/prodex/api/payments/cards/${cardId}`),
  deleteBankAccount: bankAccountId =>
    api.delete(`/prodex/api/payments/bank-accounts/${bankAccountId}`)
}
