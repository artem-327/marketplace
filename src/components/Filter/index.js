import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Filter from './Filter';
import {fetchAll as fetchPackageTypes} from "../../modules/packageTypes";
import {toggleFilterGroup, addFilterTag, toggleFilter} from '../../modules/filter';
import {fetchProductAge} from '../../modules/products';
import {resetForm} from '../../utils/functions';


function mapStateToProps(store) {
    return {
        isOpen: store.filter.isOpen,
        packageTypes: store.packageTypes.data,
        filterGroupStatus: store.filter.filterGroup,
        filterData: store.forms.filter,
        productAge:store.products.productAge,
        productAgeModel: store.forms.filter.productAge,
        productAgeCustomModel: store.forms.filter.productAgeCustom,
        location:store.products.location,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPackageTypes, toggleFilterGroup, addFilterTag, toggleFilter, fetchProductAge, resetForm, dispatch}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
