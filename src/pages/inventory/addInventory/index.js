import {connect} from 'react-redux';
import AddInventory from './AddInventory';
import {bindActionCreators} from 'redux'
import {resetForm} from "../../../utils/functions";

function mapStateToProps(store) {
    return {
        mappingForm: {
            ...store.forms.productMapping,
            packaging: {
                ...store.forms.productMapping.packaging,
                packagingType: store.productOffers.productOffer.packaging && store.productOffers.productOffer.packaging.packagingType.measureType === store.productOffers.productOffer.packaging.unit.measureType ? store.forms.productMapping.packaging.packagingType : ""
            }
        },
        productOfferingForm: store.forms.productOffering,
        addProductOfferForm: store.forms.addProductOffer,
        unitOfMeasurement: store.productOffers.unitOfMeasurement
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetForm
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
