import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PurchaseOrder from './PurchaseOrder';
import {getCart, getDeliveryAddresses, deleteCart, getPayments, postNewDeliveryAddress, putDeliveryAddressEdit, getShippingQuotes} from "../../../modules/cart";
import {fetchProvinces} from '../../../modules/location';

function mapStateToProps(store) {
    return {
        cart: store.cart.cart,
        deliveryAddresses: store.cart.deliveryAddresses,
        cartIsFetching: store.cart.cartIsFetching,
        selectedAddressId: store.forms.cart.selectedAddressId,
        selectedCardId: store.forms.cart.selectedCardId,
        payments: store.cart.payments,
        shippingQuotes: store.cart.shippingQuotes,
        shippingQuotesAreFetching: store.cart.shippingQuotesAreFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCart, fetchProvinces, getDeliveryAddresses, putDeliveryAddressEdit, getPayments, deleteCart, postNewDeliveryAddress, getShippingQuotes}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
