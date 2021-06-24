import { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import Listings from '~/modules/marketplace/listings'
import { injectIntl } from 'react-intl'

class ListingsPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'global.marketplace', defaultMessage: 'Marketplace' })}>
        <Listings />
      </Layout>
    )
  }
}

export default securePage(injectIntl(ListingsPage))
