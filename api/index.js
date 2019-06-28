import axios from 'axios'
import Cookie from 'js-cookie'

axios.defaults.baseURL = process.env.REACT_APP_API_URL // 'https://test.echoexchange.net/'
axios.defaults.validateStatus = (status) => {
  return status < 400
}

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const auth = Cookie.getJSON('auth')
  
  if (auth && !config.headers['Authorization']) config.headers['Authorization'] = 'Bearer ' + auth.access_token

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, function (error) {
  if (error && error.response && error.response.config && error.response.config.headers && error.response.config.headers.Pragma && error.response.config.headers.Pragma.includes('no-handle-error')) {
    // do nothing
  } else {
    // Do something with response error
    const errData = error && error.response && error.response.data

    return Promise.reject(errData || error)
  }
})

export default axios
