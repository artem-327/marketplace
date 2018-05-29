import axios from "axios";
// import jwt from "jsonwebtoken";
import {setAuthToken, deleteAuthToken} from '../utils/auth'
import '../utils/constants';
import {ROLE_GUEST} from "../utils/constants";

const CHEMTYPE = 'CHEMTYPE';
const CHEMTYPE_PENDING = 'CHEMTYPE_PENDING';
const CHEMTYPE_FULFILLED = 'CHEMTYPE_FULFILLED';
const CHEMTYPE_REJECTED = 'CHEMTYPE_REJECTED';

const QUANTITY_FROM = 'QUANTITY_FROM';
const QUANTITY_FROM_PENDING = 'QUANTITY_FROM_PENDING';
const QUANTITY_FROM_REJECTED = 'QUANTITY_FROM_REJECTED';
const QUANTITY_FROM_FULFILLED = 'QUANTITY_FROM_FULFILLED';

const QUANTITY_TO = 'QUANTITY_TO';
const QUANTITY_TO_PENDING = 'QUANTITY_TO_PENDING';
const QUANTITY_TO_REJECTED = 'QUANTITY_TO_REJECTED';
const QUANTITY_TO_FULFILLED = 'QUANTITY_TO_FULFILLED';

export const initialState = {
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
            checkboxBanan: "",
            checkboxBanan2: ""
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

        default: {
            return state
        }
    }
}

// export function getIdentity() {
//     return {
//         type: GET_IDENTITY,
//         payload: axios.get("/api/v1/users/me/").then((response) => {
//             // return jwt.decode(localStorage.jwtoken);
//             return response;
//         }).catch((er)=>{
//             deleteAuthToken();
//             return Promise.reject(new Error(er))
//         })
//     }
// }
//
// export function login(email, password) {
//     return {
//         type: LOGIN,
//         payload: axios({
//             method: 'post',
//             url: "/api/v1/auth/login/",
//             data: {
//                 email: email,
//                 password: password
//             }
//         }).then((response) => {
//             setAuthToken(response.data.data.token);
//         })
//     }
// }
//
// export function registration(email, password, firstName, middleName, lastName) {
//     return {
//         type: REGISTRATION,
//         payload: axios({
//             method: 'post',
//             url: "/api/v1/users/",
//             data: {
//                 email: email,
//                 password: password,
//                 firstname: firstName,
//                 middlename: middleName,
//                 lastname: lastName
//             }
//         })
//     }
// }

