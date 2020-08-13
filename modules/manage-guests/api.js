import api from '~/api'
import axios from 'axios/index'

export default {
  getDocumentTypes: () => api.get(`/prodex/api/document-types/`).then(response => response.data),
  getUsers: () => api.get('/prodex/api/users').then(response => response.data),
  getRoles: () => api.get('/prodex/api/roles?type=WITHOUT_ADMIN').then(response => response.data),
  getClientCompanyRoles: () =>
    api.get('/prodex/api/roles?type=CLIENT_COMPANY_COMPATIBLE').then(response => response.data),
  userSwitchEnableDisable: id => api.patch(`/prodex/api/users/id/${id}/switch-enabled`),
  getCurrentUser: () => api.get('/prodex/api/users/me').then(response => response.data),
  postNewUser: body => api.post('/prodex/api/users', body).then(response => response.data),
  patchUser: (userId, companyId, body) =>
    api.patch(`/prodex/api/users/id/${userId}?clientCompany=${companyId}`, body).then(r => r.data),
  patchUserRole: (id, body) => api.put(`/prodex/api/users/id/${id}/roles`, body)
    .then(response => response.data),
  deleteUser: (userId, companyId) =>
    api.delete(`/prodex/api/users/id/${userId}?clientCompanyId=${companyId}`).then(() => userId),
  createClientCompany: payload => api.post('/prodex/api/companies/client', payload).then(response => response.data),
  updateClientCompany: (id, payload) =>
    api.put(`/prodex/api/companies/client/${id}`, payload).then(response => response.data),
  deleteClientCompany: id => api.delete(`/prodex/api/companies/client/${id}`).then(response => response.data),
  getCompanyDetails:(id) =>
    api.get(`/prodex/api/companies/id/${id}/all-info`).then(response => response.data)
}
