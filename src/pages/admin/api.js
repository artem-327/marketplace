import api from '~/api'

export async function getCasProductByFilter(value) {
  console.log('xxxxxxxxxxxxxxxx - /api/cas-products/filtered - value - ', value);
  const {data} = await api.post("/prodex/api/cas-products/filtered", value)
  console.log('xxxxxxxxxxxxxxxx - /api/cas-products/filtered - data - ', data);
  return data
}