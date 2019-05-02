import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ShoppingCart from './ShoppingCart'
import { getCart, deleteCart, sidebarChanged, getOrderDetail, getProductOffer } from '../../../modules/cart'
import { addPopup, removePopup } from '../../../modules/popup'
import { getPricing } from '../../../utils/functions'

function mapStateToProps(store) {
  let { cart } = store.cart
  if (cart.cartItems) {
    cart.cartItems.forEach(item => {
      item.pricing = getPricing(item.productOffer, item.quantity)
    })
  }

  return {
    cart,
    identity: store.auth.identity,
    sidebar: store.cart.sidebar,
    cartIsFetching: store.cart.cartIsFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCart, addPopup, removePopup, deleteCart, sidebarChanged, getOrderDetail, getProductOffer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
