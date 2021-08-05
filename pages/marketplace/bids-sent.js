import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { BidsSent } from '~/modules/marketplace/bids-sent'
import { injectIntl } from 'react-intl'

class BidsSentPage extends Component {
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
      <Layout title={formatMessage({ id: 'navigation.marketplaceBidsSent', defaultMessage: 'Bids Sent' })}>
        {!(auth?.identity?.isCompanyAdmin || auth?.identity?.isMerchant)
          ? (null)
          : (<BidsSent />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(BidsSentPage)))
