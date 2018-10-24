import axios from 'axios';

const api = {
    fetchRegions: () => axios.get('/api/r1prnp/regions/').then(response => response.data.data.regions),
};

export default api;