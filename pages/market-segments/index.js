import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import MarketSegment from '~/modules/market-segments'

import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout
        title={formatMessage({
          id: 'marketSegments.title',
          defaultMessage: 'Market Segments'
        })}>
        <MarketSegment />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
