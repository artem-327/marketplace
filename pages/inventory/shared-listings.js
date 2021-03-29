import { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { SharedListings } from '~/modules/inventory/shared-listings'
import { injectIntl } from 'react-intl'

class SharedListingsPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.inventory.sharedListings', defaultMessage: 'Shared Listings' })}>
        <SharedListings />
      </Layout>
    )
  }
}

export default securePage(injectIntl(SharedListingsPage))