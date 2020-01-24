import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import ShoppingCart from '~/src/pages/cart/ShoppingCart'
import { injectIntl } from "react-intl"

class CartPage extends Component {
  render() {
    const { intl: { formatMessage } } = this.props

    return (
      <Layout title={formatMessage({ id: 'cart.shoppingCart', defaultMessage: 'Shopping Cart' })}>
        <ShoppingCart />
      </Layout>
    )
  }
}

export default securePage(injectIntl(CartPage))
