import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getMerchant, approveMerchant, putMerchantEdit, deleteMerchant} from '../../../../../modules/merchants'
import {removePopup} from '../../../../../modules/popup'
import MerchantDetail from './MerchantDetail'

function mapStateToProps(store) {
  return {
    merchantDetail: store.merchants.merchantDetail,
    isFetching: store.merchants.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getMerchant, approveMerchant, putMerchantEdit, removePopup, deleteMerchant}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantDetail)
