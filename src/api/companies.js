import axios from 'axios';

const api = {
    //TODO after backend is done, add search var into params (fetchCompanies)
    fetchCompanies: (search) => axios.get('/prodex/api/companies', {params: {}}).then(response => response.data),
    fetchCompany: (id) => axios.get(`/prodex/api/companies/${id}`).then(response => response.data),
    createCompany: (name) => axios.post('/prodex/api/companies', {name: name}),
    editCompany: (company) => axios.put(`/prodex/api/companies/${company.id}`, {name: company.name}),
    removeCompany: (id) => axios.delete(`/prodex/api/companies/${id}`),
};

export default api;