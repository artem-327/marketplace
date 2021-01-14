import * as AT from './action-types'
import * as api from './api'

export function getDashboardData(dateFrom = null) {
  return {
    type: AT.GET_DASHBOARD_DATA,
    payload: api.getDashboardData(dateFrom)
  }
}

export function getDailyStatistics(dateFrom, dateTo) {
  return {
    type: AT.GET_DAILY_STATISTICS,
    payload: api.getDailyStatistics(dateFrom, dateTo)
  }
}
