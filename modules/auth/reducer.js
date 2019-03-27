import * as AT from './action-types'
const ROLE_GUEST = 'ROLE_GUEST'

export const initialState = {
  loginForm: {
    isLoading: false,
    message: null,
  },
  identity: null
}

export default function reducer(state = initialState, action) {
  const {loginForm} = state
  const {type, payload} = action

  switch (type) {

    case AT.LOGIN_PENDING: {
      return { ...state, 
        loginForm: { ...loginForm,
          isLoading: true,
          message: null
        }
      }
    }
    case AT.LOGIN_REJECTED: {
      return { ...state, 
        loginForm: { ...loginForm,
          isLoading: false,
          message: payload.error_description
        }
      }
    }
    case AT.LOGIN_FULFILLED: {
      return { ...state,
        identity: payload.identity, 
        loginForm: { ...loginForm,
          isLoading: false
        }
      }
    }

    case AT.LOGOUT: {
      return initialState
    }

    
    case AT.GET_VERSION_FULFILLED: {
      return { ...state, 
        version: payload
      }
    }

    default: {
      return state
    }
  }
}