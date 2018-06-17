import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Filter from './Filter';
import {fetchAll as fetchPackageTypes} from "../../modules/packageTypes";


function mapStateToProps(store) {
    return {
        isOpen: store.forms.filter.isOpen,
        packageTypes: store.packageTypes.data
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPackageTypes}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
