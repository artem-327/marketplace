import {connect} from 'react-redux';
import AddInventory from './AddInventory';
import {bindActionCreators} from 'redux'
import {addLocation, addProductOffer, getProduct} from "../../modules/inventory";


function mapStateToProps(store) {
    return {
        inventory: {
            location: store.inventory.location,
            products: store.inventory.products,
            productDetail: store.inventory.productDetail
        }
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addLocation, addProductOffer, getProduct}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
