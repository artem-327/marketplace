import {connect} from 'react-redux';
import AddInventory from './AddInventory';
import {resetForm} from "../../../modules/productOffers";
import {loadProductMapping} from "../../../modules/products";
import {bindActionCreators} from 'redux'

function mapStateToProps() {
    return {}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetForm,
        loadProductMapping
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
