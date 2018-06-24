import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCart from './AddCart';
import {getCurrentAdded} from "../../../modules/cart";


function mapStateToProps(store) {
    return {
        name: store.cart.addCart.name,
        merchant: store.cart.addCart.merchant,
        availableProducts: store.cart.addCart.availableProducts,
        packageSize: store.cart.addCart.packageSize,
        quantity: store.cart.addCart.quantity
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCurrentAdded}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
