import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ShoppingCart from './ShoppingCart'
import { getCart, deleteCart, sidebarChanged, getProductOffer } from '../../../modules/cart'
import { addPopup, removePopup } from '../../../modules/popup'
import { getPricing, getLocationString } from '../../../utils/functions'

function mapStateToProps(store) {
  let { cart } = store.cart
  if (cart.cartItems) {
    cart.cartItems.forEach(item => {
      item.pricing = getPricing(item.productOffer, item.quantity)
      item.locationStr = getLocationString(item.productOffer)
    })
  }

  return {
    cart: store.cart.cart,
    identity: store.auth.identity,
    sidebar: store.cart.sidebar,
    cartIsFetching: store.cart.cartIsFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCart, addPopup, removePopup, deleteCart, sidebarChanged, getProductOffer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
