import axios from 'axios';

const api = {
  //TODO after backend is done, add search var into params (fetchRegions, fetchStates)
  fetchRegions: (search) => axios.get('/prodex/api/regions', { params: {search:search} }).then(response => response.data.regions),
  fetchRegionDetail: (id) => axios.get(`/prodex/api/countries/?regionId=${id}`).then(response => response.data),
  fetchStates: (search) => axios.get(`/prodex/api/countries`, { params: {search:search} }).then(response => response.data.countries),
  fetchStateDetail: (id) => axios.get(`/prodex/api/companies/?entityId=${id}&entityType=country`).then(response => response.data),
};

export default api;