import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchMerchants, fetchMerchant, approveMerchant, editMerchant} from '../../../modules/merchants';
import MerchantsTable from './MerchantsTable';
import {addPopup} from '../../../modules/popup';

function mapStateToProps(store) {
    return {
        merchants: store.merchants,
        merchantDetail: store.merchants.merchantDetail,
        isFetching: store.merchants.isFetching,
        detailIsFetching: store.merchants.detailIsFetching,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchMerchants, fetchMerchant, approveMerchant, editMerchant, addPopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantsTable);
