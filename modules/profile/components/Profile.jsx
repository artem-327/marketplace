import React from 'react'
import { connect } from 'react-redux'

import MyProfile from './MyProfile'
import ChangePassword from './ChangePassword'

const Profile = props => {
  const renderContent = () => {
    const { changePasswordPopup } = props

    return (
      <>
        {!changePasswordPopup && <MyProfile />}
        {changePasswordPopup && <ChangePassword />}
      </>
    )
  }

  return renderContent()
}

const mapStateToProps = ({ profile }) => {
  return { ...profile }
}

export default connect(mapStateToProps, null)(Profile)
