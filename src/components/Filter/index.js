import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Filter from './Filter';
import {fetchAll as fetchPackageTypes} from "../../modules/packageTypes";
import {toggleFilterGroup, resetForm, addFilterTag, toggleFilter} from '../../modules/filter';
import {fetchProductAge, fetchLocation} from '../../modules/products';


function mapStateToProps(store) {
    return {
        isOpen: store.forms.filter.isOpen,
        packageTypes: store.packageTypes.data,
        filterGroupStatus: store.forms.filter.filterGroup,
        filterData: store.forms.filter.data,
        productAge:store.products.productAge,
        location:store.products.location,

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPackageTypes, toggleFilterGroup, resetForm, addFilterTag, toggleFilter, fetchProductAge, fetchLocation}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
