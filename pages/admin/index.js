import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import AdminPage from '~/modules/admin'

class Index extends Component {
  render() {
    return (
      <Layout title='Admin'>
        <AdminPage />
      </Layout>
    )
  }
}

export default securePage(Index)
