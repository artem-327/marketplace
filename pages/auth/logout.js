import React, {Component} from 'react'
import {Logout} from '~/modules/auth'
import {withRouter} from 'next/router'

class LogoutPage extends Component {
  render() { 
    return <Logout {...this.props} /> 
  }
}

export default withRouter(LogoutPage)