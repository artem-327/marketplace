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
          formatMessage({ id: 'title.admin.packaging-types', defaultMessage: 'Packaging Types' })
        }
      >
        <AdminPage currentTab={'packaging-types'} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))