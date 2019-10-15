import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '~/modules/auth/actions'
import { chatWidgetTerminate } from '~/utils/chatWidget'

class Logout extends Component {
  componentDidMount() {
    const { logout, router } = this.props

    chatWidgetTerminate()
    logout(router.query.auto)
  }

  render() { return null }
}

export default connect(() => ({}), { logout })(Logout)