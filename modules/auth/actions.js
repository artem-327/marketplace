import * as AT from './action-types'
import * as api from './api'
import { setAuth, unsetAuth, authorize } from '~/utils/auth'
import Router from 'next/router'
import { ROLES_ENUM } from '~/src/utils/constants'

export function getIdentity() {
  return {
    type: AT.GET_IDENTITY,
    payload: api.getIdentity()
  }
}

export function loginInit() {
  return {
    type: AT.LOGIN_INIT
  }
}

export function login(username, password) {
  return {
    type: AT.LOGIN,

    async payload() {
      const auth = await authorize(username, password)
      setAuth(auth)
      const identity = await api.getIdentity()
      const preferredCurrency = identity.preferredCurrency
      const isAdmin = identity.roles.map(r => r.id).indexOf(1) > -1

      let accessRights = {}

      if(identity.roles) {
        ROLES_ENUM.forEach(role => {
          accessRights[role.propertyName] = !!identity.roles.find((el) => el.id === role.id)
        })
      }

      setAuth({
        ...auth,
        isAdmin: isAdmin,
        identity: {
          ...accessRights
        }
      })


      if (!identity.company.reviewRequested) {
        isAdmin ? Router.push('/admin') : Router.push('/inventory/my')
      }
      
      return {
        auth,
        identity,
        preferredCurrency
      }
    }
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
  type: AT.RESET_PASSWORD_REQUEST, payload: async () => {
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

export const reviewCompany = (values) => {

  return {
    type: AT.AUTH_REVIEW_COMPANY,
    async payload() {
      const response = api.reviewCompany(values)
      const identity = await api.getIdentity()
      const isAdmin = identity.roles.map(r => r.id).indexOf(1) > -1

      isAdmin ? Router.push('/admin') : Router.push('/inventory/my')

      return response
    }
  }
}

export const searchCountries = (searchQuery) => ({ type: AT.AUTH_SEARCH_COUNTRIES, payload: api.searchCountries(searchQuery) })

export const searchProvinces = (countryId) => ({ type: AT.AUTH_SEARCH_PROVINCES, payload: api.searchProvinces(countryId) })

export const updateIdentity = (payload) => ({ type: AT.UPDATE_IDENTITY, payload })