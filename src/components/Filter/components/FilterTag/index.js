import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FilterTags from './FilterTags';
import {closeFilterTag} from '../../../../modules/filter';
import {resetForm} from "../../../../utils/functions";
import {fetchProductConditions, fetchProductForms} from "../../../../modules/products";

function mapStateToProps(store) {
    return {
        filterTags: store.filter.filterTags,
        productAge: store.forms.filter.productAge,
        productConditions: store.products.productConditions,
        productForms: store.products.productForms,
        packagingTypes: store.products.packagingTypes,
        zipCode: store.forms.filter.zipCode,
        warehouseDistances: store.location.warehouseDistances,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({closeFilterTag, resetForm, fetchProductConditions, fetchProductForms}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterTags);