import {connect} from 'react-redux';
import AddForm from './AddForm';
import {bindActionCreators} from 'redux'
import {saveWarehouse, updateWarehouse, fetchWarehouse, fetchLocations} from "../../../../../modules/location";
import {addProductOffer, saveIncrementalPricing} from '../../../../../modules/productOffers';
import {validatePackageType} from "../../../../../modules/packageTypes";
import {addMessage} from "../../../../../modules/errors";

function mapStateToProps(store) {
    return {
        warehouse: store.location.warehouse,
        locations: store.location.locations,
        location: store.location,
        form: store.forms.addProductOffer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveWarehouse,
        fetchLocations,
        validatePackageType,
        updateWarehouse,
        addProductOffer,
        fetchWarehouse,
        saveIncrementalPricing,
        addMessage,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
