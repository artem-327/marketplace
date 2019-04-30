import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ShoppingCart from './ShoppingCart'
import { getCart, deleteCart, sidebarChanged, getOrderDetail, getProductOffer } from '../../../modules/cart'
import { addPopup, removePopup } from '../../../modules/popup'

function mapStateToProps(store) {
  return {
    cart: store.cart.cart,
    identity: store.auth.identity,
    sidebar: store.cart.sidebar,
    cartIsFetching: store.cart.cartIsFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCart, addPopup, removePopup, deleteCart, sidebarChanged, getOrderDetail, getProductOffer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
