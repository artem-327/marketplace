import Router from 'next/router'
//Action Types
import * as AT from './action-types'
//API
import * as api from './api'
//Functions
import { setAuth, unsetAuth, authorize } from '../../utils/auth'
import { getSafe } from '../../utils/functions'
//Constants
import { ROLES_ENUM } from '../../utils/constants'
import { currency } from '../../constants/index'

export function getIdentity() {
  return {
    type: AT.GET_IDENTITY,
    async payload() {
      const identity = await api.getIdentity()
      const company = identity.company ? await api.getCompanyDetails(identity.company.id) : null
      const preferredCurrency = getSafe(() => identity.preferredCurrency, currency)
      return {
        identity: {
          ...identity,
          company:
            identity.company || company
              ? {
                  ...identity.company,
                  ...company
                }
              : null
        },
        preferredCurrency
      }
    }
  }
}

export function loginInit() {
  return {
    type: AT.LOGIN_INIT
  }
}

export function login(username, password) {
  return async dispatch => {
    await dispatch({
      type: AT.LOGIN,
      async payload() {
        const auth = await authorize(username, password)
        setAuth(auth)
        const identity = await api.getIdentity()

        let company = identity.company ? await api.getCompanyDetails(identity.company.id) : null
        const preferredCurrency = getSafe(() => identity.preferredCurrency, currency)

        const authPayload = {
          ...auth,
          identity: {
            ...identity,
            company:
              identity.company || company
                ? {
                    ...identity.company,
                    ...company
                  }
                : null
          },
          preferredCurrency
        }

        if (typeof window !== 'undefined' && window.FS) {
          try {
            window.FS.identify(identity.id)
          } catch (e) {
            console.error(e)
          }
        } else {
          console.error('Google Tag Manager or FullStory not installed')
        }

        const isAdmin = identity.roles.map(r => r.role).indexOf('SUPER_ADMIN') > -1
        const isOrderOperator = identity.roles.map(r => r.role).indexOf('ORDER_OPERATOR') > -1
        const isOrderProcessing = identity.roles.map(r => r.role).indexOf('ORDER_PROCESSING') > -1
        const isOrderView = identity.roles.map(r => r.role).indexOf('ORDER_VIEW') > -1
        const isCompanyAdmin = identity.roles.map(r => r.role).indexOf('COMPANY_ADMIN') > -1
        const isMerchant = identity.roles.map(r => r.role).indexOf('MERCHANT') > -1
        const isProductCatalogAdmin = identity.roles.map(r => r.role).indexOf('PRODUCT_CATALOG_ADMIN') > -1
        const isProductOfferManager = identity.roles.map(r => r.role).indexOf('PRODUCT_OFFER_MANAGER') > -1
        const isUserAdmin = identity.roles.map(r => r.role).indexOf('USER_ADMIN') > -1

        let accessRights = {}

        if (identity.roles) {
          ROLES_ENUM.forEach(role => {
            accessRights[role.propertyName] = !!identity.roles.find(el => el.role === role.role)
          })
        }

        setAuth(authPayload)
        let urlPage = '/dashboard'
        if (typeof window !== 'undefined') {
          const searchParams = new URLSearchParams(getSafe(() => window.location.search, ''))
          if (searchParams.has('redirectUrl')) {
            urlPage = decodeURI(getSafe(() => window.location.search.split('redirectUrl=')[1], urlPage))
            //Remove password from URL if exist password or username. We do not know why is password and username in URL.
            //In ctx.req.url has credentials in securePage, but we do not know when got and why has this credentials.
            //This is hot fix.
            if (urlPage.includes('password') || urlPage.includes('username')) {
              urlPage = '/'
            }
          }
        }

        if (
          identity &&
          isCompanyAdmin &&
          identity.company &&
          !identity.company.reviewRequested &&
          !identity.lastLoginAt
        ) {
          urlPage = '/settings/company-details'
        }
        if (isAdmin) urlPage = '/dashboard'
        if (identity && identity.roles.find(role => role.role === 'OPERATOR')) {
          urlPage = '/operations/shipping-quotes'
        }
        if (isOrderOperator) {
          urlPage = '/operations/orders'
        }

        if (
          identity &&
          !isCompanyAdmin &&
          !isMerchant &&
          !isProductCatalogAdmin &&
          !isProductOfferManager &&
          !isUserAdmin &&
          (isOrderProcessing || isOrderView)
        ) {
          urlPage = '/orders/sales'
        }

        Router.push(urlPage)
        return authPayload
      }
    })
  }
}

