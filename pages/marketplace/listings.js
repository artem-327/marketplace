import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import Listings from '~/modules/marketplace/listings'
import { injectIntl } from 'react-intl'

class ListingsPage extends Component {
  componentDidMount() {
    if (!(this.props.auth?.identity?.isCompanyAdmin || this.props.auth?.identity?.isMerchant))
      this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'global.marketplace', defaultMessage: 'Marketplace' })}>
        {!(auth?.identity?.isCompanyAdmin || auth?.identity?.isMerchant)
          ? (null)
          : (<Listings />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(ListingsPage)))
