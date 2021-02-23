import * as AT from './action-types'
import { NETWORK_STATUS } from './constants'

export const initialState = {
  loading: false,
  networkStatus: NETWORK_STATUS.ALL
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

    default:
      return state
  }
}
