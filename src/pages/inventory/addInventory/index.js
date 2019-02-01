import {connect} from 'react-redux';
import AddInventory from './AddInventory';
import {bindActionCreators} from 'redux'
import {resetForm} from "../../../utils/functions";

function mapStateToProps(store) {
    console.log(store);
    return {
        mappingForm: store.forms.productMapping,
        productOfferingForm: store.forms.productOffering,
        addProductOfferForm: store.forms.addProductOffer
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetForm
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
