import api from '~/api'

export default {
  postVellociRegister: body => api.post('/prodex/api/payments/velloci/register', body)
}
