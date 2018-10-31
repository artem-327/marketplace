import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShoppingCart from './ShoppingCart';
import {fetchCart, removeProductFromCart} from "../../../modules/cart";
import {addPopup, removePopup} from '../../../modules/popup';

function mapStateToProps(store) {
    return {
        cart: store.cart.cart,
        cartIsFetching: store.cart.cartIsFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCart, addPopup, removePopup, removeProductFromCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
