import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Divider } from 'semantic-ui-react'

class Profile extends Component {

  render() {

    return (
      <h1>My Profile 123</h1>
    )
  }
}


const mapStateToProps = state => {
  return {
    ...state.profile,
  }
}

export default connect(mapStateToProps, null)(Profile)