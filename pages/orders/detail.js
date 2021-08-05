import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import securePage from '~/hocs/securePage'
import OrdersModule from '~/modules/orders/detail'
import Layout from 'components/Layout'
import Router, { withRouter } from 'next/router'
import { getSafe } from '~/utils/functions'
import { injectIntl } from 'react-intl'

const OrderWithRouter = withRouter(OrdersModule)

class OrderDetail extends Component {
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
      <Layout
        title={
          getSafe(() => Router.router.query.type, 'sales') === 'sales'
            ? formatMessage({ id: 'global.salesOrdersDetail', defaultMessage: 'Sales Order Detail' })
            : formatMessage({ id: 'global.purchaseOrdersDetail', defaultMessage: 'Purchase Order Detail' })
        }>
        {!(
          auth?.identity?.isCompanyAdmin || auth?.identity?.isMerchant ||
          auth?.identity?.isOrderProcessing || auth?.identity?.isOrderView
        )
          ? (null)
          : (<OrderWithRouter/>)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(OrderDetail)))
