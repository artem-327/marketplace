import api from '~/api'

export const loadRules = id => api.get(`/prodex/api/broadcast-rules/${id}`).then(response => response.data)
export const loadGeneralRules = () =>
  api.get('/prodex/api/broadcast-rules/general').then(response => response.data.broadcastTree)
export const broadcastChange = (id, option, templateId) =>
  api
    .patch(
      `/prodex/api/product-offers/${id}/broadcast-option?${
        templateId ? 'broadcastTemplateId=' + templateId + '&' : ''
      }option=${option}`
    )
    .then(res => res)
    .catch(err => console.error(err))
export const saveRules = (id, rules) =>
  api
    .patch(`/prodex/api/product-offers/${id}/broadcast-option?option=CUSTOM_RULES`, rules)
    .then(response => response.data)
export const saveGeneralRules = rules => api.post('/prodex/api/broadcast-rules/general', rules)

export const saveTemplate = payload =>
  api.post('/prodex/api/broadcast-templates', payload).then(response => response.data)
export const updateTemplate = (id, payload) => api.put(`/prodex/api/broadcast-templates/${id}`, payload)
export const getTemplate = id => api.get(`/prodex/api/broadcast-templates/${id}`).then(response => response.data)
export const deleteTemplate = id => api.delete(`/prodex/api/broadcast-templates/${id}`).then(() => id)
export const getTemplates = () => api.get('/prodex/api/broadcast-templates').then(response => response.data)

export const getCompanyInfo = companyId =>
  api.get(`/prodex/api/companies/id/${companyId}`).then(response => response.data)

export const getAssociations = (
  filter = { orFilters: [], filters: [], pageSize: 50, pageNumber: 0, sortDirection: null }
) => api.post('/prodex/api/associations/datagrid', filter).then(response => response.data)
