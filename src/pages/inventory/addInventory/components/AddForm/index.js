import {connect} from 'react-redux';
import AddForm from './AddForm';
import {bindActionCreators} from 'redux'
import {saveWarehouse, updateWarehouse, fetchWarehouses, fetchLocations} from "../../../../../modules/location";
import {addProductOffer, editProductOffer} from '../../../../../modules/productOffers';
import {validatePackageType} from "../../../../../modules/packageTypes";
import {addMessage} from "../../../../../modules/errors";
import {getMerchant} from "../../../../../modules/merchants";

function mapStateToProps(store) {
    return {
        warehouse: store.location.warehouse,
        locations: store.location.locations,
        location: store.location,
        form: store.forms.addProductOffer,
        productOfferingForm: store.forms.productOffering,
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
        getMerchant
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
