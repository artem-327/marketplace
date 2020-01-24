import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import OrdersModule from '~/modules/orders/detail'
import Layout from 'components/Layout'
import Router, { withRouter } from 'next/router'
import { getSafe } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'

const OrderWithRouter = withRouter(OrdersModule)

class OrderDetail extends Component {
  render() {
    return (
      <Layout title={
        getSafe(() => Router.router.query.type, 'sales') === 'sales'
          ? (<FormattedMessage id='global.salesOrdersDetail' defaultMessage='Sales Order Detail' />)
          : (<FormattedMessage id='global.purchaseOrdersDetail' defaultMessage='Purchase Order Detail' />)
      }>
        <OrderWithRouter />
      </Layout>
    )
  }
}

export default securePage(OrderDetail)