export function getVersion() {
  return dispatch => {
    dispatch({
      type: AT.GET_VERSION_PENDING
    })
    api
      .getVersion()
      .then(async response => {
        await dispatch({
          type: AT.GET_VERSION_FULFILLED,
          payload: response.data
        })
      })
      .catch(async err => {
        await dispatch({
          type: AT.GET_VERSION_REJECTED,
          error: err
        })
      })
  }
}

export function logout(isAutologout) {
  unsetAuth()

  Router.push(`/auth/login${isAutologout ? '?auto=true' : ''}`)

  return {
    type: AT.LOGOUT
  }
}

export const resetPasswordRequest = email => ({
  type: AT.RESET_PASSWORD_REQUEST,
  payload: async () => {
    await api.resetPasswordRequest(email)
    Router.push('/password/reset')
  }
})

export const reviewCompany = values => {
  delete values.address.availableCountries
  delete values.address.availableProvinces

  return {
    type: AT.AUTH_REVIEW_COMPANY,
    async payload() {
      return await api.reviewCompany(values)
    }
  }
}

export const setCompanyElligible = () => ({
  type: AT.SET_COMPANY_SELL_ELLIGIBLE,
  payload: async () => {
    let data = await api.getIdentity()
    return getSafe(() => data.company.sellEligible, '')
  }
})

export const searchCountries = searchQuery => {
  return async dispatch => {
    await dispatch({
      type: AT.AUTH_SEARCH_COUNTRIES_REJECTED
    })
    await api
      .searchCountries(searchQuery)
      .then(async response => {
        await dispatch({
          type: AT.AUTH_SEARCH_COUNTRIES_FULFILLED,
          payload: response.data
        })
      })
      .catch(async err => {
        await dispatch({
          type: AT.AUTH_SEARCH_COUNTRIES_REJECTED,
          error: err
        })
      })
  }
}

export const searchProvinces = countryId => {
  return async dispatch => {
    await dispatch({
      type: AT.AUTH_SEARCH_PROVINCES_PENDING
    })
    await api
      .searchProvinces(countryId)
      .then(async response => {
        await dispatch({
          type: AT.AUTH_SEARCH_PROVINCES_FULFILLED,
          payload: response.data
        })
      })
      .catch(async err => {
        await dispatch({
          type: AT.AUTH_SEARCH_PROVINCES_REJECTED,
          error: err
        })
      })
  }
}

export const updateIdentity = payload => ({ type: AT.UPDATE_IDENTITY, payload })

export const updateCompany = (id, payload) => {
  return async dispatch => {
    await dispatch({
      type: AT.UPDATE_COMPANY_PENDING
    })
    await api
      .updateCompany(id, payload)
      .then(async response => {
        await dispatch({
          type: AT.UPDATE_COMPANY_FULFILLED,
          payload: response.data
        })
      })
      .catch(async err => {
        await dispatch({
          type: AT.UPDATE_COMPANY_REJECTED,
          error: err
        })
      })
  }
}

export const agreeWithTOS = () => {
  return async dispatch => {
    await dispatch({
      type: AT.AGREE_WITH_TOS_PENDING
    })
    await api
      .agreeWithTOS()
      .then(async response => {
        await dispatch({
          type: AT.AGREE_WITH_TOS_FULFILLED,
          payload: response.data
        })
      })
      .catch(async err => {
        await dispatch({
          type: AT.AGREE_WITH_TOS_REJECTED,
          error: err
        })
      })
  }
}

export const updateCompanyDetails = (companyId, request) => {
  return async dispatch => {
    await dispatch({
      type: AT.UPDATE_COMPANY_DETAILS_PENDING
    })
    await api
      .updateCompanyDetails(companyId, request)
      .then(
        async response =>
          await dispatch({
            type: AT.UPDATE_COMPANY_DETAILS_FULFILLED,
            payload: response.data
          })
      )
      .catch(
        async err =>
          await dispatch({
            type: AT.UPDATE_COMPANY_DETAILS_REJECTED,
            error: err
          })
      )
  }
}
