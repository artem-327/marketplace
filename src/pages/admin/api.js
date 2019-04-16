import api from '~/api'

export async function getCasProductByFilter(value) {
  const {data} = await api.post("/prodex/api/cas-products/filtered", value)
  return data
}

export async function getCasProductByString(value) {
  const {data} = await api.get(`/prodex/api/cas-products?search=${value}`)
  return data
}

export async function getUnNumbers() {
  const {data} = await api.get("/prodex/api/un-numbers")
  return data
}

export async function getMeasureTypes() {
  const {data} = await api.get("/prodex/api/measure-types")
  return data
}

export async function getHazardClasses() {
  const {data} = await api.get("/prodex/api/hazard-classes")
  return data
}

export async function getPackagingGroups() {
  const {data} = await api.get("/prodex/api/packaging-groups")
  return data
}

export async function getCountries() {
  const {data} = await api.get('/prodex/api/countries')
  return data
}
export async function getZipCodes() {
  const {data} = await api.get('/prodex/api/zip-codes')
  return data
}

export async function getCompanies() {
  const {data} = await api.get('/prodex/api/companies')
  return data
}

export async function getCompany(id) {
  const {data} = await api.get(`/prodex/api/companies/${id}`)
  return data
}

export async function createCompany(formData) {
  const {data} = await api.post('/prodex/api/companies', formData)
  return data
}

export async function updateCompany(id, formData) {
  const {data} = await api.put(`/prodex/api/companies/${id}`, formData)
  return data
}

export async function deleteCompany(id) {
  await api.delete(`/prodex/api/companies/${id}`)
  return
}








