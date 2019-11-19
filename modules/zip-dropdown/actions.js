import * as AT from './action-types'
import * as api from './api'

export const addZip = zip => ({type: AT.ADD_ZIP, payload: zip})
export const getZipCodes = (params = {}) => ({type: AT.GET_ZIP_CODES, payload: api.getZipCodes(params)})
