import * as AT from './action-types'
import * as api from './api'
import { setAuth, unsetAuth, authorize } from '~/utils/auth'
import Router from 'next/router'

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
      setAuth({
        ...auth,
        isAdmin: isAdmin
      })
      isAdmin ? Router.push('/admin') : Router.push('/inventory/my')
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
  if (!isAutologout) unsetAuth()

  Router.push('/auth/login')

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


export const updateIdentity = (payload) => ({ type: AT.UPDATE_IDENTITY, payload })