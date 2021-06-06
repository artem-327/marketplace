import { createAsyncAction } from 'redux-promise-middleware-actions'
import * as api from './api'

export const getDashboardData = createAsyncAction('GET_DASHBOARD_DATA', (dateFrom = null) => api.getDashboardData(dateFrom))
export const getDailyStatistics = createAsyncAction('GET_DAILY_STATISTICS', (dateFrom, dateTo) => api.getDailyStatistics(dateFrom, dateTo))
