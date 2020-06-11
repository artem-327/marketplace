import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
// import ShoppingCart from '~/src/pages/cart/ShoppingCart'
import { injectIntl } from 'react-intl'
import Errors from '~/modules/errors'

class CartPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return <Errors />
  }
}

export default securePage(injectIntl(CartPage))
