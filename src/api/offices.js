import axios from 'axios';

const api = {
    getOffice: (id) => axios.get(`/prodex/api/offices/${id}`).then(response => response.data),
    postNewOffice: (office) => axios.post('/prodex/api/offices', {...office}),
    deleteOffice: (id) => axios.delete('/prodex/api/offices/' + id),
    putOfficeEdit: (office) => axios.put('/prodex/api/offices/' + office.id, {...office}),
    getOffices: (companyId) => axios.get(companyId ? `/prodex/api/offices/?company${companyId}` : "/prodex/api/offices").then(response => response.data)
};

export default api;