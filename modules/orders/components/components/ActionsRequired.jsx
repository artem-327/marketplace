import { injectIntl } from 'react-intl'
import moment from 'moment/moment'
import PropTypes from 'prop-types'
// Services
import {
  confirmOrder,
  openAssignLots,
  rejectOrder,
  markShipped,
  markShippedReturn,
  markReturned,
  cancelOrder,
  approveOrder,
  discardOrder,
  markDelivered,
  acceptDelivery,
  renderSegment
} from './ActionsRequired.services'

const ActionsRequired = props => {
  const {
    orderStatus,
    shippingStatus,
    reviewStatus,
    assignLotsRequired,
    creditReviewStatus,
    returnStatus,
    ordersType,
    detail,
    openReinitiateTransfer,
    openPopupName,
    isSending,
    openedPopup,
    sellEligible,
    actionNeeded,
    disputeResolutionStatus
  } = props

  const repayUntil = moment(detail.orderDate)
  // Todo - when completing this refactor using ~/constants/backendObjects/ (OrderStatusEnum, ShippingStatusEnum)
  // Some switch might do the trick

  const textForConforming = !sellEligible ? 'order.confirm.sellElligible.notTrue' : 'order.confirm.accept.decline'

  const disputeButton = {
    //ADD condition ? orderCreditHistoryOpen ?
    buttonType: 'basic',
    onClick: () => openPopupName('openedPurchaseRequestCreditDelivery'),
    dataTest: 'orders_detail_dispute_btn',
    text: 'order.dispute'
  }

  return (
    <>
      {ordersType === 'Sales' ? (
        <>
          {orderStatus === 1 // Pending
            ? renderSegment(null, 11, null, textForConforming, [
                {
                  buttonType: 'primary',
                  onClick: () => confirmOrder(props),
                  dataTest: 'orders_detail_confirm_btn',
                  text: 'global.confirm',
                  loading: isSending === 1,
                  disabled: (isSending && isSending !== 1) || !sellEligible
                },
                {
                  buttonType: 'danger',
                  className: 'outline',
                  onClick: () => rejectOrder(props),
                  dataTest: 'orders_detail_reject_btn',
                  text: 'global.reject',
                  loading: isSending === 2,
                  disabled: isSending && isSending !== 2
                }
              ])
            : null}
          {orderStatus === 2 && shippingStatus === 1 && !assignLotsRequired && actionNeeded !== 'PRODUCT-OFFER-ASSIGN' // Confirmed && Not shipped
            ? renderSegment(null, 11, null, 'order.ship.description', [
                {
                  buttonType: 'primary',
                  onClick: () => markShipped(props),
                  dataTest: 'orders_detail_markAsShipped_btn',
                  text: 'order.markAsShipped',
                  loading: isSending && !openedPopup
                }
              ])
            : null}

          {orderStatus === 2 && shippingStatus === 1 && !assignLotsRequired && actionNeeded === 'PRODUCT-OFFER-ASSIGN' // Confirmed && Not shipped yet && virtual products
            ? renderSegment(null, 11, null, 'order.attach.products', [
                {
                  buttonType: 'primary',
                  onClick: () => openPopupName('opendSaleAttachingProductOffer'),
                  dataTest: 'orders_detail_attachproductOffers_btn',
                  text: 'order.attachproductOffers',
                  loading: isSending && !openedPopup
                }
              ])
            : null}

          {orderStatus === 2 && shippingStatus === 1 && assignLotsRequired // Confirmed && Not shipped
            ? renderSegment(null, 11, null, 'order.ship.description', [
                {
                  // FE - show action "Assign Lot Numbers" when necessary. (order contains a Virtual ProductOffer)
                  buttonType: 'primary',
                  onClick: () => openAssignLots(props),
                  dataTest: 'orders_detail_assign_lots_btn',
                  text: 'order.assignLots.re'
                }
              ])
            : null}

          {orderStatus === 2 && creditReviewStatus === 1 && creditReviewStatus === 1 // CONFIRMED && PENDING && PENDING
            ? renderSegment(null, 11, null, 'order.reviewCreditRequestSales.description', [
                {
                  // FE - show action "Assign Lot Numbers" when necessary. (order contains a Virtual ProductOffer)
                  buttonType: 'primary',
                  onClick: () => openPopupName('openedSaleReviewCreditRequest'),
                  dataTest: 'orders_detail_reviewCreditRequest_btn',
                  text: 'order.reviewCreditRequest'
                }
              ])
            : null}

          {orderStatus === 2 && returnStatus === 2 // Confirmed && IN_TRANSIT
            ? renderSegment(null, 11, null, 'order.returnInTransit.description', [
                {
                  buttonType: 'primary',
                  onClick: () => markReturned(props),
                  dataTest: 'orders_detail_returnInTransit_btn',
                  text: 'order.returnInTransit',
                  loading: isSending
                }
              ])
            : null}

          {orderStatus === 2 &&
          (reviewStatus === 4 || reviewStatus === 3) &&
          (disputeResolutionStatus === 1 || disputeResolutionStatus === 2) // Confirmed && Credited || Rejected && Pending || Accepted by buyer
            ? renderSegment('orange', 11, null, 'order.reviewResolutionDispute.description', [
                {
                  buttonType: 'basic',
                  onClick: () => openPopupName('openedDisputedRequest'),
                  dataTest: 'orders_detail_view_btn',
                  text: 'order.view'
                }
              ])
            : null}
        </>
      ) : (
        //ordersType === 'Purchase'
        <>
          {orderStatus === 4 // Draft
            ? renderSegment(null, 11, null, 'order.detail.status.draft', [
                {
                  buttonType: 'primary',
                  onClick: () => approveOrder(props),
                  dataTest: 'orders_detail_approve_btn',
                  text: 'global.approve',
                  loading: isSending === 1,
                  disabled: isSending && isSending !== 1
                },
                {
                  buttonType: 'danger',
                  className: 'outline',
                  onClick: () => discardOrder(props),
                  dataTest: 'orders_detail_discard_btn',
                  text: 'global.discard',
                  loading: isSending === 2,
                  disabled: isSending && isSending !== 2
                }
              ])
            : null}

          {orderStatus === 1 // Pending
            ? renderSegment(null, 11, null, 'order.detail.status.pending', [
                {
                  buttonType: 'basic',
                  onClick: () => cancelOrder(props),
                  dataTest: 'orders_detail_cancel_btn',
                  text: 'global.cancel',
                  loading: isSending
                }
              ])
            : null}

          {orderStatus === 2 && shippingStatus === 0 // Confirmed && N/A
            ? renderSegment(null, 11, null, 'order.shipFailed.description', [
                {
                  buttonType: 'primary',
                  onClick: () => openPopupName('openedPurchaseOrderShipping'),
                  dataTest: 'orders_detail_orderShipping_btn',
                  text: 'order.orderShipping'
                }
              ])
            : null}

          {orderStatus === 2 && shippingStatus === 2 // Confirmed && In transit
            ? renderSegment(null, 11, null, 'order.transit.description', [
                {
                  buttonType: 'primary',
                  onClick: () => markDelivered(props),
                  dataTest: 'orders_detail_markAsDelivered_btn',
                  text: 'order.markAsDelivered',
                  loading: isSending
                }
              ])
            : null}

          {orderStatus === 2 && reviewStatus === 1 && disputeResolutionStatus === 0 && shippingStatus === 3 // Confirmed && Pending && none && Delivered
            ? renderSegment(null, 10, null, 'order.delivered.description', [
                {
                  buttonType: 'primary',
                  onClick: () => acceptDelivery(props),
                  dataTest: 'orders_detail_accept_btn',
                  text: 'global.accept',
                  loading: isSending && !openedPopup
                },
                disputeButton
              ])
            : null}

          {orderStatus === 2 && reviewStatus === 1 && creditReviewStatus === 2
            ? // Confirmed && PENDING && COUNTER_OFFER_PENDING
              renderSegment(null, 11, null, 'order.reviewCreditRequestPurchase.description', [
                {
                  buttonType: 'primary',
                  onClick: () => openPopupName('openedPurchaseReviewCreditRequest'),
                  dataTest: 'orders_detail_reviewCreditRequest_btn',
                  text: 'order.reviewCreditRequest'
                }
              ])
            : null}

          {orderStatus === 2 && reviewStatus === 3 && returnStatus === 1 // Confirmed && Rejected && COUNTER_OFFER_PENDING
            ? renderSegment(null, 11, null, 'order.waitToReturn.description', [
                {
                  buttonType: 'primary',
                  onClick: () => markShippedReturn(props),
                  dataTest: 'orders_detail_markAsShippedReturn_btn',
                  text: 'order.markAsShipped',
                  loading: isSending && !openedPopup
                }
              ])
            : null}

          {orderStatus === 2 && reviewStatus !== 3 && (detail.paymentStatus === 5 || detail.paymentStatus === 4) // Confirmed && Rejected && (Failed || Canceled)
            ? renderSegment('red', 11, null, 'order.payment.failed.description', [
                {
                  buttonType: 'primary',
                  onClick: openReinitiateTransfer,
                  dataTest: 'orders_detail_reinitiate_transfer',
                  text: 'order.reinitiateTransfer'
                }
              ])
            : null}

          {orderStatus === 2 &&
          (reviewStatus === 4 || reviewStatus === 3) &&
          (disputeResolutionStatus === 1 || disputeResolutionStatus === 3) // Confirmed && Credited || Rejected && Pending || Accepted by seller
            ? renderSegment('orange', 11, null, 'order.reviewResolutionDispute.description', [
                {
                  buttonType: 'basic',
                  onClick: () => openPopupName('openedDisputedRequest'),
                  dataTest: 'orders_detail_view_btn',
                  text: 'order.view'
                }
              ])
            : null}
        </>
      )}
    </>
  )
}

