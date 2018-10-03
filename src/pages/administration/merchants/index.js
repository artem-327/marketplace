import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {getData, approveMerchant} from '../../../modules/merchants';
import MerchantsTable from './MerchantsTable';


function mapStateToProps(store) {
    return {
        merchants: store.merchants,
        isFetching: store.merchants.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getData, approveMerchant}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantsTable);
