import React from 'react'
//Components
import MyProfile from './MyProfile'
import ChangePassword from './ChangePassword'
/**
 * @category Profile
 * @component
 */
const Profile = props => {
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

export default Profile
