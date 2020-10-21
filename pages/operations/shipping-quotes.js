import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import OperationsPage from '~/modules/operations'
import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout title={formatMessage({ id: 'title.companies.shipping-quotes', defaultMessage: 'Shipping Quotes' })}>
        <OperationsPage currentTab={'shipping-quotes'} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
