import {connect} from 'react-redux';
import AddForm from './AddForm';
import {bindActionCreators} from 'redux'
import {saveWarehouse, updateWarehouse, fetchWarehouses, fetchLocations} from "../../../../../modules/location";
import {addProductOffer, editProductOffer} from '../../../../../modules/productOffers';
import {validatePackageType} from "../../../../../modules/packageTypes";
import {addMessage} from "../../../../../modules/errors";
import {fetchMerchant} from "../../../../../modules/merchants";

function mapStateToProps(store) {
    return {
        warehouse: store.location.warehouse,
        locations: store.location.locations,
        location: store.location,
        form: store.forms.addProductOffer,
        merchantDetail: store.merchants.merchantDetail
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveWarehouse,
        fetchLocations,
        validatePackageType,
        updateWarehouse,
        addProductOffer,
        fetchWarehouses,
        addMessage,
        editProductOffer,
        fetchMerchant
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
