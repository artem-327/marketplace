import axios from 'axios';

const api = {
    fetchCompanies: () => axios.get('/api/9o9w90/companies/').then(response => response.data.data.companies),
    fetchCompany: () => ({
            id: 1,
            name: "Company A",
            offices:
                [{
                    id: 1,
                    name: 'test',
                    location: {
                        id: 1,
                        country: "USA",
                        state: "Idaho"
                    }
                }]
        }
    ),
    createCompany: (name) => {console.log(name); return true}
};

export default api;