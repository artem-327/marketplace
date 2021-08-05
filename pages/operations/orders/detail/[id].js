import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../../../modules/errors/actions'
import securePage from '~/hocs/securePage'
import OrdersModule from '~/modules/operations/detail'
import Layout from 'components/Layout'
import Router, { withRouter } from 'next/router'
import { getSafe } from '~/utils/functions'
import { injectIntl } from 'react-intl'

const OrderWithRouter = withRouter(OrdersModule)

class OrderDetail extends Component {
  componentDidMount() {
    if (!(
      this.props.auth?.identity?.isAdmin ||
      this.props.auth?.identity?.isOperator ||
      this.props.auth?.identity?.isOrderOperator
    )) this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.companies.orders', defaultMessage: 'Orders' })}>
        {!(auth?.identity?.isAdmin || auth?.identity?.isOperator || auth?.identity?.isOrderOperator)
          ? (null)
          : (<OrdersModule />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(OrderDetail)))