ActionsRequired.propTypes = {
  orderStatus: PropTypes.number,
  shippingStatus: PropTypes.number,
  reviewStatus: PropTypes.number,
  creditReviewStatus: PropTypes.number,
  returnStatus: PropTypes.number,
  disputeResolutionStatus: PropTypes.number,
  ordersType: PropTypes.string,
  shippingTrackingCode: PropTypes.string, 
  returnShippingTrackingCode: PropTypes.string, 
  detail: PropTypes.object,
  intl: PropTypes.object,
  order: PropTypes.object, 
  assignLotsRequired: PropTypes.bool,
  isSending: PropTypes.bool,
  sellEligible: PropTypes.bool,
  actionNeeded: PropTypes.bool,
  openReinitiateTransfer: PropTypes.func,
  openPopupName: PropTypes.func,
  openedPopup: PropTypes.func,
  confirmOrder: PropTypes.func,
  openAssignLots: PropTypes.func,
  rejectOrder: PropTypes.func,
  shipOrder: PropTypes.func,
  returnShipOrder: PropTypes.func,
  confirmReturned: PropTypes.func,
  cancelOrder: PropTypes.func,
  approveOrder: PropTypes.func,
  discardOrder: PropTypes.func,
  receivedOrder: PropTypes.func,
  acceptDelivery: PropTypes.func
}

ActionsRequired.defaultValues = {
  orderStatus: 0,
  shippingStatus: 0,
  reviewStatus: 0,
  creditReviewStatus: 0,
  returnStatus: 0,
  disputeResolutionStatus: 0,
  ordersType: '',
  shippingTrackingCode: '', 
  returnShippingTrackingCode: '', 
  detail: {},
  intl: {},
  order: {}, 
  assignLotsRequired: false,
  isSending: false,
  sellEligible: false,
  actionNeeded: false,
  openReinitiateTransfer: () => {},
  openPopupName: () => {},
  openedPopup: () => {},
  confirmOrder: () => {},
  openAssignLots: () => {},
  rejectOrder: () => {},
  shipOrder: () => {},
  returnShipOrder: () => {},
  confirmReturned: () => {},
  cancelOrder: () => {},
  approveOrder: () => {},
  discardOrder: () => {},
  receivedOrder: () => {},
  acceptDelivery: () => {}
}

export default injectIntl(ActionsRequired)
