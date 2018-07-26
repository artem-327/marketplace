import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCart from './AddCart';
import {getCurrentAdded} from "../../../modules/cart";
import {removePopup} from "../../../modules/popup";


function mapStateToProps(store) {
    return {
        name: store.cart.addCart.data.productOffer.product.primaryName,
        merchant: store.cart.addCart.data.productOffer.manufacturer.name,
        packageSize: store.cart.addCart.data.productOffer.packageAmount,
        location: store.cart.addCart.data.productOffer.location.state,
        //availableProducs:,
        //quantity:
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCurrentAdded, removePopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
