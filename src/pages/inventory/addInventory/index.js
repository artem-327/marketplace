import {connect} from 'react-redux';
import AddInventory from './AddInventory';
import {resetForm} from "../../../modules/productOffers";
import {bindActionCreators} from 'redux'

function mapStateToProps() {
    return {}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetForm,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
