import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import Companies from '~/modules/companies'
import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout title={formatMessage({ id: 'title.companies.users', defaultMessage: 'Users' })}>
        <Companies currentTab={'users'} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
