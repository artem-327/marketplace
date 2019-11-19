import React, {Component} from 'react'
import securePage from '../hocs/securePage'
import Router from 'next/router'
import {connect} from 'react-redux'
import {getIdentity} from '~/modules/auth/actions'
import {getSafe} from '~/utils/functions'

class Index extends Component {
  async componentDidMount() {
    let {isAdmin} = this.props

    if (isAdmin === null) await this.props.getIdentity()
    if (isAdmin) Router.push('/admin')
    else Router.push('/inventory/my')
  }
  render() {
    return null
  }
}

export default connect(store => ({isAdmin: getSafe(() => store.auth.identity.isAdmin, null)}), {getIdentity})(
  securePage(Index)
)
