import axios from 'axios'
import Cookie from 'js-cookie'

axios.defaults.baseURL = process.env.REACT_APP_API_URL // 'https://test.echoexchange.net/'
axios.defaults.validateStatus = (status) => {
  return status < 400
}

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = Cookie.get('accessToken')
  
  if (accessToken) config.headers['Authorization'] = 'Bearer ' + accessToken

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, function (error) {
  // Do something with response error
  const errData = error && error.response && error.response.data

  return Promise.reject(errData || error)
})

export default axios
