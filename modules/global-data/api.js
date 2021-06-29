import api from '../../api'

export default {
  // ok
  getCountries: () => api.get('/prodex/api/countries').then(response => response.data),
  getProductConditions: () => api.get('/prodex/api/product-conditions').then(response => response.data),
  getProductForms: () => api.get('/prodex/api/product-forms').then(response => response.data),
  getProductGrades: () => api.get('/prodex/api/product-grades').then(response => response.data),

  // ! ! update
  getPackagingTypes: () => api.get('/prodex/api/packaging-types').then(response => response.data),


  // ok
  getDocumentTypes: () => api.get(`/prodex/api/document-types`).then(response => response.data),
  getCompanyUserRoles: () => api.get('/prodex/api/roles?type=COMPANY_COMPATIBLE').then(response => response.data),
  getUserRoles: () => api.get('/prodex/api/roles?type=WITHOUT_ADMIN').then(response => response.data),
  getAdminRoles: () => api.get('/prodex/api/roles?type=ONLY_ADMIN').then(response => response.data),


  // test and update
  getHazardClasses: () => api.get('/prodex/api/hazard-classes').then(response => response.data),
  getPackagingGroups: () => api.get('/prodex/api/packaging-groups').then(response => response.data),
  getUnits: () => api.get('/prodex/api/units').then(response => response.data),
  getMeasureTypes: () => api.get('/prodex/api/measure-types').then(response => response.data),

  // ok
  getLanguages: () => api.get('/prodex/api/cms/languages').then(response => response.data)
}