import api from '../../api'

export default {
  getCountries: () => api.get('/prodex/api/countries').then(response => response.data),
  getProductConditions: () => api.get('/prodex/api/product-conditions').then(response => response.data),
  getProductForms: () => api.get('/prodex/api/product-forms').then(response => response.data),
  getProductGrades: () => api.get('/prodex/api/product-grades').then(response => response.data),
  getPackagingTypes: () => api.get('/prodex/api/packaging-types').then(response => response.data),
  getDocumentTypes: () => api.get(`/prodex/api/document-types`).then(response => response.data),
  getCompanyUserRoles: () => api.get('/prodex/api/roles?type=COMPANY_COMPATIBLE').then(response => response.data),
  getUserRoles: () => api.get('/prodex/api/roles?type=WITHOUT_ADMIN').then(response => response.data),
  getAdminRoles: () => api.get('/prodex/api/roles?type=ONLY_ADMIN').then(response => response.data),
  getHazardClasses: () => api.get('/prodex/api/hazard-classes').then(response => response.data),
  getPackagingGroups: () => api.get('/prodex/api/packaging-groups').then(response => response.data)
}