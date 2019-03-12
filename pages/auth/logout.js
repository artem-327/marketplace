import React, {Component} from 'react'
import {unsetToken} from '../../utils/auth'
import defaultPage from '~/hocs/defaultPage'
import Router from 'next/router'

class Logout extends Component {
  componentDidMount() {
    unsetToken()
    Router.push('/auth/login')
  }

  render() { return null }
}

export default defaultPage(Logout)