import * as AT from './action-types'
import api from '~/api'

export const getBusinessTypes = () => api.get('/prodex/api/business-types').then(response => response.data)
export const getCompanyLogo = (companyId) => api.get(`/prodex/api/companies/id/${companyId}/logo`, {responseType: 'blob'})