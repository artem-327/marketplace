import api from '~/api'

export async function getDashboardData(dateFrom) {
  return await api.get(`/prodex/api/dashboard${dateFrom ? ('?from=' + dateFrom): ''}`)
}

export async function getDailyStatistics(dateFrom, dateTo) {
  return await api.get(`/prodex/api/daily-statistics?from=${dateFrom}&to=${dateTo}`)
}
