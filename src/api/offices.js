import axios from 'axios';

const api = {
    fetchOffice: (id) => axios.get('/api/5b99nl/offices/' + id).then(response => response.data.data.office),
    createOffice: (payload) => axios.post('/api/2trt38/offices/', {name: payload.name, location: payload.location.id, company: payload.company.id}),
    removeOffice: (id) => axios.get('/api/t3ugro/offices/' + id),
    editOffice: (office) => axios.put('/api/3ljpkw/offices/' + office.id, {...office})
};

export default api;