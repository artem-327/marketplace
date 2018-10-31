import axios from 'axios';

const api = {
    //TODO after backend is done, add search var into params (fetchRegions, fetchStates)
    fetchRegions: (search) => axios.get('/api/r1prnp/regions/', {params: {}}).then(response => response.data.data.regions),
    fetchRegionDetail: (id) => axios.get(`/api/eq0kii/countries/?regionId=${id}`).then(response => response.data.data),
    fetchStates: (search) => axios.get(`/api/eq0kii/countries/`, {params: {}}).then(response => response.data.data.countries),
    fetchStateDetail: (id) => axios.get(`/api/9o9w90/companies/?entityId=${id}&entityType=country`).then(response => response.data.data),
};

export default api;
