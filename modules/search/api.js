import api from '~/api'

export const searchTags = filter => api.post(`/prodex/api/tags/datagrid`, filter).then(response => response.data)
