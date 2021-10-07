import Cookie from 'js-cookie'
import api from '../api'
import Router from 'next/router'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const setAuth = async auth => {
  let now = new Date()
  now.setTime(now.getTime() + auth.expires_in * 1000)

  await window.localStorage.setItem('ttl', now.getTime())

  await Cookie.set(
    'auth',
    { ...auth, expires_in: now.getTime() },
    process && process.env && process.env.APP_ENV === 'local'
      ? {}
      : {
        secure: true,
        sameSite: 'Strict'
      }
  )
}

export const unsetAuth = () => {
  Cookie.remove('auth')

  // to support logging out from all windows
  //window.localStorage.setItem('logout', Date.now())
  window.localStorage.removeItem('state')
}

// export const getAuthFromServerCookie = (req) => {
//   if (!req.headers.cookie) {
//     return undefined
//   }
//   const cookie = ServerCookie.parse(req.headers.cookie)
//   const auth = JSON.parse(cookie.auth || null)

//   return auth
// }

// export const getAuthFromLocalCookie = () => {
//   return Cookie.getJSON('auth')
// }

export async function authorize(username, password, session = null, option = null, code = null) {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  const visitorId = result.visitorId

  const { data } = await api.post(
    '/prodex/oauth/token',
    session
      ? (
        option
          ? `grant_type=password&username=${username}&mfa_session=${session}&mfa_option=${option}&device_id=${visitorId}`
          : `grant_type=password&username=${username}&mfa_session=${session}&mfa_code=${code}&device_id=${visitorId}`
      )
      : `grant_type=password&username=${username}&password=${password}&device_id=${visitorId}`,
    {
      headers: {
        Authorization: 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs'
      }
    }
  )
  return data
}

export async function refreshToken() {
  const auth = Cookie.getJSON('auth')
  if (!auth) return
  // if (auth.expires - 60000 > new Date().getTime()) return
  try {
    const { data } = await api.post(
      '/prodex/oauth/token',
      `grant_type=refresh_token&refresh_token=${auth.refresh_token}`,
      {
        headers: {
          Authorization: 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    await setAuth(data)

    return data
  } catch (error) {
    Router.push('/auth/logout')
    return ''
  }
}
