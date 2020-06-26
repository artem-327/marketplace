import React, { Component } from 'react'
import { connect } from 'react-redux'
import securePage from '~/hocs/securePage'
import { injectIntl } from 'react-intl'

import Layout from 'components/Layout'
import Dashboard from '~/modules/dashboard'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout
        title={formatMessage({
          id: 'dashboard.title',
          defaultMessage: 'Analytics Dashboard'
        })}>
        <Dashboard />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
