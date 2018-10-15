import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PurchaseOrder from './PurchaseOrder';
import {fetchCartItems, fetchDeliveryAddresses} from "../../../modules/cart";
// import {saveWarehouse, updateWarehouse, fetchWarehouse, fetchLocations} from "../../../modules/location";
function mapStateToProps(store) {
    return {
        cartItems: store.cart.cartItems,
        deliveryAddresses: store.cart.deliveryAddresses,
        isFetching: store.cart.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCartItems, fetchDeliveryAddresses}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
