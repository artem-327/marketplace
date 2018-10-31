import axios from 'axios';

const api = {
    fetchRegions: () => axios.get('/api/r1prnp/regions/').then(response => response.data.data.regions),
    fetchRegionDetail: (id) => axios.get(`/api/eq0kii/countries/?regionId=${id}`).then(response => response.data.data),
    fetchStates: () => axios.get(`/api/eq0kii/countries/`).then(response => response.data.data.countries),
    fetchStateDetail: (id) => axios.get(`/api/9o9w90/companies/?entityId=${id}&entityType=country`).then(response => response.data.data),
};

export default api;
