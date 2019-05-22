import api from '~/api'

export const addZip = (zip) => new Promise((resolve) => setTimeout(() => resolve({ zip, id: Math.floor(Math.random() * 1234) }), 2000)) // Probably won't be used...
export const getZipCodes = (params) => {
  let queryString = '?'
  let keys = Object.keys(params)

  keys.forEach((key, i) => {
    queryString += `${key}=${params[key]}${i !== (keys.length - 1) ? '&' : ''}`
  })
  return api.get(`/prodex/api/zip-codes${queryString}`).then(response => response.data)
}