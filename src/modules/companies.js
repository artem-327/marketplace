import {COMPANIES_FETCH_REQUESTED, COMPANIES_FETCH_SUCCEEDED} from "../constants/companiesOffices";

export const initialState = {
    data: [],
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case GET_COMPANIES_PENDING: {
        //     return {
        //         ...state,
        //         isFetching: true,
        //     }
        // }
        case COMPANIES_FETCH_SUCCEEDED: {
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
    return {type: COMPANIES_FETCH_REQUESTED,}
}
