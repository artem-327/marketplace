import axios from 'axios';

const api = {
    fetchCompanies: () => axios.get('/api/9o9w90/companies/').then(response => response.data.data.companies),
    fetchCompany: (id) => axios.get('/api/8q08di/companies/' + id).then(response => response.data.data.company),
    createCompany: (name) => axios.post('/api/2rn8qr/companies/', {name: name}),
    editCompany: (company) => axios.put('/api/l0y4v7/companies/' + company.id, {name: company.name}),
    removeCompany: (id) => axios.delete('/api/mkm8rd/companies/' + id),
};

export default api;