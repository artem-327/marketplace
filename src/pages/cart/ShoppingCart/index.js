import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShoppingCart from './ShoppingCart';
import {fetchCartItems, removeProductFromCart} from "../../../modules/cart";
import {addPopup, removePopup} from '../../../modules/popup';

function mapStateToProps(store) {
    return {
        cartItems: store.cart.cartItems,
        isFetching: store.cart.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCartItems, addPopup, removePopup, removeProductFromCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
