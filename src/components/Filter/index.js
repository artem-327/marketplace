import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Filter from './Filter';
import {
    toggleFilterGroup,
    addFilterTag,
    toggleFilter,
    fetchSavedFilters,
    deleteSaveFilter,
    saveSaveFilter
} from '../../modules/filter';
import {fetchProductAge, fetchProductConditions, fetchProductForms, fetchPackagingTypes} from '../../modules/products';
import {fetchWarehouseDistances} from '../../modules/location';
import {resetForm} from '../../utils/functions';
import {actions} from "react-redux-form";


function mapStateToProps(store) {
    return {
        isOpen: store.filter.isOpen,
        packagingTypes: store.products.packagingTypes,
        warehouseDistances: store.location.warehouseDistances,
        filterGroupStatus: store.filter.filterGroup,
        filterData: store.forms.filter,
        productConditions: store.products.productConditions,
        productForms: store.products.productForms,
        productAge: store.products.productAge,
        productAgeModel: store.forms.filter.productAge,
        productAgeCustomModel: store.forms.filter.productAgeCustom,
        location: store.products.location,
        saveFilters: store.filter.saveFilters,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleFilterGroup,
        addFilterTag,
        toggleFilter,
        fetchProductAge,
        resetForm,
        fetchProductConditions,
        fetchProductForms,
        fetchPackagingTypes,
        fetchWarehouseDistances,
        fetchSavedFilters,
        fillFilter: (values) => actions.merge('forms.filter', values),
        deleteSaveFilter,
        saveSaveFilter,
        dispatch
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
