// import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import ServerCookie from 'cookie'
import api from '~/api'

export const IDLE_TIMEOUT = 30 * (60 * 1000)

export const setAuth = (auth) => {
  let now = new Date()
  now.setTime(now.getTime() + (IDLE_TIMEOUT+1000))
  Cookie.set('auth', auth, {expires: now})
}

export const unsetAuth = () => {

  Cookie.remove('auth')

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  window.localStorage.removeItem('state')
}

export const getAuthFromServerCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const cookie = ServerCookie.parse(req.headers.cookie)
  
  const auth = JSON.parse(cookie.auth || null)
  
  return auth
}

export const getAuthFromLocalCookie = () => {
  return Cookie.getJSON('auth')
}

export async function authorize(username, password) {
  const {data} = await api.post(
    '/prodex/oauth/token',
    `grant_type=password&username=${username}&password=${password}`,
    {
      headers: {
        'Authorization': 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs'
      }
    })
    
  return data
}

export async function refreshToken() {
  const auth = Cookie.getJSON('auth')
  if (!auth) return

  const {data} = await api.post('/prodex/oauth/token',
    `grant_type=refresh_token&refresh_token=${auth.refresh_token}`,
    {
      headers: {
        'Authorization': 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

  setAuth(data)

  return data
}