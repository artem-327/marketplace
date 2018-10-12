import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShoppingCart from './ShoppingCart';
import {fetchCartItems} from "../../../modules/cart";

function mapStateToProps(store) {
    return {
        cartItems: store.cart.cartItems,
        isFetching: store.cart.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCartItems}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
