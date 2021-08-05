import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { BidsReceived } from '~/modules/marketplace/bids-received'
import { injectIntl } from 'react-intl'

class BidsReceivedPage extends Component {
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
      <Layout title={formatMessage({ id: 'navigation.marketplaceBidsReceived', defaultMessage: 'Bids Received' })}>
        {!(auth?.identity?.isCompanyAdmin || auth?.identity?.isMerchant)
          ? (null)
          : (<BidsReceived />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(BidsReceivedPage)))
