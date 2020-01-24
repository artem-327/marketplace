import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import { OrdersModule } from '~/modules/orders'
import Layout from 'components/Layout'
import Router, { withRouter } from 'next/router'
import { getSafe } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'

const OrdersWithRouter = withRouter(OrdersModule)

class Orders extends Component {
  render() {
    return (
      <Layout title={
        getSafe(() => Router.router.query.type, 'sales') === 'sales'
          ? (<FormattedMessage id='global.salesOrders' defaultMessage='Sales Orders' />)
          : (<FormattedMessage id='global.purchaseOrders' defaultMessage='Purchase Orders' />)
      }>
        <OrdersWithRouter />
      </Layout>
    )
  }
}

export default securePage(Orders)
