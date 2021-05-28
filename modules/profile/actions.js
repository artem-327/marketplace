import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import api from './api'

export const openProfilePopup = createAction('PROFILE_OPEN_POPUP')
export const closePopup = createAction('PROFILE_CLOSE_POPUP')
export const openChangePasswordPopup = createAction('PROFILE_OPEN_CHANGE_PASSWORD')
export const closeChangePasswordPopup = createAction('PROFILE_CLOSE_CHANGE_PASSWORD')
export const getUserMeData = createAsyncAction('PROFILE_GET_USERS_ME', () => api.getUsersMe())
export const getCurrencies = createAsyncAction('PROFILE_GET_CURRENCIES', () => api.getCurrencies())
export const updateMyProfile = createAsyncAction('PROFILE_UPDATE_MY_PROFILE', payload => api.updateMyProfile(payload))
export const changePassword = createAsyncAction('PROFILE_CHANGE_PASSWORD', data => api.changePassword(data))
export const setPreferredLanguage = createAsyncAction('PROFILE_PREFERRED_LANGUAGE', lang => api.setPreferredLanguage(lang))
export const loadFile = createAsyncAction('PROFILE_LOAD_FILE', attachment => api.loadFile(attachment))
export const saveAvatarPicture = createAsyncAction('PROFILE_SAVE_AVATAR_PICTURE', picture => api.saveAvatarPicture(picture))
export const deleteAvatarPicture = createAsyncAction('PROFILE_DELETE_AVATAR_PICTURE', () => api.deleteAvatarPicture())