import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PurchaseOrder from './PurchaseOrder';
import {fetchCartItems, fetchDeliveryAddresses, removeProductFromCart} from "../../../modules/cart";
// import {saveWarehouse, updateWarehouse, fetchWarehouse, fetchLocations} from "../../../modules/location";
function mapStateToProps(store) {
    return {
        cartItems: store.cart.cartItems,
        deliveryAddresses: store.cart.deliveryAddresses,
        isFetching: store.cart.isFetching,
        selectedAddressId: store.forms.cart.selectedAddressId,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCartItems, fetchDeliveryAddresses, removeProductFromCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
