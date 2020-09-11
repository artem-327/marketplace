import api from '~/api'

export default {
  postRegisterVelloci: body => api.post('/prodex/api/payments/velloci/register', body),
  getEntityTypes: body => api.post('/prodex/api/payments/velloci/enums/entity-types', body)
}
