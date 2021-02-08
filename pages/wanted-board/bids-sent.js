import { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { BidsSent } from '~/modules/wanted-board/bids-sent'
import { injectIntl } from 'react-intl'

class MyOffersPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoardBidsSent', defaultMessage: 'Bids Sent' })}>
        <BidsSent />
      </Layout>
    )
  }
}

export default securePage(injectIntl(MyOffersPage))
