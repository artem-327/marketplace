import React, {Component} from 'react'
import securePage from '~/hocs/securePage'
import OrdersModule from '~/modules/orders/detail'
import Layout from 'components/Layout'
import {withRouter} from 'next/router'

const OrderWithRouter = withRouter(OrdersModule)

class OrderDetail extends Component {
  render() {
    return (
      <Layout>
        <OrderWithRouter />
      </Layout>
    )
  }
}

export default securePage(OrderDetail)
