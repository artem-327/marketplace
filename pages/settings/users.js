
import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import SettingsPage from '~/src/pages/settings'

class Index extends Component {

  render() {
    return (
      <Layout title="Settings">
        <SettingsPage type="users" />
      </Layout>
    )
  }
}

export default securePage(Index)