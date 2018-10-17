import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PurchaseOrder from './PurchaseOrder';
import {fetchCartItems, fetchDeliveryAddresses, removeProductFromCart, fetchPayments} from "../../../modules/cart";

function mapStateToProps(store) {
    return {
        cartItems: store.cart.cartItems,
        deliveryAddresses: store.cart.deliveryAddresses,
        isFetching: store.cart.isFetching,
        selectedAddressId: store.forms.cart.selectedAddressId,
        selectedCardId: store.forms.cart.selectedCardId,
        payments: store.cart.payments,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCartItems, fetchDeliveryAddresses, fetchPayments, removeProductFromCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
