import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import OperationsPage from '~/modules/operations'

class Index extends Component {
  render() {
    return (
      <Layout title='Operations'>
        <OperationsPage />
      </Layout>
    )
  }
}

export default securePage(Index)