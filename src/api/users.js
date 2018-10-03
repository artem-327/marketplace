import axios from 'axios';

const api = {
    fetchNewUsers: () => axios.get('/api/oprw95/users/').then(response => response.data.data.users),
    promoteToMerchant: (payload) => axios.put('/api/ca8cjf/users/' + payload.id, {...payload.user}),
    promoteToOperator: (payload) => axios.put('/api/nc5xyn/users/' + payload.id, {...payload.user}),
    fetchOperators: () => (
        [
            {
                "id": "1",
                "email": "test.me.again@example.com",
                "firstname": "Test",
                "middlename": "Me",
                "lastname": "Again",
                "login": "test"
            }
        ]
    ),
    removeOperator: (id) => axios.delete('/api/j94weq/operators/' + id),
};


export default api;