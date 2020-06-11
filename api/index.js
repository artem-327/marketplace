import axios from 'axios'
import Cookie from 'js-cookie'
import Router from 'next/router'
import { Message } from '~/modules/messages'
//axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.defaults.validateStatus = status => {
  return status < 400
}

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const auth = Cookie.getJSON('auth')

    if (auth && !config.headers['Authorization']) config.headers['Authorization'] = 'Bearer ' + auth.access_token

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    try {
      Message && Message.checkForMessages && Message.checkForMessages(response)
    } catch (error) {
      console.error(error)
    }
    return response
  },
  function (error) {
    const hasWindow = typeof window !== 'undefined'
    // const errData = error && error.response && error.response.data
    if (
      error.request.responseType === 'blob' &&
      error.response.data instanceof Blob &&
      error.response.data.type &&
      error.response.data.type.toLowerCase().indexOf('json') != -1
    ) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => {
          error.response.data = JSON.parse(reader.result)

          Message.checkForMessages(error.response)

          if (error.response.status >= 401) {
            switch (error.response.status) {
              case 401:
                Router.push('/auth/logout?auto=true')
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

    try {
      Message.checkForMessages(error.response)
    } catch (error) {
      console.error(error)
    }

    if (error.response.status >= 401) {
      switch (error.response.status) {
        case 401:
          Router.push('/auth/logout?auto=true')
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

export default axios
