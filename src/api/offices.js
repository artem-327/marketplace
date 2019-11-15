import axios from 'axios';

const api = {
    fetchOffice: (id) => axios.get(`/prodex/api/offices/${id}`).then(response => response.data),
    createOffice: (office) => axios.post('/prodex/api/offices', {...office}),
    removeOffice: (id) => axios.delete('/prodex/api/offices/' + id),
    editOffice: (office) => axios.put('/prodex/api/offices/' + office.id, {...office}),
    fetchOffices: (companyId) => axios.get(companyId ? `/prodex/api/offices/?company${companyId}` : "/prodex/api/offices").then(response => response.data)
};

export default api;