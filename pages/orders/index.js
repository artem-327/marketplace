import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import { OrdersModule } from '~/modules/orders'
import Layout from 'components/Layout'
import Router, { withRouter } from 'next/router'
import { getSafe } from '~/utils/functions'
import { injectIntl } from 'react-intl'

const OrdersWithRouter = withRouter(OrdersModule)

class Orders extends Component {
  render() {
    const { intl: { formatMessage } } = this.props

    return (
      <Layout title={
        getSafe(() => Router.router.query.type, 'sales') === 'sales'
          ? formatMessage({ id: 'global.salesOrders', defaultMessage: 'Sales Orders' })
          : formatMessage({ id: 'global.purchaseOrders', defaultMessage: 'Purchase Orders' })
      }>
        <OrdersWithRouter />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Orders))
