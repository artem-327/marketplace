import * as AT from './action-types'
import { NETWORK_STATUS } from './constants'

export const initialState = {
  loading: false,
  networkStatus: NETWORK_STATUS.ALL,
  all: 0,
  active: 0,
  pending: 0,
  requested: 0
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.FILTER_NETWORK_STATUS: {
      return {
        ...state,
        networkStatus: payload
      }
    }

    case AT.CONNECTIONS_STATUSES: {
      return {
        ...state,
        all: payload.all,
        active: payload.active,
        pending: payload.pending,
        requested: payload.requested
      }
    }

    default:
      return state
  }
}
