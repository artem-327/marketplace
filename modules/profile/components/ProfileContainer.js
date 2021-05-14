import React from 'react'
import { connect } from 'react-redux'
//Components
import Profile from './Profile'
//Actions
import { getLanguages } from '../../settings/actions'
import { getIdentity } from '../../auth/actions'
import { changePassword, closeChangePasswordPopup, closePopup, getUserMeData, getCurrencies, updateMyProfile, openChangePasswordPopup, setPreferredLanguage, loadFile, saveAvatarPicture, deleteAvatarPicture } from '../actions'
//Selectors
import { makeGetChangePasswordPopup, makeGetLanguages, makeGetLanguagesFetching, makeGetTutorialCompleted, makeGetPopupValues } from '../selectors'

const mapDispatchToProps = {
  changePassword,
  closeChangePasswordPopup,
  closePopup,
  getUserMeData,
  getCurrencies,
  updateMyProfile,
  openChangePasswordPopup,
  getLanguages,
  setPreferredLanguage,
  loadFile,
  getIdentity,
  saveAvatarPicture,
  deleteAvatarPicture
}

const makeMapStateToProps = () => {
  const getChangePasswordPopup = makeGetChangePasswordPopup()
  const getLanguages = makeGetLanguages()
  const getLanguagesFetching = makeGetLanguagesFetching()
  const getTutorialCompleted = makeGetTutorialCompleted()
  const getPopupValues = makeGetPopupValues()

  const mapStateToProps = state => {
    return {
      popupValues: getPopupValues(state),
      changePasswordPopup: getChangePasswordPopup(state),
      languages: getLanguages(state),
      languagesFetching: getLanguagesFetching(state),
      tutorialCompleted: getTutorialCompleted(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Profile)
