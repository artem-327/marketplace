import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchMerchants, approveMerchant, editMerchant} from '../../../modules/merchants';
import MerchantsTable from './MerchantsTable';


function mapStateToProps(store) {
    return {
        merchants: store.merchants,
        isFetching: store.merchants.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchMerchants, approveMerchant, editMerchant}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantsTable);
