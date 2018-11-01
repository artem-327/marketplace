import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCart from './AddCart';
import {getProductOffer, createNewOrder} from "../../../../modules/cart";
import {removePopup} from "../../../../modules/popup";


function mapStateToProps(store) {
    return {
        offer: store.cart.offers,
        isFetching: store.cart.offersAreFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getProductOffer, createNewOrder, removePopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
