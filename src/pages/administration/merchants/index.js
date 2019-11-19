import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getMerchants, getMerchant, approveMerchant, putMerchantEdit} from '../../../modules/merchants'
import MerchantsTable from './MerchantsTable'
import {addPopup} from '../../../modules/popup'

function mapStateToProps(store) {
  return {
    merchants: store.merchants,
    merchantDetail: store.merchants.merchantDetail,
    isFetching: store.merchants.isFetching,
    detailIsFetching: store.merchants.detailIsFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getMerchants, getMerchant, approveMerchant, putMerchantEdit, addPopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantsTable)
