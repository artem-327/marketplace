import axios from 'axios';

const GET_COMPANIES = 'GET_COMPANIES';
const GET_COMPANIES_FULFILLED = 'GET_COMPANIES_FULFILLED';
const GET_COMPANIES_PENDING = 'GET_COMPANIES_PENDING';

export const initialState = {
    data: [],
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPANIES_PENDING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case GET_COMPANIES_FULFILLED: {
            return {
                ...state,
                data: action.payload,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

export function fetchAll() {
    return {
        type: GET_COMPANIES,
        payload: axios.get('/api/v1/companies/').then(response => response.data.data.companies)
        // payload: Promise.resolve(
        //     [{
        //         "id": 1,
        //         "name": "Company A",
        //         "offices": [
        //             {
        //                 "id": 1,
        //                 "location": {
        //                     "id": 1,
        //                     "country": "United States",
        //                     "state": "Alabama"
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         "id": 2,
        //         "name": "Company B",
        //         "offices": [
        //             {
        //                 "id": 2,
        //                 "location": {
        //                     "id": 1,
        //                     "country": "United States",
        //                     "state": "Alabama"
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         "id": 3,
        //         "name": "Company C",
        //         "offices": [
        //             {
        //                 "id": 3,
        //                 "location": {
        //                     "id": 2,
        //                     "country": "CZ",
        //                     "state": "Vysocina"
        //                 }
        //             }
        //         ]
        //     }]
        // )
    }
}
