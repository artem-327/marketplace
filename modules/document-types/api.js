import api from '~/api'
import { getSafe, generateQueryString } from '~/utils/functions'

export const deleteDocumentType = id => api.delete(`/prodex/api/document-types/id/${id}`)

export const addDocumentType = values => api.post(`/prodex/api/document-types`, values).then(response => response.data)

export const editDocumentType = (values, id) =>
  api.patch(`/prodex/api/document-types/id/${id}`, values).then(response => response.data)

export const getDocumentTypeGroupsByName = name => {
  return api
    .post('/prodex/api/document-type-groups/datagrid', {
      orFilters: [{ operator: 'LIKE', path: 'DocumentTypeGroup.name', values: [`%${name}%`] }],
      filters: [],
      pageSize: 50,
      pageNumber: 0
    })
    .then(response => response.data)
}