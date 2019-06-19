
import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import SettingsPage from '~/modules/settings'
import {withRouter, Router} from 'next/router'
import {ToastProvider} from 'react-toast-notifications'

class Index extends Component {

  render() {

    return (
      <Layout title="Settings">
        <ToastProvider autoDismissTimeout={10 * 1000}>
          <SettingsPage type={this.props.router.query.type} />
        </ToastProvider>
      </Layout>
    )
  }
}

export default withRouter(securePage(Index))