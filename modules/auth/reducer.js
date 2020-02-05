import moment from 'moment'

import * as AT from './action-types'
import { ROLES_ENUM } from '../../src/utils/constants'
import { getSafe } from '~/utils/functions'
import { ADMIN_CREATE_DWOLLA_ACCOUNT_FULFILLED } from '~/modules/admin/action-types'
import { SETTINGS_CREATE_DWOLLA_ACCOUNT_FULFILLED } from '~/modules/settings/action-types'
import { SET_PREFERRED_LANGUAGE_FULFILLED } from '~/modules/settings/action-types'
import { PROFILE_UPDATE_MY_PROFILE_FULFILLED } from '~/modules/profile/action-types'

const getAccessRights = roles => {
  let accessRights = {}

  if (roles) {
    ROLES_ENUM.forEach(role => {
      accessRights[role.propertyName] = !!roles.find(el => el.id === role.id)
    })
  }

  return accessRights
}

export const initialState = {
  confirmationForm: {
    address: {
      address: {
        city: '',
        country: '',
        province: '',
        streetAddress: '',
        zip: ''
      },
      addressName: '',
      callAhead: false,
      closeTime: null,
      contactEmail: '',
      contactName: '',
      contactPhone: '',
      deliveryNotes: '',
      forkLift: false,
      liftGate: false,
      readyTime: null
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
    version: ''
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
          message: payload.response.data.error_description
        }
      }
    }
    case AT.GET_IDENTITY_FULFILLED:
    case AT.LOGIN_FULFILLED: {
      let deliveryAddress = getSafe(() => payload.identity.company.primaryBranch.deliveryAddress, null)
      let address = getSafe(() => payload.identity.company.primaryBranch.deliveryAddress.address, null)
      let primaryUser = getSafe(() => payload.identity.company.primaryUser, null)

      return {
        ...state,
        confirmationForm:
          getSafe(() => payload.identity.company.reviewRequested, false) && primaryUser
            ? {
                address: {
                  address: {
                    city: address.city,
                    country: JSON.stringify({
                      countryId: address.country.id,
                      hasProvinces: address.country.hasProvinces
                    }),
                    province: address.province ? address.province.id : null,
                    streetAddress: address.streetAddress,
                    zip: address.zip.zip
                  },
                  addressName: deliveryAddress.cfName || '',
                  callAhead: !!deliveryAddress.callAhead,
                  closeTime: deliveryAddress.closeTime || null,
                  contactEmail: deliveryAddress.contactEmail || primaryUser.email || '',
                  contactName: deliveryAddress.contactName || primaryUser.name || '',
                  contactPhone: deliveryAddress.contactPhone || primaryUser.phone || '',
                  deliveryNotes: deliveryAddress.deliveryNotes || '',
                  forkLift: !!deliveryAddress.forkLift,
                  liftGate: !!deliveryAddress.liftGate,
                  readyTime: deliveryAddress.readyTime || null
                },
                companyAdminUser: {
                  name: payload.identity.name,
                  jobTitle: payload.identity.jobTitle,
                  phone: payload.identity.phone,
                  email: payload.identity.email
                },
                dba: payload.identity.company.dba,
                dunsNumber: payload.identity.company.dunsNumber,
                name: payload.identity.company.name,
                tin: payload.identity.company.tin
              }
            : state.confirmationForm,
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

    case PROFILE_UPDATE_MY_PROFILE_FULFILLED:
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
            dwollaAccountStatus: 'verified'
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
          tosAgreementDate: moment().format()
        }
      }
    }

    /* SET_LANGUAGE */

    case SET_PREFERRED_LANGUAGE_FULFILLED: {
      return {
        ...state,
        identity: {
          ...state.identity,
          preferredLanguage: payload
        }
      }
    }

    /* SET_COMPANY_SELL_ELLIGIBLE */

    case AT.SET_COMPANY_SELL_ELLIGIBLE: {
      return {
        ...state,
        identity: {
          ...state.identity,
          company: {
            ...state.identity.company,
            sellEligible: payload
          }
        }
      }
    }

    default: {
      return state
    }
  }
}
