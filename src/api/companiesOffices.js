import axios from 'axios';

const api = {
    fetchCompany: () => axios.get('/api/9o9w90/companies/').then(response => response.data.data.companies)
};

export default api;