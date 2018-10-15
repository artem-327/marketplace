import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCart from './AddCart';
import {getCurrentAdded} from "../../../modules/cart";
import {removePopup} from "../../../modules/popup";


function mapStateToProps(store) {
    return {
        cart: store.cart.offers,
        isFetching: store.cart.offersAreFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCurrentAdded, removePopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
