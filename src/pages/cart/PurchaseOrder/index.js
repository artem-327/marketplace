import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PurchaseOrder from './PurchaseOrder'
import {
  getDeliveryAddresses, getPayments,
  postNewDeliveryAddress, updateDeliveryAddress,
  getShippingQuotes, shippingQuoteSelected,
  getCartItem,
  shippingChanged
} from '../../../modules/cart'

import { addCartItem, updateCartItem, deleteCartItem, getCart, deleteCart } from '~/modules/purchase-order/actions'


import { getStates, getProvinces } from '../../../modules/location'

function mapStateToProps(store) {

  return {
    ...store.cart,
    selectedAddressId: store.forms.cart.selectedAddressId,
    selectedCardId: store.forms.cart.selectedCardId,
    location: store.location
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCart,
    getDeliveryAddresses, updateDeliveryAddress,
    getPayments, deleteCart,
    postNewDeliveryAddress, getShippingQuotes,
    shippingQuoteSelected, addCartItem,
    updateCartItem, deleteCartItem,
    getCartItem, getStates, getProvinces,
    shippingChanged,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder)