import * as AT from "./action-types"
import api from "./api"

const removeEmpty = (obj) =>
    Object.entries(obj).forEach(([key, val]) => {
        if (val && typeof val === 'object') {
            removeEmpty(val)
            if (Object.entries(val).length === 0) delete obj[key]
        }
        else {
            if (val == null) delete obj[key]
            else if (typeof val === 'string') {
                if (val.trim() === '') delete obj[key]
                else obj[key] = val.trim()
            }
        }
    })

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

export function updateMyProfile(data) {
  return {
    type: AT.PROFILE_UPDATE_MY_PROFILE,
    payload: api.updateMyProfile(data)
  }
}

export function changePassword(data) {
  return {
    type: AT.PROFILE_CHANGE_PASSWORD,
    payload: api.changePassword(data)
  }
}