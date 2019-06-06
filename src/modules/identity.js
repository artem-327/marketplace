import axios from "axios";
import qs from "qs";
import { setAuthToken, deleteAuthToken, finishLogout } from '../utils/auth'
import '../utils/constants';
import { ROLE_GUEST } from "../utils/constants";

const GET_IDENTITY = 'GET_IDENTITY';
const GET_IDENTITY_PENDING = 'GET_IDENTITY_PENDING';
const GET_IDENTITY_FULFILLED = 'GET_IDENTITY_FULFILLED';
const GET_IDENTITY_REJECTED = 'GET_IDENTITY_REJECTED';
const LOGIN = 'LOGIN';
const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_REJECTED = 'LOGIN_REJECTED';
const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
const LOGOUT = 'LOGOUT';
const GET_VERSION = 'GET_VERSION';
const GET_VERSION_FULFILLED = 'GET_VERSION_FULFILLED';
const REGISTRATION = 'REGISTRATION';
const REGISTRATION_PENDING = 'REGISTRATION_PENDING';
const REGISTRATION_REJECTED = 'REGISTRATION_REJECTED';
const REGISTRATION_FULFILLED = 'REGISTRATION_FULFILLED';

const UPDATE_IDENTITY = 'UPDATE_IDENTITY'

export const initialState = {
    isAuthenticated: false,
    identity: {
        isFetching: false,
        data: {
            role: ROLE_GUEST
        }
    },
    loginForm: {
        isFetching: false,
        hasError: false,
        isValid: false,
        data: {
            email: "",
            password: "",
            role: ROLE_GUEST
        }
    },
    registrationForm: {
        isFetching: false,
        hasError: false,
        isValid: false,
        data: {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            password: "",
        }
    },
    version: "0",
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_IDENTITY_PENDING: {
            return {
                ...state,
                isAuthenticated: false,
                identity: { isFetching: true, data: { role: ROLE_GUEST } }
            }
        }
        case GET_IDENTITY_FULFILLED: {
            return {
                ...state,
                isAuthenticated: true,
                identity: { isFetching: false, data: action.payload }
            }
        }
        case GET_IDENTITY_REJECTED: {
            return {
                ...state,
                isAuthenticated: false,
                identity: { isFetching: false, data: { role: ROLE_GUEST } }
            }
        }
        case LOGIN_PENDING: {
            return { ...state, loginForm: { isFetching: true, hasError: false, isValid: false } }
        }
        case LOGIN_REJECTED: {
            return { ...state, loginForm: { isFetching: false, hasError: true, isValid: false } }
        }
        case LOGIN_FULFILLED: {
            return {
                ...state,
                loginForm: {
                    isFetching: false,
                    hasError: false,
                    isValid: true,
                }
            }
        }
        case REGISTRATION_PENDING: {
            return { ...state, registrationForm: { isFetching: true, hasError: false, isValid: false } }
        }
        case REGISTRATION_REJECTED: {
            return { ...state, registrationForm: { isFetching: false, hasError: true, isValid: false } }
        }
        case REGISTRATION_FULFILLED: {
            return {
                ...state,
                registrationForm: {
                    isFetching: false,
                    hasError: false,
                    isValid: true,
                }
            }
        }
        case LOGOUT: {
            return { ...state, identity: initialState.identity, isAuthenticated: false }
        }
        case GET_VERSION_FULFILLED: {
            return { ...state, version: action.payload }
        }
        
        default: {
            return state
        }
    }
}

export function getIdentity() {
    return {
        type: GET_IDENTITY,
        payload: axios.get("/prodex/api/users/me")
            .then(response => response.data)
            .catch(e => {
                deleteAuthToken();
                throw e;
            })
    }
}

export function login(username, password) {
    let grant_type = "password";
    return {
        type: LOGIN,
        payload: axios.post("/prodex/oauth/token", qs.stringify({ grant_type, username, password }), { headers: { 'Authorization': 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs' } }).then(response => setAuthToken(response.data.access_token))
    }
}

export function getVersion() {
    return {
        type: GET_VERSION,
        payload: axios.get("/prodex/api/version").then(result => result.data.version)
    }
}
export function logout() {
    deleteAuthToken();
    return {
        type: LOGOUT
    }
}

export function registration(email, password, firstName, middleName, lastName) {
    return {
        type: REGISTRATION,
        payload: axios({
            method: 'post',
            url: "/api/users",
            data: {
                email: email,
                password: password,
                firstname: firstName,
                middlename: middleName,
                lastname: lastName
            }
        })
    }
}
