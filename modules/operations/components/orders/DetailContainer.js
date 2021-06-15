import { connect } from 'react-redux'
import Detail from './Detail'
import * as Actions from '../../actions'
import { downloadAttachment } from '../../../inventory/actions'
import { downloadPdf, downloadDisputeAttachment } from '../../../orders/actions'
import { actionRequired, prepareDetail } from './Detail.services'
import { makeGetEchoSupportPhone, makeGetIsPaymentCancellable, makeGetIsOpenPopup, makeGetLoading } from '../../selectors'

const makeMapStateToProps = () => {
  const getEchoSupportPhone = makeGetEchoSupportPhone()
  const getIsPaymentCancellable = makeGetIsPaymentCancellable()
  const getIsOpenPopup = makeGetIsOpenPopup()
  const getLoading = makeGetLoading()

  const mapStateToProps = (state, ownProps) => {
    return {
      order: prepareDetail(state?.operations?.orderDetailData),
      echoSupportPhone: getEchoSupportPhone(state),
      isPaymentCancellable: getIsPaymentCancellable(state),
      action: actionRequired(state?.operations?.orderDetailData),
      isOpenPopup: getIsOpenPopup(state),
      loading: getLoading(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, { ...Actions, downloadAttachment, downloadPdf, downloadDisputeAttachment })(Detail)
