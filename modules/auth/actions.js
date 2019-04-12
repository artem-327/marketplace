import * as AT from './action-types'
import * as api from './api'
import {setAuth, unsetAuth, authorize} from '~/utils/auth'
import Router from 'next/router'

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
      const auth = await authorize(username, password)
      setAuth(auth)
      const identity = await api.getIdentity()
      const isAdmin = identity.roles.map(r => r.id).indexOf(1) > -1
      setAuth({
        ...auth,
        isAdmin: isAdmin
      })
      isAdmin ? Router.push('/admin') : Router.push('/inventory/my')
      return {
        auth,
        identity
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