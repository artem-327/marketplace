import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCart from './AddCart';
import {getCurrentAdded} from "../../../modules/cart";
import {removePopup} from "../../../modules/popup";


function mapStateToProps(store) {
    return {
        info: store.cart.addCart,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCurrentAdded, removePopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
