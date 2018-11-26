import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShoppingCart from './ShoppingCart';
import {getCart, deleteCart} from "../../../modules/cart";
import {addPopup, removePopup} from '../../../modules/popup';

function mapStateToProps(store) {
    return {
        cart: store.cart.cart,
        cartIsFetching: store.cart.cartIsFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCart, addPopup, removePopup, deleteCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
