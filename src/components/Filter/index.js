import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Filter from './Filter';
import {toggleFilterGroup, addFilterTag, toggleFilter} from '../../modules/filter';
import {fetchProductAge, fetchProductConditions, fetchProductForms, fetchPackagingTypes, fetchWarehouseDistances} from '../../modules/products';
import {resetForm} from '../../utils/functions';


function mapStateToProps(store) {
    return {
        isOpen: store.filter.isOpen,
        packagingTypes: store.products.packagingTypes,
        warehouseDistances: store.products.location,
        filterGroupStatus: store.filter.filterGroup,
        filterData: store.forms.filter,
        productConditions: store.products.productConditions,
        productForms: store.products.productForms,
        productAge:store.products.productAge,
        productAgeModel: store.forms.filter.productAge,
        productAgeCustomModel: store.forms.filter.productAgeCustom,
        location:store.products.location,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({toggleFilterGroup, addFilterTag, toggleFilter, fetchProductAge, resetForm, fetchProductConditions, fetchProductForms, fetchPackagingTypes, fetchWarehouseDistances, dispatch}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
