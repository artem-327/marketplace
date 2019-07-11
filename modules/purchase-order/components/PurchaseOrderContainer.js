import { connect } from 'react-redux'
import PurchaseOrder from './PurchaseOrder'
import * as Actions from '../actions'

function mapStateToProps(store) {
  try {
    var preferredBankAccountId = store.auth.identity.company.preferredBankAccountId
  } catch {
    var preferredBankAccountId = null
  }
  return {
    ...store.cart,
    selectedAddressId: store.forms.cart.selectedAddressId,
    selectedCardId: store.forms.cart.selectedCardId,
    location: store.location,
    preferredBankAccountId
  }
}

export default connect(mapStateToProps, Actions)(PurchaseOrder)