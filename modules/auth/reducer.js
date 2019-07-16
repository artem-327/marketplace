import * as AT from './action-types'
import { ROLES_ENUM } from '../../src/utils/constants'
import { getSafe } from '~/src/utils/functions'

export const initialState = {
  confirmationForm: {
    companyName: '',
    dba: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: undefined,
    zip: '',
    einNumber: '',
    dunsNumber: '',
    firstName: '',
    lastName: '',
    title: undefined,
    phone: '',
    email: ''
  },
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

      if(payload.identity.roles) {
        ROLES_ENUM.forEach(role => {
          accessRights[role.propertyName] = !!payload.identity.roles.find((el) => el.id === role.id)
        })
      }

      return {
        ...state,
        confirmationForm: {
          companyName: payload.identity.company.name,
          dba: '',
          streetAddress: payload.identity.branches[0].address.streetAddress,
          streetAddress2: payload.identity.branches[0].address.streetAddress2,
          city: payload.identity.branches[0].address.city,
          state: payload.identity.branches[0].address.province.name,
          zip: payload.identity.branches[0].address.zip.zip,
          einNumber: payload.identity.company.cin,
          dunsNumber: payload.identity.company.tin,
          firstName: payload.identity.name,
          lastName: '',
          title: undefined,
          phone: payload.identity.phone,
          email: payload.identity.email
        },
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
      if(payload.roles) {
        ROLES_ENUM.forEach(role => {
          accessRights[role.propertyName] = !!payload.roles.find((el) => el.id === role.id)
        })
      }
      
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