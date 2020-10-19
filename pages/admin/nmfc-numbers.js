import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import AdminPage from '~/modules/admin'
import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout
        title={
          formatMessage({ id: 'title.admin.nmfc-numbers', defaultMessage: 'NMFC Numbers' })
        }
      >
        <AdminPage currentTab={'nmfc-numbers'} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))