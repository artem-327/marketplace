import axios from 'axios';

const api = {
    fetchCompanies: () => axios.get('/api/9o9w90/companies/').then(response => response.data.data.companies),
    fetchCompany: (id) => axios.get('/api/8q08di/companies/' + id).then(response => response.data.data.company),
    createCompany: (name) => axios.post('/api/8q08di/companies/' + {name}),
    editCompany: (company) => axios.post('/api/l0y4v7/companies/' + company.id, {name: company.id}),
};

export default api;