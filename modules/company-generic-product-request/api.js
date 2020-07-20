import api from '~/api'

export const createCompanyGenericProductRequest = body =>
  api.post('/prodex/api/company-generic-product-requests', body).then(response => response.data)
