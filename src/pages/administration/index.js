import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {getData, approveMerchant} from '../../modules/merchants';
import Administration from './Administration';


function mapStateToProps(store) {
    return {
        merchants: store.forms.merchants,
        isFetching: store.forms.merchants.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getData, approveMerchant}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Administration);
