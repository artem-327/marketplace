import * as AT from './action-types'
import { ROLES_ENUM } from '../../src/utils/constants'

export const initialState = {
  loginForm: {
    isLoading: false,
    message: null,
    isLogged: false,
    version: '',
  },
  identity: null,
}

export default function reducer(state = initialState, action) {
  const { loginForm } = state
  const { type, payload } = action

  switch (type) {

    case AT.LOGIN_INIT: {
      return initialState
    }

    case AT.LOGIN_PENDING: {
      return {
        ...state,
        loginForm: {
          ...loginForm,
          isLoading: true,
          message: null
        }
      }
    }
    case AT.LOGIN_REJECTED: {
      return {
        ...state,
        loginForm: {
          ...loginForm,
          isLoading: false,
          message: payload.error_description
        }
      }
    }
    case AT.LOGIN_FULFILLED: {
      let accessRights = {}

      ROLES_ENUM.forEach(role => {
        accessRights[role.propertyName] = !!payload.identity.roles.find((el) => el.id === role.id)
      })

      return {
        ...state,
        identity: {
          ...payload.identity,
          ...accessRights
        },
        loginForm: {
          ...loginForm,
          //isLoading: false,
          isLogged: true
        },
      }
    }

    case AT.LOGOUT: {
      return initialState
    }

    case AT.UPDATE_IDENTITY: {
      let accessRights = {}

      ROLES_ENUM.forEach(role => {
        accessRights[role.propertyName] = !!payload.roles.find((el) => el.id === role.id)
      })
      
      return {
        ...state,
        identity: { ...payload, ...accessRights }
      }
    }

    case AT.GET_VERSION_PENDING: {
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          isLoading: true
        }
      }
    }

    case AT.GET_VERSION_FULFILLED: {
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          version: payload.version,
          isLoading: false
        }
      }
    }

    case AT.GET_VERSION_REJECTED: {
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          isLoading: true
        }
      }
    }

    default: {
      return state
    }
  }
}