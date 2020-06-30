import * as AT from './action-types'
import * as api from './api'

export function getDashboardData() {
  return {
    type: AT.GET_DASHBOARD_DATA,
    payload: api.getDashboardData()
  }
}
