import { Component } from 'react'
import securePage from '~/hocs/securePage'
import { PurchaseOrder } from '~/modules/purchase-order'
import { injectIntl } from 'react-intl'

class CheckoutPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <PurchaseOrder />
    )
  }
}

export default securePage(injectIntl(CheckoutPage))
