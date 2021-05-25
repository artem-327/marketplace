import axios from 'axios'

export default {
  onEventVelloci: (eventName, metadata, magicToken) =>
    axios
      .post(
        `/prodex/api/payments/bank-accounts/velloci/add/log/magic-token?eventName=${eventName}&token=${magicToken}`,
        metadata
      )
      .then(response => response.data)
      .catch(err => console.error(err.message)),

  getVellociToken: magicToken =>
    axios
      .get(`/prodex/api/payments/bank-accounts/velloci/add/token/magic-token?token=${magicToken}`)
      .then(response => response.data)
      .catch(err => console.error(err.message)),

  getVellociBusinessId: magicToken =>
    axios
      .get(`/prodex/api/users/me/magic-token?token=${magicToken}`)
      .then(response => response.data)
      .catch(err => console.error(err.message)),

  addVellociAcount: (magicToken, metadata) =>
    axios
      .post(`/prodex/api/payments/bank-accounts/velloci/add/magic-token?token=${magicToken}`, metadata)
      .then(response => response.data)
      .catch(err => console.error(err.message)),
}
