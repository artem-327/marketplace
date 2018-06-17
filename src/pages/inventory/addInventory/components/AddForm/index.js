import {connect} from 'react-redux';
import AddForm from './AddForm';
import {bindActionCreators} from 'redux'
import {addLocation} from "../../../../../modules/location";
import {addProductOffer} from '../../../../../modules/productOffers';
import {getFormOptions, getConditionOptions, getPackageOptions, getManufacturer, getPricingUnits} from '../../../../../modules/dropdown';


function mapStateToProps(store) {
    return {
        productType: store.productOffers.productType,
        dropdowns: {
            warehouse: store.dropdown.warehouse.options,
            state: store.dropdown.state.options,
            package: store.dropdown.package.options,
            pricingUnits: store.dropdown.pricingUnits.options,
            manufacturer: store.dropdown.manufacturer.options,
            origin: store.dropdown.origin.options,
            form: store.dropdown.form.options,
            grade: store.dropdown.grade.options,
            condition: store.dropdown.condition.options,
            incrementalPricing: store.dropdown.incrementalPricing.options
        },
        inventory: {
            location: store.location.location,
            products: store.productOffers.products,
        },
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addLocation,
        addProductOffer,
        getFormOptions,
        getConditionOptions,
        getPackageOptions,
        getPricingUnits,
        getManufacturer
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
