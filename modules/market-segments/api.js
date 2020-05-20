import api from '~/api'
import { getSafe, generateQueryString } from '~/utils/functions'

export async function getDataRequest(config, values) {
  const { data } = await api.get(config.api.get.apiCall)
  return data
}
export async function deleteItem(id) {
  const { data } = await api.delete(`/prodex/api/market-segments/id/${id}`)
  return data
}
export async function postNewRequest(values) {
  return await api.post(`/prodex/api/market-segments`, values).data
}

export async function putEditedDataRequest(values, id) {
  const { data } = await api.put(`/prodex/api/market-segments/id/${id}`, values)
  return data
}
