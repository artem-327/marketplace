import * as AT from './action-types'
import * as api from './api'
import { setAuth, unsetAuth, authorize } from '~/utils/auth'
import Router from 'next/router'
import { ROLES_ENUM } from '~/src/utils/constants'
import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'

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

        const isAdmin = identity.roles.map(r => r.id).indexOf(1) > -1

        let accessRights = {}

        if (identity.roles) {
          ROLES_ENUM.forEach(role => {
            accessRights[role.propertyName] = !!identity.roles.find(el => el.id === role.id)
          })
        }

        setAuth(authPayload)
        let urlPage = '/inventory/my'
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
        // if (!getSafe(() => identity.company.reviewRequested, false) || !identity.roles.find(role => role.name === 'CompanyAdmin')) {
        // user is first login as companyAdmin then redirect to settings
        if (
          identity &&
          identity.isCompanyAdmin &&
          identity.company &&
          !identity.company.reviewRequested &&
          !identity.lastLoginAt
        ) {
          urlPage = '/settings'
        }
        if (
          !(
            identity.roles.find(role => role.name === 'Company Admin') &&
            getSafe(() => identity.company.reviewRequested, false)
          )
        ) {
          isAdmin ? Router.push('/admin') : Router.push(urlPage)
        }

        return authPayload
      }
    })
    // dispatch(triggerAgreementModal(true))
  }
}

export function getVersion() {
  return {
    type: AT.GET_VERSION,
    payload: api.getVersion()
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

// export function registration(email, password, firstName, middleName, lastName) {
//   return {
//     type: AT.REGISTRATION,
//     payload: axios({
//       method: 'post',
//       url: "/api/users",
//       data: {
//         email: email,
//         password: password,
//         firstname: firstName,
//         middlename: middleName,
//         lastname: lastName
//       }
//     })
//   }
// }

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

export const searchCountries = searchQuery => ({
  type: AT.AUTH_SEARCH_COUNTRIES,
  payload: api.searchCountries(searchQuery)
})

export const searchProvinces = countryId => ({
  type: AT.AUTH_SEARCH_PROVINCES,
  payload: api.searchProvinces(countryId)
})

export const updateIdentity = payload => ({ type: AT.UPDATE_IDENTITY, payload })

export const updateCompany = (id, payload) => ({ type: AT.UPDATE_COMPANY, payload: api.updateCompany(id, payload) })

export const agreeWithTOS = () => ({ type: AT.AGREE_WITH_TOS, payload: api.agreeWithTOS() })
