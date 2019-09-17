import moment from 'moment'

import * as AT from './action-types'
import { ROLES_ENUM } from '../../src/utils/constants'
import { getSafe } from '~/utils/functions'
import { ADMIN_CREATE_DWOLLA_ACCOUNT_FULFILLED } from '~/modules/admin/action-types'
import { SETTINGS_CREATE_DWOLLA_ACCOUNT_FULFILLED } from '~/modules/settings/action-types'

const getAccessRights = (roles) => {
  let accessRights = {}

  if (roles) {
    ROLES_ENUM.forEach(role => {
      accessRights[role.propertyName] = !!roles.find((el) => el.id === role.id)
    })
  }

  return accessRights
}

export const initialState = {
  confirmationForm: {
    address: {
      city: '',
      country: '',
      province: '',
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
        ...initialState,
        loginForm: {
          ...loginForm,
          isLoading: false,
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
      let address = getSafe(() => payload.identity.homeBranch.address, null)
      return {
        ...state,
        confirmationForm: getSafe(() => payload.identity.company.reviewRequested, false) ? {
          address: {
            city: payload.identity.homeBranch.address.city,
            country: JSON.stringify({ countryId: address.country.id, hasProvinces: address.country.hasProvinces }),
            province: address.province ? address.province.id : null,
            streetAddress: address.streetAddress,
            zip: address.zip.zip,
          },
          companyAdminUser: {
            name: payload.identity.name,
            jobTitle: undefined,
            phone: payload.identity.phone,
            email: payload.identity.email
          },
          dba: '',
          dunsNumber: payload.identity.company.dunsNumber,
          name: payload.identity.company.name,
          tin: payload.identity.company.tin
        } : state.confirmationForm,
        identity: {
          ...payload.identity,
          ...getAccessRights(payload.identity.roles)
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

      return {
        ...state,
        identity: { ...payload, ...getAccessRights(payload.roles) }
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


    /* UPDATE_COMPANY */

    case AT.UPDATE_COMPANY_FULFILLED: {
      return {
        ...state,
        identity: {
          ...state.identity,
          company: payload
        }

      }
    }

    /* GET_IDENTITY */

    case AT.GET_IDENTITY_FULFILLED: {
      return {
        ...state,
        identity: { ...payload, ...getAccessRights(payload.roles) }
      }
    }

    case AT.POST_COMPANY_LOGO_FULFILLED: {
      return {
        ...state,
        identity: {
          ...state.identity,
          company: {
            ...state.identity.company,
            hasLogo: true
          }
        }
      }
    }

    case AT.DELETE_COMPANY_LOGO_FULFILLED: {
      return {
        ...state,
        identity: {
          ...state.identity,
          company: {
            ...state.identity.company,
            hasLogo: false
          }
        }
      }
    }

    /* REGISTER_DWOLLA_ACCOUNT */
    case SETTINGS_CREATE_DWOLLA_ACCOUNT_FULFILLED:
    case ADMIN_CREATE_DWOLLA_ACCOUNT_FULFILLED: {
      return {
        ...state,
        identity: {
          ...state.identity,
          company: {
            ...state.identity.company,
            hasDwollaAccount: true,
            dwollaAccountStatus: 'verified',
          }

        }
      }
    }
    /* AGREE_TOS */

    case AT.AGREE_WITH_TOS_FULFILLED: {
      return {
        ...state,
        identity: {
          ...state.identity,
          tosAgreementDate: moment().utc().format()
        }
      }
    }

    default: {
      return state
    }
  }
}