import * as AT from './action-types'
import api from './api'
import { Datagrid } from '../datagrid'

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

export const invite = id => ({
  type: AT.INVITE,
  payload: api.invite(id)
})

export const triggerModal = () => ({
  type: AT.TRIGGER_MODAL
})

export const buttonActionsDetailRow = (action, id) => {
  return async dispatch => {
    switch (action) {
      case 'disconnect':
        await dispatch(disconnect(id))
        break
      case 'reject':
        await dispatch(reject(id))
        break
      case 'accept':
        await dispatch(accept(id))
        break
      case 'remove':
        await dispatch(remove(id))
        break
      case 'cancel':
        await dispatch(triggerModal())
        break
      case 'invite':
        await dispatch(invite(id))
        await dispatch(triggerModal())
        break
      default:
        break
    }
    Datagrid?.loadData()
  }
}

export const connectionsStatuses = statuses => ({
  type: AT.CONNECTIONS_STATUSES,
  payload: statuses
})

export const search = id => {
  return async dispatch => {
    if (!id)
      await dispatch({
        type: AT.SEARCH_REJECTED,
        error: "Doesn't exist id for API request"
      })
    await dispatch({
      type: AT.SEARCH_PENDING
    })
    await api
      .search(id)
      .then(response =>
        dispatch({
          type: AT.SEARCH_FULFILLED,
          payload: response.data
        })
      )
      .catch(err =>
        dispatch({
          type: AT.SEARCH_REJECTED,
          error: err
        })
      )
  }
}

export const getConnection = id => ({
  type: AT.GET_CONNECTION,
  payload: api.getConnection(id)
})

export const showBluePallet = () => ({
  type: AT.BLUE_PALLET_SHOW,
  payload: {}
})

export const hideBluePallet = () => ({
  type: AT.BLUE_PALLET_HIDE,
  payload: {}
})
