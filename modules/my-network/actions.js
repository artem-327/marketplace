import * as AT from './action-types'
import api from './api'

export const filterStatusNetwork = networkStatus => ({
  type: AT.FILTER_NETWORK_STATUS,
  payload: networkStatus
})
