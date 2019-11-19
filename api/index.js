import axios from 'axios'
import Cookie from 'js-cookie'
import Router from 'next/router'

// axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.defaults.validateStatus = status => {
  return status < 400
}

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const auth = Cookie.getJSON('auth')

    if (auth && !config.headers['Authorization']) config.headers['Authorization'] = 'Bearer ' + auth.access_token

    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => response,
  function(error) {
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
          resolve(Promise.reject(error))
        }

        reader.onerror = () => {
          reject(error)
        }

        reader.readAsText(error.response.data)
      })
    } else if (
      error &&
      error.response &&
      error.response.config &&
      error.response.config.headers &&
      error.response.config.headers.Pragma &&
      error.response.config.headers.Pragma.includes('no-handle-error')
    ) {
      // do nothing
    } else {
      // Do something with response error

      if (error.response && error.response.status === 401) {
        Router.push('/auth/logout?auto=true')
      }

      const errData = error && error.response && error.response.data

      return Promise.reject(errData || error)
    }
  }
)

export default axios
