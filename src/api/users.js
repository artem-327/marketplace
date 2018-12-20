import axios from 'axios';

const api = {
    getUsers: () => axios.get('/prodex/api/users').then(response => response.data),
    putPromoteToMerchant: (payload) => axios.put('/prodex/api/users/' + payload.id, {...payload.user}),
    putPromoteToOperator: (payload) => axios.put('/prodex/api/users/' + payload.id, {...payload.user}),
    getOperators: () => axios.get('/prodex/api/operators').then(response => response.data),
    deleteOperator: (id) => axios.delete('/prodex/api/operators/' + id),
    putOperatorEdit: (operator) => axios.put('/prodex/api/operators/' + operator.id, {...operator}),
};

export default api;