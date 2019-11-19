import React, {Component} from 'react'
import {connect} from 'react-redux'

import MyProfile from './MyProfile'
import ChangePassword from './ChangePassword'

class Profile extends Component {
  renderContent = () => {
    const {changePasswordPopup} = this.props

    return (
      <>
        {!changePasswordPopup && <MyProfile />}
        {changePasswordPopup && <ChangePassword />}
      </>
    )
  }

  render() {
    return this.renderContent()
  }
}

const mapStateToProps = ({profile}) => {
  return {...profile}
}

export default connect(mapStateToProps, null)(Profile)
