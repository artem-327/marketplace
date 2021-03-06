import * as AT from './action-types'
import api from '~/api'

export const getBusinessTypes = () => api.get('/prodex/api/business-types').then(response => response.data)
export const getIndustryTypes = () => api.get('/prodex/api/companies/industry-type').then(response => response.data)

export const getCompanyLogo = companyId =>
  api.get(`/prodex/api/companies/id/${companyId}/logo`, { responseType: 'blob' })
export const getCompanyDocument = attachmentId =>
  api.get(`/prodex/api/attachments/${attachmentId}`)
export const postCompanyLogo = (companyId, companyLogo) => {
  const formData = new FormData()
  formData.append('logo', companyLogo)

  return api.post(`/prodex/api/companies/id/${companyId}/logo`, formData, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
    }
  })
}
export const deleteCompanyLogo = companyId => api.delete(`/prodex/api/companies/id/${companyId}/logo`)

export const getAssociations = dataGrid =>
  api.post(`/prodex/api/associations/datagrid/`, dataGrid).then(response => response.data)

export const getDocsDatagridFilter = filter =>
  api.post('/prodex/api/attachments/datagrid', filter).then(response => response.data)
