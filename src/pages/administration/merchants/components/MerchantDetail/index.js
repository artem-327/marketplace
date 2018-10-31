import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchMerchant, approveMerchant, editMerchant, removeMerchant} from '../../../../../modules/merchants';
import {removePopup} from "../../../../../modules/popup";
import MerchantDetail from './MerchantDetail';

function mapStateToProps(store) {
    return {
        merchantDetail: store.merchants.merchantDetail,
        isFetching: store.merchants.isFetching,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchMerchant, approveMerchant, editMerchant, removePopup, removeMerchant}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantDetail);
