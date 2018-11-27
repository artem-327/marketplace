import axios from 'axios';

const api = {
    fetchNewUsers: () => axios.get('/prodex/api/users').then(response => response.data.users),
    promoteToMerchant: (payload) => axios.put('/prodex/api/users/' + payload.id, {...payload.user}),
    promoteToOperator: (payload) => axios.put('/prodex/api/users/' + payload.id, {...payload.user}),
    fetchOperators: () => axios.get('/prodex/api/operators').then(response => response.data.operators),
    removeOperator: (id) => axios.delete('/prodex/api/operators/' + id),
    editOperator: (operator) => axios.put('/prodex/api/operators/' + operator.id, {...operator}),
};

export default api;