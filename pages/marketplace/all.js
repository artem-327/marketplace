import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { Marketplace } from '~/modules/marketplace'
import { injectIntl } from 'react-intl'

class MarketplacePage extends Component {
  render() {
    const { intl: { formatMessage } } = this.props

    return (
      <Layout title={formatMessage({ id: 'global.marketplace', defaultMessage: 'Marketplace' })}>
        <Marketplace activeIndex={0} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(MarketplacePage))
