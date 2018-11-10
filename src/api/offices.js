import axios from 'axios';

const api = {
    fetchOffice: (id) => axios.get(`/api/5b99nl/offices/${id}/`).then(response => response.data.data.office),
    createOffice: (office) => axios.post('/api/2trt38/offices/', {...office}),
    removeOffice: (id) => axios.delete('/api/t3ugro/offices/' + id),
    editOffice: (office) => axios.put('/api/3ljpkw/offices/' + office.id, {...office}),
    fetchOffices: (companyId) => axios.get(companyId ? `/api/1huzrs/offices/?company${companyId}/` : "/api/1huzrs/offices/").then(response => response.data.data.offices)
};

export default api;