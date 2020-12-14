import api from '~/api'

import { getSafe, generateQueryString } from '~/utils/functions'

export default {
  postRegisterVelloci: (body, companyId) => {
    let queryParams = companyId ? `/${companyId}` : ''
    return api.post(`/prodex/api/payments/velloci/register${queryParams}`, body)
  },
  postUploadDocuments: (files, companyId) => {
    const formData = new FormData()
    for (let i in files) {
      formData.append('files', files[i])
    }
    const id = companyId ? `/${companyId}` : ''
    api.post(`/prodex/api/payments/velloci/documents/upload${id}`, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
  },
  getEntityTypes: () => api.get('/prodex/api/payments/velloci/enums/entity-types').then(response => response.data),
  getNaicsCodes: () => api.get('/prodex/api/payments/velloci/enums/naics-codes').then(response => response.data),
  getBusinessRoles: () => api.get('/prodex/api/payments/velloci/enums/business-roles').then(response => response.data),
  getEntityDocuments: () =>
    api.get('/prodex/api/payments/velloci/enums/entity-documents').then(response => response.data),
  getPoliticallyExposedPersons: () =>
    api.get('/prodex/api/payments/velloci/enums/politically-exposed-persons').then(response => response.data),
  getTinTypes: () => api.get('/prodex/api/payments/velloci/enums/tin-types').then(response => response.data),
  getBusinessDetails: () => api.get('/prodex/api/payments/velloci/business-details').then(response => response.data),
  inviteBeneficialOwners: (body, companyId) => api
    .post(`/prodex/api/payments/velloci/users/invite-beneficial-owners?companyId=${companyId}`, body)
    .then(response => response.data),
  registerBeneficialOwner: (body, token) => api
    .post(`/prodex/api/payments/velloci/users/register-beneficial-owner?token=${token}`, body)
    .then(response => response.data),
  checkMagicToken: (token) => api
    .get(`/prodex/api/users/me/magic-token?token=${token}`).then(response => response.data)
}
