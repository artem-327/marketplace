import { connect } from 'react-redux'
import ShippingQuotes from './ShippingQuotes'
import * as Actions from '../actions'

import { addCartItem } from '~/modules/purchase-order/actions'

function mapStateToProps({ shiping, cart }) {
  return {
    ...shiping,
    isPurchasing: cart.isPurchasing
  }
}

const mapDispatchToProps = {
  ...Actions,
  addCartItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingQuotes)
