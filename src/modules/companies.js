import {
    COMPANIES_FETCH_REQUESTED, COMPANIES_FETCH_SUCCEEDED, COMPANY_CREATE_REQUESTED, COMPANY_FETCH_REQUESTED,
    COMPANY_FETCH_SUCCEEDED
} from "../constants/companies";

export const initialState = {
    data: [],
    detail: {},
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY_FETCH_REQUESTED:
        case COMPANIES_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case COMPANIES_FETCH_SUCCEEDED: {
            return {
                ...state,
                data: action.payload,
                isFetching: false
            }
        }
        case COMPANY_FETCH_SUCCEEDED: {
            return {
                ...state,
                detail: action.payload,
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

export function fetchDetail(id) {
    return {type: COMPANY_FETCH_REQUESTED, id}
}

export function createCompany(name, onSuccess) {
    return {type: COMPANY_CREATE_REQUESTED, payload: {name, onSuccess}}
}
