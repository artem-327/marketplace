import * as AT from './action-types'
import api from './api'

export const filterStatusNetwork = networkStatus => ({
  type: AT.FILTER_NETWORK_STATUS,
  payload: networkStatus
})

export const disconnect = id => ({
  type: AT.DISCONNECT,
  payload: api.disconnect(id)
})

export const reject = id => ({
  type: AT.REJECT,
  payload: api.reject(id)
})

export const accept = id => ({
  type: AT.ACCEPT,
  payload: api.accept(id)
})

export const remove = id => ({
  type: AT.REMOVE,
  payload: api.remove(id)
})

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
    case 'remove':
      remove(id)
      break
    default:
      break
  }
}

export const connectionsStatuses = statuses => ({
  type: AT.CONNECTIONS_STATUSES,
  payload: statuses
})

export const triggerModal = () => ({
  type: AT.TRIGGER_MODAL
})

export const search = id => {
  return async dispatch => {
    await dispatch({
      type: AT.SEARCH_PENDING
    })
    api
      .search(id)
      .then(
        async response =>
          await dispatch({
            type: AT.SEARCH_FULFILLED,
            payload: response.data
          })
      )
      .catch(
        async err =>
          await dispatch({
            type: AT.SEARCH_REJECTED,
            error: err
          })
      )
  }
}
