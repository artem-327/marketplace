import { connect } from 'react-redux'
// Constants
import Detail from './Detail'
// Actions
import * as Actions from '../../actions'
import { downloadAttachment } from '../../../inventory/actions'
import { downloadDisputeAttachment } from '../../../orders/actions'
// Services
import { actionRequired, prepareDetail } from './Detail.services'
// Selectors
import {
  makeGetEchoSupportPhone,
  makeGetIsPaymentCancellable,
  makeGetIsOpenPopup,
  makeGetLoading,
  makeGetOrderByIdLoading,
  makeGetDownloadPdfLoading
} from '../../selectors'

const makeMapStateToProps = () => {
  const getEchoSupportPhone = makeGetEchoSupportPhone()
  const getIsPaymentCancellable = makeGetIsPaymentCancellable()
  const getIsOpenPopup = makeGetIsOpenPopup()
  const getLoading = makeGetLoading()
  const getOrderByIdLoading = makeGetOrderByIdLoading()
  const getDownloadPdfLoading = makeGetDownloadPdfLoading()

  const mapStateToProps = (state, ownProps) => {
    const isCancelable =
      !!state?.operations?.orderDetailData &&
      [1,2,4].includes(state.operations.orderDetailData.orderStatus) && // Pending, Confirmed, Draft
      [0,1].includes(state.operations.orderDetailData.shippingStatus)   // Empty,Not shipped
    return {
      order: prepareDetail(state?.operations?.orderDetailData),
      echoSupportPhone: getEchoSupportPhone(state),
      isPaymentCancellable: getIsPaymentCancellable(state),
      action: actionRequired(state?.operations?.orderDetailData),
      isOpenPopup: getIsOpenPopup(state),
      loading: getLoading(state),
      orderByIdLoading: getOrderByIdLoading(state),
      downloadPdfLoading: getDownloadPdfLoading(state),
      isCancelable,
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, { ...Actions, downloadAttachment, downloadDisputeAttachment })(Detail)
