import axios from "axios";

export default {
    getUsers: () => axios.get("/prodex/api/users").then(response => response.data),
    getCurrentUser: () => axios.get("/prodex/api/users/me").then(response => response.data),
    createWarehouse: dataBody => axios.post("/prodex/api/branches/", dataBody),
    getWarehouses: () => axios.get('/prodex/api/branches/warehouses/').then(response => response.data),
    putWarehouse: (branchId, body) => axios.put(`/prodex/api/branches/${branchId}`, body ),
    deleteWarehouse: branchId => axios.delete(`/prodex/api/branches/${branchId}`)
}