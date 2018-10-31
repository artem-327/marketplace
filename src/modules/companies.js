import {
    COMPANIES_FETCH_REQUESTED, COMPANIES_FETCH_SUCCEEDED, COMPANY_CREATE_REQUESTED, COMPANY_EDIT_REQUESTED,
    COMPANY_FETCH_REQUESTED,
    COMPANY_FETCH_SUCCEEDED, COMPANY_REMOVE_REQUESTED
} from "../constants/companies";
import {
    OFFICE_CREATE_REQUESTED, OFFICE_EDIT_REQUESTED, OFFICE_FETCH_REQUESTED, OFFICE_FETCH_SUCCEEDED,
    OFFICE_REMOVE_REQUESTED, OFFICES_FETCH_REQUESTED, OFFICES_FETCH_SUCCEEDED
} from "../constants/offices";

export const initialState = {
    data: [],
    detail: {},
    office: {},
    offices: {},
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY_FETCH_REQUESTED:
        case OFFICE_FETCH_REQUESTED:
        case OFFICES_FETCH_REQUESTED:
        case COMPANIES_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case OFFICES_FETCH_SUCCEEDED:{
            return {
                ...state,
                offices: action.payload,
                isFetching: false
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
        case OFFICE_FETCH_SUCCEEDED: {
            return {
                ...state,
                office: action.payload,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

export function fetchAll(search = null) {
    return {type: COMPANIES_FETCH_REQUESTED, payload:{search}}
}

export function fetchDetail(id, resolve) {
    return {type: COMPANY_FETCH_REQUESTED, payload: {id}, resolve: resolve}
}

export function createCompany(name, onSuccess) {
    return {type: COMPANY_CREATE_REQUESTED, payload: {name, onSuccess}}
}

export function editCompany(company) {
    return {type: COMPANY_EDIT_REQUESTED, payload: {company}}
}

export function removeCompany(id, onSuccess) {
    return {type: COMPANY_REMOVE_REQUESTED, payload: {id, onSuccess}}
}

export function createOffice(office, onSuccess) {
    return {type: OFFICE_CREATE_REQUESTED, payload: {office, onSuccess}}
}

export function removeOffice(id, company) {
    return {type: OFFICE_REMOVE_REQUESTED, payload: {id, company}}
}

export function fetchOffice(id) {
    return {type: OFFICE_FETCH_REQUESTED, payload: {id}}
}

export function editOffice(office) {
    return {type: OFFICE_EDIT_REQUESTED, payload: {office}}
}

export function fetchOffices() {
    return {type: OFFICES_FETCH_REQUESTED}
}