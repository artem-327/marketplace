import React, {Component} from 'react'
import securePage from '~/hocs/securePage'
import OrdersModule from '~/src/pages/orders'
import Layout from 'components/Layout'

class OrderDetail extends Component {
  render() {
    return (
      <Layout>
        <OrdersModule />
      </Layout>  
    )
  }
}

export default securePage(OrderDetail)