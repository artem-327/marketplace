import * as AT from './action-types'
const ROLE_GUEST = 'ROLE_GUEST'

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
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.GET_IDENTITY_PENDING: {
      return {
        ...state,
        isAuthenticated: false,
        identity: { isFetching: true, data: { role: ROLE_GUEST } }
      }
    }
    case AT.GET_IDENTITY_FULFILLED: {
      return {
        ...state,
        isAuthenticated: true,
        identity: { isFetching: false, data: action.payload }
      }
    }
    case AT.GET_IDENTITY_REJECTED: {
      return {
        ...state,
        isAuthenticated: false,
        identity: { isFetching: false, data: { role: ROLE_GUEST } }
      }
    }
    case AT.LOGIN_PENDING: {
      return { ...state, loginForm: { isFetching: true, hasError: false, isValid: false } }
    }
    case AT.LOGIN_REJECTED: {
      return { ...state, loginForm: { isFetching: false, hasError: true, isValid: false } }
    }
    case AT.LOGIN_FULFILLED: {
      return {
        ...state,
        loginForm: {
          isFetching: false,
          hasError: false,
          isValid: true,
        }
      }
    }
    case AT.REGISTRATION_PENDING: {
      return { ...state, registrationForm: { isFetching: true, hasError: false, isValid: false } }
    }
    case AT.REGISTRATION_REJECTED: {
      return { ...state, registrationForm: { isFetching: false, hasError: true, isValid: false } }
    }
    case AT.REGISTRATION_FULFILLED: {
      return {
        ...state,
        registrationForm: {
          isFetching: false,
          hasError: false,
          isValid: true,
        }
      }
    }
    case AT.LOGOUT: {
      return { ...state, identity: initialState.identity, isAuthenticated: false }
    }
    case AT.GET_VERSION_FULFILLED: {
      return { ...state, version: action.payload }
    }
    default: {
      return state
    }
  }
}