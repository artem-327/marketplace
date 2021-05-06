import React from 'react'
import { connect } from 'react-redux'
//Components
import MyProfile from './MyProfile'
import ChangePassword from './ChangePassword'
//Actions
import { getLanguages } from '../../settings/actions'
import { getIdentity } from '../../auth/actions'
import { changePassword, closeChangePasswordPopup, closePopup, getUserMeData, getCurrencies, updateMyProfile, openChangePasswordPopup, setPreferredLanguage, loadFile, saveAvatarPicture, deleteAvatarPicture } from '../actions'
//Selectors
import { makeGetChangePasswordPopup, makeGetLanguages, makeGetLanguagesFetching, makeGetTutorialCompleted, makeGetPopupValues } from '../selectors'

/**
 * @category Profile
 * @component
 */
const ProfileContainer = props => {
  const renderContent = () => {
    const { changePasswordPopup } = props

    return (
      <>
        {!changePasswordPopup && 
          <MyProfile 
            closePopup = {props.closePopup}
            getUserMeData = {props.getUserMeData}
            getCurrencies = {props.getCurrencies}
            updateMyProfile = {props.updateMyProfile}
            openChangePasswordPopup = {props.openChangePasswordPopup}
            getLanguages = {props.getLanguages}
            setPreferredLanguage = {props.setPreferredLanguage}
            loadFile = {props.loadFile}
            getIdentity = {props.getIdentity}
            saveAvatarPicture = {props.saveAvatarPicture}
            deleteAvatarPicture = {props.deleteAvatarPicture}
            popupValues = {props.popupValues}
            changePasswordPopup = {props.changePasswordPopup}
            languages = {props.languages}
            languagesFetching = {props.languagesFetching}
            tutorialCompleted = {props.tutorialCompleted}
          />
        }
        {changePasswordPopup && 
          <ChangePassword 
            changePassword = {props.changePassword} 
            closeChangePasswordPopup = {props.closeChangePasswordPopup} 
          />
        }
      </>
    )
  }

  return renderContent()
}

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

export default connect(makeMapStateToProps, mapDispatchToProps)(ProfileContainer)
