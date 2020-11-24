import axios from 'axios'
import Cookie from 'js-cookie'
import Router from 'next/router'
import { Message } from '~/modules/messages'
import { refreshToken } from '~/utils/auth'
import { getSafe } from '~/utils/functions'
const customAxios = axios.create()
//axios.defaults.baseURL = process.env.REACT_APP_API_URL

customAxios.defaults.validateStatus = status => {
  return status < 400
}

customAxios.interceptors.request.use(
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

customAxios.interceptors.response.use(
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

    const hasWindow = typeof window !== 'undefined'

    if (status === 401) {
      return await resetTokenAndReattemptRequest(error)
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
    } else {
      try {
        Message.checkForMessages(error.response)
      } catch (error) {
        console.error(error)
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

let isAlreadyFetchingAccessToken = false

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = []

async function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error

    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
      /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token
        resolve(axios(errorResponse.config))
      })
    })
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      const response = await refreshToken()
      if (!response) {
        return Promise.reject(error)
      }
      isAlreadyFetchingAccessToken = false
      onAccessTokenFetched(response.access_token)
    }
    return retryOriginalRequest
  } catch (err) {
    Router.push('/auth/logout')
    return Promise.reject(err)
  }
}

function onAccessTokenFetched(access_token) {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(access_token))
  subscribers = []
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

export default customAxios
