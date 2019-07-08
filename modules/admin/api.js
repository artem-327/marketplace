import api from '~/api'

/*
https://test.echoexchange.net/prodex/api/dev/swagger-diff?oldAppVersion=0.8.6&newAppVersion=0.8.6

BE version 0.8.7.

 */

export async function getAlternativeProductNames(value) {
  const { data } = await api.get(`/prodex/api/cas-products/alternative-names/${value}`)
  return data
}

export async function getCasProductByString(value, limit = 30) {
  const { data } = await api.get(`/prodex/api/cas-products/search?limit=${limit}&pattern=${value}`)
  return data
}

export async function getManufacturersByString(value, limit = 30) {
  const { data } = await api.get(`/prodex/api/manufacturers/search?limit=${limit}&search=${value}`)
  return data
}

export async function postNewCasProduct(value) {
  const { data } = await api.post('/prodex/api/cas-products', value)
  return data
}

export async function updateCasProduct(id, value) {
  const { data } = await api.put(`/prodex/api/cas-products/id/${id}`, value)
  return data
}

export const deleteCasProduct = id => api.delete(`/prodex/api/cas-products/id/${id}`).then(() => id)

export async function getAllUnNumbers() {
  const { data } = await api.get("/prodex/api/un-numbers")
  return data
}

export async function getUnNumbersByString(value, limit = 30) {
  const { data } = await api.get(`/prodex/api/un-numbers/search?limit=${limit}&pattern=${value}`)
  return data
}

export async function getMeasureTypes() {
  const { data } = await api.get("/prodex/api/measure-types")
  return data
}

export async function getHazardClasses() {
  const { data } = await api.get("/prodex/api/hazard-classes")
  return data
}

export async function getDataRequest(config, values) {
  const { data } = await api.get(config.api.get.apiCall)
  return data
}

export async function postNewRequest(config, values) {
  const { data } = await api.post(config.api.post.apiCall, values)
  return data
}

export async function postNewDwollaAccount(values) {
  const { data } = await api.post('/prodex/api/payments/dwolla/register', values)
  return data
}

export async function deleteItem(config, id) {
  const { data } = await api.delete(config.api.delete.apiCall + id)
  return data
}

export async function putEditedDataRequest(config, values, id) {
  const { data } = await api.put(config.api.put.apiCall + id, values)
  return data
}

export async function getPackagingGroups() {
  const { data } = await api.get('/prodex/api/packaging-groups')
  return data
}

export async function getCountries() {
  const { data } = await api.get('/prodex/api/countries')
  return data
}
// export async function getZipCodes() { // TODO Refactor to use limit and search (and countryId?)
//   const {data} = await api.get('/prodex/api/zip-codes')
//   return data
// }

export const getProvinces = (id) => api.get(`/prodex/api/provinces/country/${id}`).then(response => response.data)

export async function getCompanies(params) {
  const { data } = await api.post(`/prodex/api/companies/datagrid`, {
    filters: [],
    ...params
  })
  return data
}

export async function getCompany(params) {
  const { data } = await api.get(`/prodex/api/companies/id/${params}`, {
    filters: [],
    ...params
  })
  return data
}

/*
export async function getCompany(id) {
  const {data} = await api.get(`/prodex/api/companies/${id}`)
  return data
}
*/

export async function createCompany(formData) {
  const { data } = await api.post('/prodex/api/companies', formData)
  return data
}

export async function updateCompany(id, formData) {
  //const {data} = await api.put(`/prodex/api/companies/${id}`, formData)
  const { data } = await api.patch(`/prodex/api/companies/id/${id}`, formData)
  return data
}

export const deleteCompany = (id) => api.delete(`/prodex/api/companies/id/${id}`).then(() => id)

export async function postNewProductName(value) {
  const { data } = await api.post('/prodex/api/cas-products/alternative-names', value)
  return data
}

export async function updateProductName(id, value) {
  const { data } = await api.patch(`/prodex/api/cas-products/alternative-names/id/${id}`, value)
  return data
}

export async function deleteProductName(id) {
  await api.delete(`/prodex/api/cas-products/alternative-names/id/${id}`)
}

export const deleteUnit = id => api.delete(`/prodex/api/units/${id}`).then(() => id)

export const deleteUnitOfPackaging = id => api.delete(`/prodex/api/packaging-types/${id}`).then(() => id)

export async function getAddressSearch(body) {
  const { data } = await api.post('/prodex/api/addresses/search', body)
  return data
}

export const takeOverCompany = (id) => api.patch(`/prodex/api/admin/company/${id}/take-over`).then(response => response.data)

export const takeOverCompanyFinish = () => api.patch('/prodex/api/admin/company/take-over/finish').then(response => response.data)
