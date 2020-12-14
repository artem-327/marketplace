import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { BidsReceived } from '~/modules/wanted-board/bids-received'
import { injectIntl } from 'react-intl'

class MyRequestedItemsPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoardBidsReceived', defaultMessage: 'My Requests' })}>
        <BidsReceived />
      </Layout>
    )
  }
}

export default securePage(injectIntl(MyRequestedItemsPage))
