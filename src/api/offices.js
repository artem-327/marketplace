import axios from 'axios';

const api = {
    createOffice: (payload) => axios.post('/api/2trt38/offices/', {name: payload.name, location: payload.location.id, company: payload.company.id}),
    removeOffice: (payload) => axios.get('/api/t3ugro/offices/' + payload.id),
    fetchOffice: (id) => axios.get('/api/5b99nl/offices/' + id).then(response => response.data.data.office)
};

export default api;