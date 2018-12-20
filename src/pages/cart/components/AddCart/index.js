import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCart from './AddCart';
import {getProductOffer, postNewOrder, editOrder, getOrderDetail} from "../../../../modules/cart";
import {removePopup} from "../../../../modules/popup";


function mapStateToProps(store) {
    return {
        offer: store.cart.offerDetail,
        order: store.cart.orderDetail,
        offerDetailIsFetching: store.cart.offerDetailIsFetching,
        orderDetailIsFetching: store.cart.orderDetailIsFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getProductOffer, getOrderDetail, editOrder, postNewOrder, removePopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
