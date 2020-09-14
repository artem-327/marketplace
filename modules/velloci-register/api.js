import api from '~/api'

export default {
  postRegisterVelloci: body => api.post('/prodex/api/payments/velloci/register', body),
  getEntityTypes: () => api.get('/prodex/api/payments/velloci/enums/entity-types'),
  getNaicsCodes: () => api.get('/prodex/api/payments/velloci/enums/naics-codes')
}
