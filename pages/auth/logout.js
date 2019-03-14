import React, {Component} from 'react'
import defaultPage from '~/hocs/defaultPage'
import {Logout} from '~/modules/auth'

class LogoutPage extends Component {
  render() { 
    return <Logout /> 
  }
}

export default LogoutPage