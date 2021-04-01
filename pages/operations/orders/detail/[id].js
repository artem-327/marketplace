import { Component } from 'react'
import securePage from '~/hocs/securePage'
import OrdersModule from '~/modules/operations/detail'
import Layout from 'components/Layout'
import Router, { withRouter } from 'next/router'
import { getSafe } from '~/utils/functions'
import { injectIntl } from 'react-intl'

const OrderWithRouter = withRouter(OrdersModule)

class OrderDetail extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.companies.orders', defaultMessage: 'Orders' })}>
        <OrdersModule />
      </Layout>
    )
  }
}

export default securePage(injectIntl(OrderDetail))
