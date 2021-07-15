import React from 'react'
import { connect } from 'react-redux'
//Components
import Profile from './Profile'
//Actions
import { getLanguages } from '../../global-data/actions'
import { getIdentity } from '../../auth/actions'
import { changePassword, closeChangePasswordPopup, closePopup, getUserMeData, getCurrencies, updateMyProfile, openChangePasswordPopup, setPreferredLanguage, loadFile, saveAvatarPicture, deleteAvatarPicture } from '../actions'
//Selectors
import { makeGetChangePasswordPopup, makeGetTutorialCompleted, makeGetPopupValues } from '../selectors'
import { makeGetLanguagesDropdown, makeGetLanguagesLoading } from '../../global-data/selectors'

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
  const getLanguages = makeGetLanguagesDropdown()
  const getLanguagesFetching = makeGetLanguagesLoading()
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
