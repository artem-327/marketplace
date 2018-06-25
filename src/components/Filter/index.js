import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Filter from './Filter';
import {fetchAll as fetchPackageTypes} from "../../modules/packageTypes";
import {toggleFilterGroup} from '../../modules/filter';


function mapStateToProps(store) {
    return {
        isOpen: store.forms.filter.isOpen,
        packageTypes: store.packageTypes.data,
        filterGroupStatus: store.forms.filter.filterGroup
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPackageTypes, toggleFilterGroup}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
