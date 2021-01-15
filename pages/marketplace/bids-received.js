import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { BidsReceived } from '~/modules/marketplace/bids-received'
import { injectIntl } from 'react-intl'

class BidsReceivedPage extends Component {
  render() {
    const { intl: { formatMessage } } = this.props

    return (
      <Layout title={formatMessage({ id: 'navigation.marketplaceBidsReceived', defaultMessage: 'Bids Received' })}>
        <BidsReceived />
      </Layout>
    )
  }
}

export default securePage(injectIntl(BidsReceivedPage))