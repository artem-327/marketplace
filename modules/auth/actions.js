import * as AT from './action-types'
import * as api from './api'
import {setToken, unsetToken} from '~/utils/auth'

export function getIdentity() {
  return {
    type: AT.GET_IDENTITY,
    payload: api.getIdentity()
  }
}

export function login(username, password) {
  return {
    type: AT.LOGIN,
    async payload() {
      const auth = await api.login(username, password)
      setToken(auth.access_token)
      return auth
    } 
  }
}

export function getVersion() {
  return {
    type: AT.GET_VERSION,
    payload: api.getVersion()
  }
}

export function logout() {
  unsetToken()

  return {
    type: AT.LOGOUT
  }
}

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