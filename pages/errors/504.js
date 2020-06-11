import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
// import ShoppingCart from '~/src/pages/cart/ShoppingCart'
import { injectIntl } from 'react-intl'
import { GatewayTimeout } from '~/modules/errors'

class CartPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'error.gatewayTimeout', defaultMessage: 'GATEWAY TIMEOUT' })}>
        <GatewayTimeout />
      </Layout>
    )
  }
}

export default securePage(injectIntl(CartPage))
