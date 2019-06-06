import { connect } from 'react-redux'
import PurchaseOrder from './PurchaseOrder'
import * as Actions from '../actions'

function mapStateToProps(store) {
  return {
    ...store.cart,
    selectedAddressId: store.forms.cart.selectedAddressId,
    selectedCardId: store.forms.cart.selectedCardId,
    location: store.location
  }
}

export default connect(mapStateToProps, Actions)(PurchaseOrder)