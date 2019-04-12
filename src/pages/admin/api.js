import api from '~/api'

export async function getCasProductByFilter(value) {
  const {data} = await api.post("/prodex/api/cas-products/filtered", value)
  return data
}

export async function getCasProductByString(value) {
  const {data} = await api.get(`/prodex/api/cas-products?search=${value}`)
  return data
}





