import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { SharedListings } from '~/modules/inventory/shared-listings'
import { injectIntl } from 'react-intl'

class SharedListingsPage extends Component {
  componentDidMount() {
    if (!(
      this.props.auth?.identity?.isCompanyAdmin || this.props.auth?.identity?.isMerchant ||
      this.props.auth?.identity?.isProductCatalogAdmin || this.props.auth?.identity?.isProductOfferManager
    ))
      this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.inventory.sharedListings', defaultMessage: 'Shared Listings' })}>
        {!(
          auth?.identity?.isCompanyAdmin || auth?.identity?.isMerchant ||
          auth?.identity?.isProductCatalogAdmin || auth?.identity?.isProductOfferManager
        )
          ? (null)
          : (<SharedListings />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(SharedListingsPage)))