import { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { PurchaseOrder } from '~/modules/purchase-order'
import { injectIntl } from 'react-intl'

class CheckoutPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    // ! ! Layout
    // ! ! div
    return (
      <div title={formatMessage({ id: 'cart.checkout', defaultMessage: 'Checkout' })}>
        <PurchaseOrder />
      </div>
    )
  }
}

export default securePage(injectIntl(CheckoutPage))
