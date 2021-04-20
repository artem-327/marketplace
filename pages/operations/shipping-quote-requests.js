import { Component } from 'react'
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
      <Layout
        title={
          formatMessage({ id: 'title.operations.shippingQuoteRequests', defaultMessage: 'Shipping Quote Requests' })
        }>
        <OperationsPage currentTab={'shipping-quote-requests'} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
