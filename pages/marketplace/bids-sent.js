import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { BidsSent } from '~/modules/marketplace/bids-sent'
import { injectIntl } from 'react-intl'

class BidsSentPage extends Component {
  render() {
    const { intl: { formatMessage } } = this.props

    return (
      <Layout title={formatMessage({ id: 'navigation.marketplaceBidsSent', defaultMessage: 'Bids Sent' })}>
        <BidsSent />
      </Layout>
    )
  }
}

export default securePage(injectIntl(BidsSentPage))