import api from '../../api'

export default {
  getNextImmediate: () => api.get(`/prodex/api/messaging-center/next-immediate`).then(response => response.data).catch(e => console.error(e)),
  sendMessageToSupport: (message, sendAsEmail, sendAsNotification) => 
    api.post(`/prodex/api/support/send-message?message=${encodeURIComponent(message)}&sendAsEmail=${sendAsEmail}&sendAsNotification=${sendAsNotification}`)
    .then(response => response.data)
    .catch(e => console.error(e))
}
