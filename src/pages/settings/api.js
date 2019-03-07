import axios from "axios";

export default {
    getUsers: () => axios.get("/prodex/api/users").then(response => response.data),
    getCurrentUser: () => axios.get("/prodex/api/users/me").then(response => response.data),
    createWarehouse: body => axios.post("/prodex/api/branches/", body),
    getWarehouses: () => axios.get('/prodex/api/branches/warehouses/').then(response => response.data),
    getBranches: () => axios.get('/prodex/api/branches').then(response => response.data),
    putWarehouse: (branchId, body) => axios.put(`/prodex/api/branches/${branchId}`, body ),
    deleteWarehouse: branchId => axios.delete(`/prodex/api/branches/${branchId}`),
    getCreditCardsData: () => axios.get('/prodex/api/payments/cards').then(response => response.data),
    getBankAccountsData: () => axios.get('/prodex/api/payments/bank-accounts').then(response => response.data),
    postNewCreditCard: body => axios.post('/prodex/api/payments/cards/add', body),
    postNewBankAccount: body => axios.post('/prodex/api/payments/bank-accounts/add', body)
}