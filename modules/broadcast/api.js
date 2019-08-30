import api from '~/api'

export const loadRules = (id) => api.get(`/prodex/api/broadcast-rules/${id}`)
export const loadGeneralRules = () => api.get('/prodex/api/broadcast-rules/general').then(response => response.data)
export const saveRules = (id, rules) => api.post(`/prodex/api/broadcast-rules/${id}`, rules)
export const saveGeneralRules = rules => api.post('/prodex/api/broadcast-rules/general', rules)

export const saveTemplate = payload => api.post('/prodex/api/broadcast-templates', payload).then(response => response.data)
export const updateTemplate = (id, payload) => api.put(`/prodex/api/broadcast-templates/${id}`, payload)
export const getTemplate = id => api.get(`/prodex/api/broadcast-templates/${id}`).then(response => response.data)
export const deleteTemplate = id => api.delete(`/prodex/api/broadcast-templates/${id}`).then(() => id)
export const getTemplates = () => api.get('/prodex/api/broadcast-templates').then(response => response.data)