import * as AT from './action-types'
import api from './api'

export const filterStatusNetwork = networkStatus => ({
  type: AT.FILTER_NETWORK_STATUS,
  payload: networkStatus
})
//TODO
export const disconnect = id => ({
  type: AT.DISCONNECT,
  payload: api.disconnect(id)
})
//TODO
export const reject = id => ({
  type: AT.REJECT,
  payload: api.reject(id)
})
//TODO
export const accept = id => ({
  type: AT.ACCEPT,
  payload: api.accept(id)
})
//TODO
export const buttonActionsDetailRow = (action, id) => {
  switch (action) {
    case 'disconnect':
      disconnect(id)
      break
    case 'reject':
      reject(id)
      break
    case 'accept':
      accept(id)
      break
    default:
      break
  }
}
