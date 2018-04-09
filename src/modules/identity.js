import axios from "axios";
import jwt from "jsonwebtoken";
import { setAuthToken } from '../utils/auth'
import '../utils/constants';
import {ROLE_GUEST} from "../utils/constants";

const GET_IDENTITY = 'GET_IDENTITY';
const GET_IDENTITY_FULFILLED = 'GET_IDENTITY_FULFILLED';
const LOGIN = 'LOGIN';
const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_REJECTED = 'LOGIN_REJECTED';
const LOGIN_FULFILLED = 'LOGIN_FULFILLED';

export const initialState = {
    identity: {
        isFetching: false,
        hasError: false,
        isValid: false,
        data: {
            email: "",
            password: "",
            role: ROLE_GUEST
        }
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_IDENTITY_FULFILLED: {
            return {
                ...state,
                identity: {data: action.data.payload}
            }
        }
        case LOGIN_PENDING: {
            return {...state, identity:{isFetching: true, hasError:false, isValid: false}}
        }
        case LOGIN_REJECTED: {
            return {...state, identity:{isFetching: false, hasError:true, isValid: false}}
        }
        case LOGIN_FULFILLED: {
            return {
                ...state,
                identity: {
                    isFetching: false,
                    hasError: false,
                    isValid: true,
                    data: action.data.payload
                }
            }
        }
        default: {
            return state
        }
    }
}

export function getIdentity() {
    return {
        type: GET_IDENTITY,
        payload: axios.get("/api/v1/user/me").then(() => {
            return jwt.decode(localStorage.jwtoken);
        })
    }
}

export function login(email, password){
    return {
        type: LOGIN,
        payload: axios({
            method: 'post',
            url: "/api/v1/auth/login",
            data:{
                email: email,
                password: password
            }
        }).then((response) => {
            setAuthToken(response.data.token);
            return jwt.decode(localStorage.jwtoken);
        })
        // payload: (function () {
        //     var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwNC9hcGkvbG9naW4iLCJpYXQiOjE1MjMxOTMyNjMsImV4cCI6MTUyMzE5Njg2MywibmJmIjoxNTIzMTkzMjYzLCJqdGkiOiJqVVo5RFR1dU5IRmNMcEpIIn0.5D7waelVs3z3mN8m1dPV99akDSPrrOBTPCks90on4v4";
        //     setAuthToken(token);
        //     return jwt.decode(token);
        // })()
    }

}

