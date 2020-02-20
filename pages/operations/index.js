import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import OperationsPage from '~/modules/operations'

class Index extends Component {
  render() {
    return (
      <Layout title='Shipping Quotes'>
        <OperationsPage />
      </Layout>
    )
  }
}

export default securePage(Index)
