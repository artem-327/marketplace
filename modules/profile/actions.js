import * as AT from './action-types'
import api from './api'

import {SET_PREFERRED_LANGUAGE} from '~/modules/settings/action-types'
import {setPreferredLanguage} from '~/modules/settings/actions'

const removeEmpty = obj =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      removeEmpty(val)
      if (Object.entries(val).length === 0) delete obj[key]
    } else {
      if (val == null) delete obj[key]
      else if (typeof val === 'string') {
        if (val.trim() === '') delete obj[key]
        else obj[key] = val.trim()
      }
    }
  })

export function openProfilePopup() {
  return {
    type: AT.PROFILE_OPEN_POPUP,
    payload: null
  }
}

export function closePopup() {
  return {
    type: AT.PROFILE_CLOSE_POPUP,
    payload: null
  }
}

export function openChangePasswordPopup() {
  return {
    type: AT.PROFILE_OPEN_CHANGE_PASSWORD,
    payload: null
  }
}

export function closeChangePasswordPopup() {
  return {
    type: AT.PROFILE_CLOSE_CHANGE_PASSWORD,
    payload: null
  }
}

export function getUserMeData() {
  return {
    type: AT.PROFILE_GET_USERS_ME,
    payload: api.getUsersMe()
  }
}

export function getCurrencies() {
  return {
    type: AT.PROFILE_GET_CURRENCIES,
    payload: api.getCurrencies()
  }
}

export const updateMyProfile = payload => ({type: AT.PROFILE_UPDATE_MY_PROFILE, payload: api.updateMyProfile(payload)})

export function changePassword(data) {
  return {
    type: AT.PROFILE_CHANGE_PASSWORD,
    payload: api.changePassword(data)
  }
}
