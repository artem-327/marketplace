import axios from 'axios'
import Cookie from 'js-cookie'
import Router from 'next/router'
import { Message } from '~/modules/messages'
import { refreshToken } from '~/utils/auth'
import { getSafe } from '~/utils/functions'

//axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.defaults.validateStatus = status => {
  return status < 400
}

axios.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const auth = await Cookie.getJSON('auth')

    if (
      auth &&
      (!config.headers['Authorization'] ||
        (getSafe(() => auth.access_token, '') !== getSafe(() => config.headers['Authorization'], '') &&
          !getSafe(() => config.headers['Authorization'], '').includes('Basic'))) // 'Basic' means Authorization from refresh token request from auth.js from refreshToken()
    )
      config.headers['Authorization'] = 'Bearer ' + auth.access_token

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

axios.interceptors.response.use(
  response => {
    try {
      Message && Message.checkForMessages && Message.checkForMessages(response)
    } catch (error) {
      console.error(error)
    }
    return response
  },
  async function (error) {
    const {
      response: { status, config }
    } = error
    const originalRequest = config

    if (status === 401) {
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true
        try {
          let data = await refreshToken()
          isAlreadyFetchingAccessToken = false
          data && onAccessTokenFetched(data.access_token)
        } catch (err) {
          Router.push('/auth/logout')
        }
      }

      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber(access_token => {
          originalRequest.headers.Authorization = 'Bearer ' + access_token
          resolve(axios(originalRequest))
        })
      })
      return retryOriginalRequest
    }

    if (status === 500) {
      hasWindow && window.localStorage.setItem('errorStatus', '500')
      Router.push('/errors')
    }
    if (status === 504) {
      hasWindow && window.localStorage.setItem('errorStatus', '504')
      Router.push('/errors')
    }
    if (status === 403) {
      hasWindow && window.localStorage.setItem('errorStatus', '403')
      Router.push('/errors')
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

          switch (status) {
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

export default axios
