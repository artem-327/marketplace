import { connect } from 'react-redux'
import Detail from './Detail'
import * as Actions from '../actions'
import { downloadAttachment, addAttachment } from '../../inventory/actions'
import { getOrder } from '../services'

import {
  makeGetEchoSupportPhone,
  makeGetIsPaymentCancellable,
  makeGetOpenedAssignLots,
  makeGetOpenedReinitiateTransfer,
  makeGetOpenedEnterTrackingIdShip,
  makeGetOpenedEnterTrackingIdReturnShip,
  makeGetOpenedPurchaseRejectDelivery,
  makeGetOpenedPurchaseRequestCreditDelivery,
  makeGetOpenedPurchaseReviewCreditRequest,
  makeGetOpenedSaleReturnShipping,
  makeGetOpenedSaleReviewCreditRequest,
  makeGetOpenedPurchaseOrderShipping,
  makeGetAction,
  makeGetopendSaleAttachingProductOffer,
  makeGetListDocumentTypes,
  makeGetLoadingRelatedDocuments,
  makeGetIsAdmin,
  makeGetIsCompanyAdmin,
  makeGetIsOrderProcessing,
  makeGetIsThirdPartyConnectionException,
  makeGetIsSending,
  makeGetopenedDisputedRequest,
  makeGetAppInfo
} from '../selectors'

const makeMapStateToProps = () => {
  const getEchoSupportPhone = makeGetEchoSupportPhone()
  const getIsPaymentCancellable = makeGetIsPaymentCancellable()
  const getOpenedAssignLots = makeGetOpenedAssignLots()
  const getOpenedReinitiateTransfer = makeGetOpenedReinitiateTransfer()
  const getOpenedEnterTrackingIdShip = makeGetOpenedEnterTrackingIdShip()
  const getOpenedEnterTrackingIdReturnShip = makeGetOpenedEnterTrackingIdReturnShip()
  const getOpenedPurchaseRejectDelivery = makeGetOpenedPurchaseRejectDelivery()
  const getOpenedPurchaseRequestCreditDelivery = makeGetOpenedPurchaseRequestCreditDelivery()
  const getOpenedPurchaseReviewCreditRequest = makeGetOpenedPurchaseReviewCreditRequest()
  const getOpenedSaleReturnShipping = makeGetOpenedSaleReturnShipping()
  const getOpenedSaleReviewCreditRequest = makeGetOpenedSaleReviewCreditRequest()
  const getOpenedPurchaseOrderShipping = makeGetOpenedPurchaseOrderShipping()
  const getAction = makeGetAction()
  const getopendSaleAttachingProductOffer = makeGetopendSaleAttachingProductOffer()
  const getListDocumentTypes = makeGetListDocumentTypes()
  const getLoadingRelatedDocuments = makeGetLoadingRelatedDocuments()
  const getIsAdmin = makeGetIsAdmin()
  const getIsCompanyAdmin = makeGetIsCompanyAdmin()
  const getIsOrderProcessing = makeGetIsOrderProcessing()
  const getIsThirdPartyConnectionException = makeGetIsThirdPartyConnectionException()
  const getIsSending = makeGetIsSending()
  const getopenedDisputedRequest = makeGetopenedDisputedRequest()
  const getAppInfo = makeGetAppInfo()

  const mapStateToProps = (state, ownProps) => {
    return {
      order: getOrder(state, ownProps),
      echoSupportPhone: getEchoSupportPhone(state),
      isPaymentCancellable: getIsPaymentCancellable(state),
      openedAssignLots: getOpenedAssignLots(state),
      openedReinitiateTransfer: getOpenedReinitiateTransfer(state),
      openedEnterTrackingIdShip: getOpenedEnterTrackingIdShip(state),
      openedEnterTrackingIdReturnShip: getOpenedEnterTrackingIdReturnShip(state),
      openedPurchaseRejectDelivery: getOpenedPurchaseRejectDelivery(state),
      openedPurchaseRequestCreditDelivery: getOpenedPurchaseRequestCreditDelivery(state),
      openedPurchaseReviewCreditRequest: getOpenedPurchaseReviewCreditRequest(state),
      openedSaleReturnShipping: getOpenedSaleReturnShipping(state),
      openedSaleReviewCreditRequest: getOpenedSaleReviewCreditRequest(state),
      openedPurchaseOrderShipping: getOpenedPurchaseOrderShipping(state),
      action: getAction(state),
      opendSaleAttachingProductOffer: getopendSaleAttachingProductOffer(state),
      listDocumentTypes: getListDocumentTypes(state),
      loadingRelatedDocuments: getLoadingRelatedDocuments(state),
      isAdmin: getIsAdmin(state),
      isCompanyAdmin: getIsCompanyAdmin(state),
      isOrderProcessing: getIsOrderProcessing(state),
      isThirdPartyConnectionException: getIsThirdPartyConnectionException(state),
      isSending: getIsSending(state),
      openedDisputedRequest: getopenedDisputedRequest(state),
      appInfo: getAppInfo(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, { ...Actions, downloadAttachment, addAttachment })(Detail)
