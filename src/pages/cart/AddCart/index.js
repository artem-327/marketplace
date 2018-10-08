import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCart from './AddCart';
import {getCurrentAdded} from "../../../modules/cart";
import {removePopup} from "../../../modules/popup";


function mapStateToProps(store) {
    return {
        cart: store.cart.data,
        isFetching: store.cart.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCurrentAdded, removePopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
