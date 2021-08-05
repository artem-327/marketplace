import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import Holds from '~/modules/marketplace/holds'
import { injectIntl } from 'react-intl'

class HoldsPage extends Component {
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
      <Layout title={formatMessage({ id: 'hold.holds', defaultMessage: 'Holds' })}>
        {!(auth?.identity?.isCompanyAdmin || auth?.identity?.isMerchant)
          ? (null)
          : (<Holds />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(HoldsPage)))
