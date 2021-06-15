import api from '~/api'
import { getSafe, generateQueryString } from '~/utils/functions'

export async function deleteItem(id) {
  const { data } = await api.delete(`/prodex/api/document-types/id/${id}`)
  return data
}
export async function postNewRequest(values) {
  return await api.post(`/prodex/api/document-types`, values).data
}

export async function putEditedDataRequest(values, id) {
  const { data } = await api.patch(`/prodex/api/document-types/id/${id}`, values)
  return data
}
