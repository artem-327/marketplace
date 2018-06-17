import axios from 'axios';

const GET_PACKAGE_TYPES = 'GET_PACKAGE_TYPES';
const GET_PACKAGE_TYPES_FULFILLED = 'GET_PACKAGE_TYPES_FULFILLED';
const GET_PACKAGE_TYPES_PENDING = 'GET_PACKAGE_TYPES_PENDING';

export const initialState = {
    data: [],
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PACKAGE_TYPES_PENDING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case GET_PACKAGE_TYPES_FULFILLED: {
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
        type: GET_PACKAGE_TYPES,
        payload: axios.get('/api/v1/package-types/').then(response => response.data.data.packageTypes)
    }
}
