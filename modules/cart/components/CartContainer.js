import { connect } from 'react-redux'
import Cart from './Cart'
import { injectIntl } from 'react-intl'

import { getCart } from '~/modules/purchase-order/actions'

const mapStateToProps = store => {
  return {
    cart: store.cart.cart,
    identity: store.auth.identity,
    sidebar: store.cart.sidebar,
    cartIsFetching: store.cart.cartIsFetching
  }
}

const mapDispatchToProps = { getCart }

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Cart))
