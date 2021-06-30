import { createSelector } from 'reselect'
import moment from 'moment'
import { getSafe } from '../../utils/functions'

const getChangePasswordPopup = state => state?.profile?.changePasswordPopup
const getLanguages = state => state?.globalData?.languagesDropdown
const getLanguagesFetching = state => state?.globalData?.languagesLoading
const getTutorialCompleted = state => state?.auth?.identity?.tutorialCompleted
const getPopupValues = state => state?.auth?.identity
const getLastLoginAt = state => state?.auth?.identity?.lastLoginAt

export const makeGetChangePasswordPopup = () => createSelector([getChangePasswordPopup], changePasswordPopup => {return changePasswordPopup})
export const makeGetLanguages = () => createSelector([getLanguages], languages => {return languages})
export const makeGetLanguagesFetching = () => createSelector([getLanguagesFetching], languagesFetching => {return languagesFetching})
export const makeGetTutorialCompleted = () => createSelector([getTutorialCompleted], tutorialCompleted => {return getSafe(() => tutorialCompleted, false)})
export const makeGetPopupValues = () => createSelector([getPopupValues, getLastLoginAt], (popupValues, lastLoginAt) => {
  return popupValues
  ? {
      email: popupValues.email,
      name: popupValues.name,
      phone: popupValues.phone,
      jobTitle: popupValues.jobTitle,
      language: getSafe(() => popupValues.preferredLanguage.language),
      lastLoginAt: lastLoginAt && getSafe(() => moment(lastLoginAt).toDate().toLocaleString(), null),
      avatar: popupValues.avatarUrl,
      ownAvatar: popupValues.ownAvatar
    }
  : null
})
