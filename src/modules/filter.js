// import axios from "axios";
// import jwt from "jsonwebtoken";
// import {setAuthToken, deleteAuthToken} from '../utils/auth'
// import {ROLE_GUEST} from "../utils/constants";
import '../utils/constants';

// const CHEMTYPE = 'CHEMTYPE';
const CHEMTYPE_PENDING = 'CHEMTYPE_PENDING';
// const CHEMTYPE_FULFILLED = 'CHEMTYPE_FULFILLED';
// const CHEMTYPE_REJECTED = 'CHEMTYPE_REJECTED';

// const QUANTITY_FROM = 'QUANTITY_FROM';
const QUANTITY_FROM_PENDING = 'QUANTITY_FROM_PENDING';
const QUANTITY_FROM_REJECTED = 'QUANTITY_FROM_REJECTED';
const QUANTITY_FROM_FULFILLED = 'QUANTITY_FROM_FULFILLED';

// const QUANTITY_TO = 'QUANTITY_TO';
const QUANTITY_TO_PENDING = 'QUANTITY_TO_PENDING';
const QUANTITY_TO_REJECTED = 'QUANTITY_TO_REJECTED';
const QUANTITY_TO_FULFILLED = 'QUANTITY_TO_FULFILLED';

const TOGGLE_FILTER = "TOGGLE_FILTER";

export const initialState = {
    isOpen: false,
    filterForm: {
        isFetching: false,
        hasError: false,
        isValid: false,
        data: {
            chemicalName: "",
            fromQuantity: "",
            toQuantity: "",
            fromPrice: "",
            toPrice: "",
            zipCode: "",
            maxMilesAway: "",
            superSack: "",
            drums: "",
            pails: "",
        }
    },
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHEMTYPE_PENDING: {
            return {...state, loginForm: {isFetching: true, hasError: false, isValid: false}}
        }

        case QUANTITY_FROM_PENDING: {
            return {...state, registrationForm: {isFetching: true, hasError: false, isValid: false}}
        }
        case QUANTITY_FROM_REJECTED: {
            return {...state, registrationForm: {isFetching: false, hasError: true, isValid: false}}
        }
        case QUANTITY_FROM_FULFILLED: {
            return {
                ...state,
                registrationForm: {
                    isFetching: false,
                    hasError: false,
                    isValid: true,
                    // data: action.data
                }
            }
        }

        case QUANTITY_TO_PENDING: {
            return {...state, registrationForm: {isFetching: true, hasError: false, isValid: false}}
        }
        case QUANTITY_TO_REJECTED: {
            return {...state, registrationForm: {isFetching: false, hasError: true, isValid: false}}
        }
        case QUANTITY_TO_FULFILLED: {
            return {
                ...state,
                registrationForm: {
                    isFetching: false,
                    hasError: false,
                    isValid: true,
                    // data: action.data
                }
            }
        }

        case TOGGLE_FILTER: {
            return {
                ...state,
                isOpen: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export function toggleFilter(state) {
    return {
        type: TOGGLE_FILTER,
        payload: state
    }
}
