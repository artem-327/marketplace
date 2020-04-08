import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
// import ShoppingCart from '~/src/pages/cart/ShoppingCart'
import { injectIntl } from "react-intl"
import Cart from '~/modules/cart'

class CartPage extends Component {
  render() {
    const { intl: { formatMessage } } = this.props

    return (
      <Layout title={formatMessage({ id: 'cart.shoppingCart', defaultMessage: 'Shopping Cart' })}>
        <Cart />
      </Layout>
    )
  }
}

export default securePage(injectIntl(CartPage))
