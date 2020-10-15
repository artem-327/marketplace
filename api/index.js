import axios from 'axios'
import Cookie from 'js-cookie'
import Router from 'next/router'
import { Message } from '~/modules/messages'
import { refreshToken } from '~/utils/auth'
import { getSafe } from '~/utils/functions'

//axios.defaults.baseURL = process.env.REACT_APP_API_URL
const axiosApiInstance = axios.create()

axiosApiInstance.defaults.validateStatus = status => {
  return status < 400
}

axiosApiInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const auth = await Cookie.getJSON('auth')
    console.log('auth====================================')
    console.log(auth)
    console.log('====================================')
    console.log('config====================================')
    console.log(config)
    console.log('====================================')
    if (auth) config.headers['Authorization'] = 'Bearer ' + auth.access_token

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosApiInstance.interceptors.response.use(
  response => {
    try {
      Message && Message.checkForMessages && Message.checkForMessages(response)
    } catch (error) {
      console.error(error)
    }
    return response
  },
  async function (error) {
    console.log('error===interceptors=================================')
    console.log(error.response)
    console.log('====================================')
    const originalRequest = getSafe(() => error.response.config, '')

    if (getSafe(() => error.response.status, '') === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const data = await refreshToken()
      console.log('data===refreshToken=================================')
      console.log(data)
      console.log('====================================')
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
      if (data) return await axiosApiInstance(originalRequest)
    }

    if (getSafe(() => error.response.status, '') >= 403) {
      switch (error.response.status) {
        case 500:
          hasWindow && window.localStorage.setItem('errorStatus', '500')
          Router.push('/errors')
          break
        case 504:
          hasWindow && window.localStorage.setItem('errorStatus', '504')
          Router.push('/errors')
          break
        case 403:
          hasWindow && window.localStorage.setItem('errorStatus', '403')
          Router.push('/errors')
          break
        default:
          break
      }
    }

    try {
      Message.checkForMessages(error.response)
    } catch (error) {
      console.error(error)
    }

    const hasWindow = typeof window !== 'undefined'
    // const errData = error && error.response && error.response.data
    if (
      getSafe(() => error.request.responseType, '') === 'blob' &&
      getSafe(() => error.response.data, '') instanceof Blob &&
      getSafe(() => error.response.data.type, '') &&
      getSafe(() => error.response.data.type.toLowerCase().indexOf('json'), '') != -1
    ) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => {
          error.response.data = JSON.parse(reader.result)

          Message.checkForMessages(error.response)

          if (getSafe(() => error.response.status, '') >= 403) {
            switch (error.response.status) {
              case 500:
                hasWindow && window.localStorage.setItem('errorStatus', '500')
                Router.push('/errors')
                break
              case 504:
                hasWindow && window.localStorage.setItem('errorStatus', '504')
                Router.push('/errors')
                break
              case 403:
                hasWindow && window.localStorage.setItem('errorStatus', '403')
                Router.push('/errors')
                break
              default:
                break
            }
          }
          resolve(Promise.reject(error))
        }

        reader.onerror = () => {
          reject(error)
        }

        reader.readAsText(error.response.data)
      })
    }

    if (
      error &&
      error.response &&
      error.response.config &&
      error.response.config.headers &&
      error.response.config.headers.Pragma &&
      error.response.config.headers.Pragma.includes('no-handle-error')
    ) {
      // do nothing
    }

    return Promise.reject(error)
  }
)

export default axiosApiInstance
