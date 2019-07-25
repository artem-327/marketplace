import * as AT from './action-types'
import { ROLES_ENUM } from '../../src/utils/constants'
import { getSafe } from '~/utils/functions'

export const initialState = {
  confirmationForm: {
    address: {
      city: '',
      country: undefined,
      availableCountries: [],
      province: undefined,
      availableProvinces: [],
      streetAddress: '',
      zip: ''
    },
    companyAdminUser: {
      name: '',
      jobTitle: undefined,
      phone: '',
      email: ''
    },
    dba: '',
    dunsNumber: '',
    name: '',
    tin: ''
  },
  loginForm: {
    isLoading: false,
    message: null,
    isLogged: false,
    version: '',
  },
  identity: null
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
        confirmationForm: getSafe(() => payload.identity.company.reviewRequested, false) ? {
          address: {
            city: payload.identity.branches[0].address.city,
            country: payload.identity.branches[0].address.country.id,
            availableCountries: [{
              key: payload.identity.branches[0].address.country.id,
              text: payload.identity.branches[0].address.country.name,
              value: payload.identity.branches[0].address.country.id
            }],
            province: payload.identity.branches[0].address.province.id,
            availableProvinces: [{
              key: payload.identity.branches[0].address.province.id,
              text: payload.identity.branches[0].address.province.name,
              value: payload.identity.branches[0].address.province.id
            }],
            streetAddress: payload.identity.branches[0].address.streetAddress,
            zip: payload.identity.branches[0].address.zip.zip,
          },
          companyAdminUser: {
            name: payload.identity.name,
            jobTitle: undefined,
            phone: payload.identity.phone,
            email: payload.identity.email
          },
          dba: '',
          dunsNumber: payload.identity.company.tin,
          name: payload.identity.company.name,
          tin: payload.identity.company.tin
        } : state.confirmationForm,
        identity: {
          ...payload.identity,
          ...accessRights
        },
        loginForm: {
          ...loginForm,
          //isLoading: false,
          isLogged: true
        }
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

    case AT.AUTH_REVIEW_COMPANY_FULFILLED: {
      return {
        ...state
      }
    }

    case AT.AUTH_SEARCH_COUNTRIES_FULFILLED: {
      return {
        ...state,
        confirmationForm: {
          ...state.confirmationForm,
          address: {
            ...state.confirmationForm.address,
            availableCountries: payload.data.map(country => ({
              key: country.id,
              text: country.name,
              value: country.id
            })),
            province: 0
          }
        }
      }
    }

    case AT.AUTH_SEARCH_PROVINCES_FULFILLED: {
      return {
        ...state,
        confirmationForm: {
          ...state.confirmationForm,
          address: {
            ...state.confirmationForm.address,
            availableProvinces: payload.data.map(province => ({
              key: province.id,
              text: province.name,
              value: province.id
            }))
          }
        }
      }
    }

    default: {
      return state
    }
  }
}