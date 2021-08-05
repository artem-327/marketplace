import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import OperationsPage from '~/modules/operations'
import { injectIntl } from 'react-intl'

class Index extends Component {
  componentDidMount() {
    if (!(this.props.auth?.identity?.isAdmin || this.props.auth?.identity?.isOperator)) this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props
    return (
      <Layout
        title={
          formatMessage({ id: 'title.operations.shippingQuoteRequests', defaultMessage: 'Shipping Quote Requests' })
        }>
        {!(auth?.identity?.isAdmin || auth?.identity?.isOperator)
          ? (null)
          : (<OperationsPage currentTab={'shipping-quote-requests'} />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(Index)))
