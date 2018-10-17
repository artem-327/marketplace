import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCart from './AddCart';
import {getProductOffer, createCartItem} from "../../../../modules/cart";
import {removePopup} from "../../../../modules/popup";


function mapStateToProps(store) {
    return {
        offer: store.cart.offers,
        isFetching: store.cart.offersAreFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getProductOffer, createCartItem, removePopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
