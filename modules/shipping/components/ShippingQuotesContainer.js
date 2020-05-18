import { connect } from 'react-redux'
import ShippingQuotes from './ShippingQuotes'
import * as Actions from '../actions'
import { addCartItem, setPreFilledValues } from '~/modules/purchase-order/actions'

function mapStateToProps({ shiping, cart }) {
  return {
    ...shiping,
    isPurchasing: cart.isPurchasing
  }
}

const mapDispatchToProps = {
  ...Actions,
  addCartItem,
  setPreFilledValues
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingQuotes)
