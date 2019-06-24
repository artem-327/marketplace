
import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import SettingsPage from '~/modules/settings'
import {withRouter, Router} from 'next/router'

class Index extends Component {

  render() {

    return (
      <Layout title="Settings">
          <SettingsPage type={this.props.router.query.type} />
      </Layout>
    )
  }
}

export default withRouter(securePage(Index))