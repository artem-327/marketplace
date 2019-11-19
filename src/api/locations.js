import axios from 'axios'

const api = {
  getRegions: search =>
    axios.get('/prodex/api/regions', {params: {search: search}}).then(response => response.data.regions),
  getRegionDetail: id => axios.get(`/prodex/api/countries/?regionId=${id}`).then(response => response.data),
  getStates: search => axios.get(`/prodex/api/countries`, {params: {search: search}}).then(response => response.data),
  getProvinces: ({countryId}) =>
    axios.get(`/prodex/api/provinces/country/${countryId}`).then(response => response.data),
  getStateDetail: id =>
    axios.get(`/prodex/api/companies/?entityId=${id}&entityType=country`).then(response => response.data)
}

export default api
