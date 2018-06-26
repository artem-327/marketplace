import {connect} from 'react-redux';
import AddForm from './AddForm';
import {bindActionCreators} from 'redux'
import {saveWarehouse, updateWarehouse, fetchWarehouse} from "../../../../../modules/location";
import {addProductOffer} from '../../../../../modules/productOffers';
import {getPackageOptions, getManufacturer, getPricingUnits} from '../../../../../modules/addInventory';
import {fetchProductConditions, fetchProductForms, fetchProductGrade} from "../../../../../modules/products";
import {validatePackageType} from "../../../../../modules/packageTypes";


function mapStateToProps(store) {
    return {
        productForms: store.products.productForms,
        productConditions: store.products.productConditions,
        state: store.addInventory.state.options,
        package: store.addInventory.package.options,
        units: store.addInventory.units.options,
        pricingUnits: store.addInventory.pricingUnits.options,
        manufacturer: store.addInventory.manufacturer.options,
        origin: store.addInventory.origin.options,
        grade: store.products.productGrade,
        incrementalPricing: store.addInventory.incrementalPricing.options,
        warehouse: store.location.warehouse,
        location: store.location,
        form: store.forms.addProductOffer,
        packageTypeId: store.packageTypes.packageTypeId
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveWarehouse,
        validatePackageType,
        updateWarehouse,
        addProductOffer,
        fetchWarehouse,
        fetchProductForms,
        fetchProductConditions,
        fetchProductGrade,
        getPackageOptions,
        getPricingUnits,
        getManufacturer,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
