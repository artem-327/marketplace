import {connect} from 'react-redux';
import AddForm from './AddForm';
import {bindActionCreators} from 'redux'
import {addLocation} from "../../../../../modules/location";
import {addProductOffer} from '../../../../../modules/productOffers';
import {getPackageOptions, getManufacturer, getPricingUnits} from '../../../../../modules/addInventory';
import {fetchProductConditions, fetchProductForms, fetchProductGrade} from "../../../../../modules/products";


function mapStateToProps(store) {
    return {
        productForms: store.products.productForms,
        productConditions: store.products.productConditions,
        warehouse: store.addInventory.warehouse.options,
        state: store.addInventory.state.options,
        package: store.addInventory.package.options,
        pricingUnits: store.addInventory.pricingUnits.options,
        manufacturer: store.addInventory.manufacturer.options,
        origin: store.addInventory.origin.options,
        grade: store.products.productGrade,
        incrementalPricing: store.addInventory.incrementalPricing.options,
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
        fetchProductForms,
        fetchProductConditions,
        fetchProductGrade,
        getPackageOptions,
        getPricingUnits,
        getManufacturer,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
