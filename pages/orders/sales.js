import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import securePage from '~/hocs/securePage'
import { OrdersModule } from '~/modules/orders'
import Layout from 'components/Layout'
import Router, { withRouter } from 'next/router'
import { getSafe } from '~/utils/functions'
import { injectIntl } from 'react-intl'

const OrdersWithRouter = withRouter(OrdersModule)

class Orders extends Component {
  componentDidMount() {
    if (!(
      this.props.auth?.identity?.isCompanyAdmin || this.props.auth?.identity?.isMerchant ||
      this.props.auth?.identity?.isOrderProcessing || this.props.auth?.identity?.isOrderView
    ))
      this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'global.salesOrders', defaultMessage: 'Sales Orders' })}>
        {!(
          auth?.identity?.isCompanyAdmin || auth?.identity?.isMerchant ||
          auth?.identity?.isOrderProcessing || auth?.identity?.isOrderView
        )
          ? (null)
          : (<OrdersWithRouter currentTab={'sales'} />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(Orders)))
