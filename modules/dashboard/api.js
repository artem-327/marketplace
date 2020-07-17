import api from '~/api'

export async function getDashboardData() {
  return await api.get(`/prodex/api/dashboard`)
}
