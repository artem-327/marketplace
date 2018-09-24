import axios from 'axios';

const api = {
    fetchNewUsers: () => ([
        {
            "id": "1",
            "email": "test.me.again@example.com",
            "firstname": "Test",
            "middlename": "Me",
            "lastname": "Again"
        }
    ]),
    promoteToMerchant: (id) => axios.get('/ca8cjf/users/' + id),
    promoteToOperator: (id) => axios.get('/nc5xyn/users/' + id)
};

export default api;