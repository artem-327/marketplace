import api from '~/api'

export async function getDashboardData() {
  return await api.get(`/prodex/api/dashboard`)
}

export async function getDailyStatistics(dateFrom, dateTo) {
  return await api.get(`/prodex/api/daily-statistics?from=${dateFrom}&to=${dateTo}`)
}
