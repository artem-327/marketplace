import React, {Component} from 'react'
import securePage from '~/hocs/securePage'
import {OrdersModule} from '~/modules/orders'
import Layout from 'components/Layout'
import {withRouter} from 'next/router'

const OrdersWithRouter = withRouter(OrdersModule)

class Orders extends Component {
  render() {
    return (
      <Layout>
        <OrdersWithRouter />
      </Layout>
    )
  }
}

export default securePage(Orders)
