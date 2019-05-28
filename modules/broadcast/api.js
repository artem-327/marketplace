import api from '~/api'

export const loadRules = (id) => api.get(`/prodex/api/broadcast-rules/${id}`)
export const saveRules = (id, rules) => api.post(`/prodex/api/broadcast-rules/${id}`, rules)
