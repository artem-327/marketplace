import axios from 'axios'

const api = {
  getCompanies: () => axios.get('/prodex/api/companies', {params: {}}).then(response => response.data),
  getCompany: id => axios.get(`/prodex/api/companies/${id}`).then(response => response.data),
  postNewCompany: name => axios.post('/prodex/api/companies', {name: name}),
  putCompanyEdit: company => axios.put(`/prodex/api/companies/${company.id}`, {name: company.name}),
  deleteCompany: id => axios.delete(`/prodex/api/companies/${id}`)
}

export default api
