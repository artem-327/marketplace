import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Merchants from './Merchants';
import {getData, acceptMerchant, rejectMerchant} from '../../modules/merchants';


function mapStateToProps(store) {
    return {
        data: store.merchants.data,
        isFetching: store.merchants.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getData, acceptMerchant, rejectMerchant}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
