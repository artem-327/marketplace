import { Segment, Grid, Header } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment/moment'
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'react-feather'
// Services
import { getSafe } from '../../../../utils/functions'
import confirm from '../../../../components/Confirmable/confirm'
// Styles
import { ARButton } from '../../styles'

const ActionsRequired = props => {
  const confirmCall = d => {
    const {
      intl: { formatMessage }
    } = props
    confirm(
      formatMessage({ id: d.confirmTitleId, defaultMessage: d.confirmTitleDefaultMessage }),
      formatMessage(
        {
          id: d.confirmContentId,
          defaultMessage: d.confirmContentDefaultMessage
        },
        d.confirmValues ? d.confirmValues : {}
      )
    ).then(
      () => {
        // confirm
        d.action()
      },
      () => {
        // cancel
      }
    )
  }

  const actionCall = async d => {
    try {
      await d.action()
    } catch {}
  }

  const confirmOrder = async () => {
    const { order, confirmOrder } = props
    await confirmOrder(order.id)
  }

  const openAssignLots = () => {
    props.openAssignLots()
  }

  const rejectOrder = () => {
    const { order, rejectOrder } = props
    confirmCall({
      action: () => rejectOrder(order.id),
      confirmTitleId: 'confirm.order.actions.rejected.title',
      confirmTitleDefaultMessage: 'Reject Order',
      confirmContentId: 'confirm.order.actions.rejected.content',
      confirmContentDefaultMessage: `Do you really want to reject order '${order.id}'?`,
      confirmValues: { orderId: order.id }
    })
  }

  const markShipped = () => {
    const { order, shippingTrackingCode, shipOrder, openPopupName } = props
    if (shippingTrackingCode.length) {
      confirmCall({
        action: () => shipOrder(order.id, shippingTrackingCode),
        confirmTitleId: 'confirm.order.actions.shipped.title',
        confirmTitleDefaultMessage: 'Mark Order as Shipped',
        confirmContentId: 'confirm.order.actions.shipped.content',
        confirmContentDefaultMessage: `Do you really want to mark order '${order.id}' as shipped?`,
        confirmValues: { orderId: order.id }
      })
    } else {
      openPopupName('openedEnterTrackingIdShip')
    }
  }

  const markShippedReturn = () => {
    const { order, returnShippingTrackingCode, returnShipOrder, openPopupName } = props

    if (returnShippingTrackingCode.length) {
      confirmCall({
        action: () => returnShipOrder(order.id, returnShippingTrackingCode),
        confirmTitleId: 'confirm.order.actions.shipped.title',
        confirmTitleDefaultMessage: 'Mark Order as Shipped',
        confirmContentId: 'confirm.order.actions.shipped.content',
        confirmContentDefaultMessage: `Do you really want to mark order '${order.id}' as shipped?`,
        confirmValues: { orderId: order.id }
      })
    } else {
      openPopupName('openedEnterTrackingIdReturnShip')
    }
  }

  const markReturned = () => {
    const { order, confirmReturned } = props
    actionCall({
      action: () => confirmReturned(order.id)
    })
  }

  const cancelOrder = () => {
    const { order, cancelOrder } = props

    confirmCall({
      action: () => cancelOrder(order.id),
      confirmTitleId: 'confirm.order.actions.cancelled.title',
      confirmTitleDefaultMessage: 'Cancel Order',
      confirmContentId: 'confirm.order.actions.cancelled.content',
      confirmContentDefaultMessage: `Do you really want to cancel order ${order.id}?`,
      confirmValues: { orderId: order.id }
    })
  }

  const approveOrder = () => {
    const { order, approveOrder } = props

    actionCall({
      action: () => approveOrder(order.id)
    })
  }

  const discardOrder = () => {
    const { order, discardOrder } = props

    actionCall({
      action: () => discardOrder(order.id)
    })
  }

  const markDelivered = () => {
    const { order, receivedOrder } = props

    actionCall({
      action: () => receivedOrder(order.id)
    })
  }

  const acceptDelivery = () => {
    const { order, acceptDelivery } = props

    actionCall({
      action: () => acceptDelivery(order.id)
    })
  }

  const renderIcon = (color) => {
    switch (color) {
      case 'red':
        return <AlertTriangle />
      case 'green':
        return <CheckCircle />
      case 'yellow':
      case 'orange':
        return <AlertCircle />
      default:
        return <Info />
    }
  }

  const renderSegment = (color, columnWidth, title, description, buttons) => {
    return (
      <Segment color={color ? color : 'blue'} style={{ marginLeft: '32px', marginRight: '32px' }}>
        {renderIcon(color)}
        <Grid verticalAlign='middle' columns='equal'>
          <Grid.Column width={columnWidth}>
            <Header as='h3' color={color ? color : 'black'} style={{ margin: '0 0 6px' }}>
              <FormattedMessage id={title ? title : 'order.actionRequired'} />
            </Header>
            <FormattedMessage id={description} />
          </Grid.Column>
          <Grid.Column>
            {buttons &&
              buttons.map(button => {
                if (!button) return
                return (
                  <ARButton
                    primary={button.buttonType === 'primary'}
                    basic={button.buttonType === 'basic'}
                    secondary={button.buttonType === 'secondary'}
                    fluid
                    size='large'
                    color={color ? color : null}
                    className={
                      (button.buttonType !== 'primary' &&
                      button.buttonType !== 'basic' &&
                      button.buttonType !== 'secondary'
                        ? button.buttonType + ' '
                        : '') + getSafe(() => button.className, '')
                    }
                    onClick={() => button.onClick()}
                    disabled={typeof button.disabled !== 'undefined' ? button.disabled : false}
                    loading={typeof button.loading !== 'undefined' ? button.loading : false}
                    data-test={button.dataTest}>
                    <FormattedMessage id={button.text} tagName='span' />
                  </ARButton>
                )
              })}
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }


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
    orderCreditHistoryOpen,
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
                  onClick: confirmOrder,
                  dataTest: 'orders_detail_confirm_btn',
                  text: 'global.confirm',
                  loading: isSending === 1,
                  disabled: (isSending && isSending !== 1) || !sellEligible
                },
                {
                  buttonType: 'danger',
                  className: 'outline',
                  onClick: rejectOrder,
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
                  onClick: markShipped,
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
                  onClick: openAssignLots,
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
                  onClick: markReturned,
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
                  onClick: approveOrder,
                  dataTest: 'orders_detail_approve_btn',
                  text: 'global.approve',
                  loading: isSending === 1,
                  disabled: isSending && isSending !== 1
                },
                {
                  buttonType: 'danger',
                  className: 'outline',
                  onClick: discardOrder,
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
                  onClick: cancelOrder,
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
                  onClick: markDelivered,
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
                  onClick: acceptDelivery,
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
                  onClick: markShippedReturn,
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

export default injectIntl(ActionsRequired)
