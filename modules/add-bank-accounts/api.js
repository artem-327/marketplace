import api from '../../api'

export default {
  onEventVelloci: (eventName, metadata) =>
    api
      .post(`/prodex/api/payments/bank-accounts/velloci/add/log/magic-token?eventName=${eventName}`, metadata)
      .then(response => response.data)
      .catch(err => console.log(err)),

  getVellociToken: magicToken =>
    api
      .get(`/prodex/api/payments/bank-accounts/velloci/add/token/magic-token?token=${magicToken}`)
      .then(response => response.data)
      .catch(err => console.log(err)),

  addVellociAcount: (publicToken, metadata) =>
    api
      .post(`/prodex/api/payments/bank-accounts/velloci/add/magic-token?publicToken=${publicToken}`, metadata)
      .then(response => response.data)
      .catch(err => console.log(err))
}
