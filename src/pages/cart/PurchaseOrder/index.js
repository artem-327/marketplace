import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PurchaseOrder from './PurchaseOrder';
import {getCart, fetchDeliveryAddresses, deleteCart, fetchPayments, createDeliveryAddress, editDeliveryAddress} from "../../../modules/cart";
import {fetchProvinces} from '../../../modules/location';

function mapStateToProps(store) {
    return {
        cart: store.cart.cart,
        deliveryAddresses: store.cart.deliveryAddresses,
        cartIsFetching: store.cart.cartIsFetching,
        selectedAddressId: store.forms.cart.selectedAddressId,
        selectedCardId: store.forms.cart.selectedCardId,
        payments: store.cart.payments,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCart, fetchProvinces, fetchDeliveryAddresses, editDeliveryAddress, fetchPayments, deleteCart, createDeliveryAddress}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
