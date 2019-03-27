// import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const setToken = (accessToken) => {
  // if (!process.browser) {
  //   return
  // }
  // Cookie.set('user', jwtDecode(idToken))
  // Cookie.set('idToken', idToken)
  Cookie.set('accessToken', accessToken)
}

export const unsetToken = () => {
  // if (!process.browser) {
  //   return
  // }
  
  Cookie.remove('accessToken')

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  window.localStorage.removeItem('state')
}

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined
  }

  const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('accessToken='))

  return tokenCookie
}

export const getTokenFromLocalCookie = () => {
  return Cookie.get('accessToken')
}

// Temporary unused. Waiting for valid jwt object from server
// export const getUserFromServerCookie = (req) => {
//   if (!req.headers.cookie) {
//     return undefined
//   }
//   const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('idToken='))
//   if (!jwtCookie) {
//     return undefined
//   }
//   const jwt = jwtCookie.split('=')[1]
//   return jwtDecode(jwt)
// }

// export const getUserFromLocalCookie = () => {
//   return Cookie.getJSON('user')
// }