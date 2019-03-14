import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logout} from '~/modules/auth/actions'

class Logout extends Component {
  componentDidMount() {
    const {logout} = this.props
    
    logout()
  }

  render() { return null }
}

export default connect(() => ({}), {logout})(Logout)