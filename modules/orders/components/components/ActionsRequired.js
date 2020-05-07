import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Segment, Grid, Header, Button } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import moment from 'moment/moment'
import confirm from '~/src/components/Confirmable/confirm'
import { withToastManager } from 'react-toast-notifications'
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'react-feather'

class ActionsRequired extends React.Component {
  confirmCall = d => {
    const {
      intl: { formatMessage }
    } = this.props
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

  actionCall = async d => {
    try {
      await d.action()
    } catch {}
  }

  confirmOrder = async () => {
    const { order, confirmOrder } = this.props
    await confirmOrder(order.id)
  }

  openAssignLots = () => {
    this.props.openAssignLots()
  }

  rejectOrder = () => {
    const { order, rejectOrder } = this.props
    this.confirmCall({
      action: () => rejectOrder(order.id),
      confirmTitleId: 'confirm.order.actions.rejected.title',
      confirmTitleDefaultMessage: 'Reject Order',
      confirmContentId: 'confirm.order.actions.rejected.content',
      confirmContentDefaultMessage: `Do you really want to reject order '${order.id}'?`,
      confirmValues: { orderId: order.id }
    })
  }

  markShipped = () => {
    const { order, shippingTrackingCode, shipOrder, openPopupName } = this.props
    if (shippingTrackingCode.length) {
      this.confirmCall({
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

  markShippedReturn = () => {
    const { order, returnShippingTrackingCode, returnShipOrder, openPopupName } = this.props

    if (returnShippingTrackingCode.length) {
      this.confirmCall({
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

  markReturned = () => {
    const { order, confirmReturned } = this.props
    this.actionCall({
      action: () => confirmReturned(order.id)
    })
  }

  cancelOrder = () => {
    const { order, cancelOrder } = this.props

    this.confirmCall({
      action: () => cancelOrder(order.id),
      confirmTitleId: 'confirm.order.actions.cancelled.title',
      confirmTitleDefaultMessage: 'Cancel Order',
      confirmContentId: 'confirm.order.actions.cancelled.content',
      confirmContentDefaultMessage: `Do you really want to cancel order ${order.id}?`,
      confirmValues: { orderId: order.id }
    })
  }

  approveOrder = () => {
    const { order, approveOrder } = this.props

    this.actionCall({
      action: () => approveOrder(order.id)
    })
  }

  discardOrder = () => {
    const { order, discardOrder } = this.props

    this.actionCall({
      action: () => discardOrder(order.id)
    })
  }

  markDelivered = () => {
    const { order, receivedOrder } = this.props

    this.actionCall({
      action: () => receivedOrder(order.id)
    })
  }

  acceptDelivery = () => {
    const { order, acceptDelivery } = this.props

    this.actionCall({
      action: () => acceptDelivery(order.id)
    })
  }

  renderIcon(color) {
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

  renderSegment(color, columnWidth, title, description, buttons) {
    return (
      <Segment color={color ? color : 'blue'} style={{ marginLeft: '32px', marginRight: '32px' }}>
        {this.renderIcon(color)}
        <Grid verticalAlign='middle' columns='equal'>
          <Grid.Column width={columnWidth}>
            <Header as='h3' color={color ? color : 'black'} style={{ margin: '0 0 0.3571429rem' }}>
              <FormattedMessage id={title ? title : 'order.actionRequired'} />
            </Header>
            <FormattedMessage id={description} />
          </Grid.Column>
          <Grid.Column>
            <Grid verticalAlign='middle' columns='equal'>
              {buttons &&
                buttons.map(button => {
                  if (!button) return
                  return (
                    <Grid.Column>
                      <Button
                        primary={button.buttonType === 'primary'}
                        basic={button.buttonType === 'basic'}
                        fluid
                        size='large'
                        color={color ? color : null}
                        onClick={() => button.onClick()}
                        disabled={typeof button.disabled !== 'undefined' ? button.disabled : false}
                        loading={typeof button.loading !== 'undefined' ? button.loading : false}
                        data-test={button.dataTest}>
                        <FormattedMessage id={button.text} tagName='span' />
                      </Button>
                    </Grid.Column>
                  )
                })}
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }

  render() {
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
      actionNeeded
    } = this.props
    const repayUntil = moment(detail.orderDate)
    // Todo - when completing this refactor using ~/constants/backendObjects/ (OrderStatusEnum, ShippingStatusEnum)
    // Some switch might do the trick

    const textForConforming = !sellEligible ? 'order.confirm.sellElligible.notTrue' : 'order.confirm.accept.decline'

    const requestCreditButton = orderCreditHistoryOpen
      ? {
          buttonType: 'basic',
          onClick: () => openPopupName('openedPurchaseRequestCreditDelivery'),
          dataTest: 'orders_detail_requestCredit_btn',
          text: 'order.requestCredit'
        }
      : null

    return (
      <>
        {ordersType === 'Sales' ? (
          <>
            {orderStatus === 1 // Pending
              ? this.renderSegment(null, 13, null, textForConforming, [
                  {
                    buttonType: 'primary',
                    onClick: this.confirmOrder,
                    dataTest: 'orders_detail_confirm_btn',
                    text: 'global.confirm',
                    loading: isSending === 1,
                    disabled: (isSending && isSending !== 1) || !sellEligible
                  },
                  {
                    buttonType: 'basic',
                    onClick: this.rejectOrder,
                    dataTest: 'orders_detail_reject_btn',
                    text: 'global.reject',
                    loading: isSending === 2,
                    disabled: isSending && isSending !== 2
                  }
                ])
              : null}
            {/*{orderStatus === 2 && shippingStatus === 0 // Confirmed && N/A
              ? this.renderSegment(null, 14, null, 'order.shipFailed.description', [
                  {
                    buttonType: 'primary',
                    onClick: () => openPopupName('openedSaleNewShipping'),
                    dataTest: 'orders_detail_newShipmentSale_btn',
                    text: 'order.NewShipmentSale'
                  }
                ])
              : null}*/}
            {orderStatus === 2 && shippingStatus === 1 && !assignLotsRequired && actionNeeded !== 'PRODUCT-OFFER-ASSIGN' // Confirmed && Not shipped
              ? this.renderSegment(null, 11, null, 'order.ship.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.markShipped,
                    dataTest: 'orders_detail_markAsShipped_btn',
                    text: 'order.markAsShipped',
                    loading: isSending && !openedPopup
                  }
                ])
              : null}

            {orderStatus === 2 && shippingStatus === 1 && !assignLotsRequired && actionNeeded === 'PRODUCT-OFFER-ASSIGN' // Confirmed && Not shipped yet && virtual products
              ? this.renderSegment(null, 11, null, 'order.attach.products', [
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
              ? this.renderSegment(null, 11, null, 'order.ship.description', [
                  {
                    // FE - show action "Assign Lot Numbers" when necessary. (order contains a Virtual ProductOffer)
                    buttonType: 'primary',
                    onClick: this.openAssignLots,
                    dataTest: 'orders_detail_assign_lots_btn',
                    text: 'order.assignLots.re'
                  }
                ])
              : null}
            {orderStatus === 2 && creditReviewStatus === 1 && creditReviewStatus === 1 // CONFIRMED && PENDING && PENDING
              ? this.renderSegment(null, 11, null, 'order.reviewCreditRequestSales.description', [
                  {
                    // FE - show action "Assign Lot Numbers" when necessary. (order contains a Virtual ProductOffer)
                    buttonType: 'primary',
                    onClick: () => openPopupName('openedSaleReviewCreditRequest'),
                    dataTest: 'orders_detail_reviewCreditRequest_btn',
                    text: 'order.reviewCreditRequest'
                  }
                ])
              : null}
            {orderStatus === 2 && reviewStatus === 3 && returnStatus === 0 // CONFIRMED && Rejected && null
              ? this.renderSegment(null, 11, null, 'order.returnShipmentSale.description', [
                  {
                    buttonType: 'primary',
                    onClick: () => openPopupName('openedSaleReturnShipping'),
                    dataTest: 'orders_detail_returnShipmentSale_btn',
                    text: 'order.returnShipmentSale'
                  }
                ])
              : null}
            {orderStatus === 2 && returnStatus === 2 // Confirmed && IN_TRANSIT
              ? this.renderSegment(null, 11, null, 'order.returnInTransit.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.markReturned,
                    dataTest: 'orders_detail_returnInTransit_btn',
                    text: 'order.returnInTransit',
                    loading: isSending
                  }
                ])
              : null}
          </>
        ) : (
          //ordersType === 'Purchase'
          <>
            {orderStatus === 4 // Draft
              ? this.renderSegment(null, 11, null, 'order.detail.status.draft', [
                  {
                    buttonType: 'primary',
                    onClick: this.approveOrder,
                    dataTest: 'orders_detail_approve_btn',
                    text: 'global.approve',
                    loading: isSending === 1,
                    disabled: isSending && isSending !== 1
                  },
                  {
                    buttonType: 'basic',
                    onClick: this.discardOrder,
                    dataTest: 'orders_detail_discard_btn',
                    text: 'global.discard',
                    loading: isSending === 2,
                    disabled: isSending && isSending !== 2
                  }
                ])
              : null}
            {orderStatus === 1 // Pending
              ? this.renderSegment(null, 11, null, 'order.detail.status.pending', [
                  {
                    buttonType: 'basic',
                    onClick: this.cancelOrder,
                    dataTest: 'orders_detail_cancel_btn',
                    text: 'global.cancel',
                    loading: isSending
                  }
                ])
              : null}
            {orderStatus === 2 && shippingStatus === 0 // Confirmed && N/A
              ? this.renderSegment(null, 11, null, 'order.shipFailed.description', [
                  {
                    buttonType: 'primary',
                    onClick: () => openPopupName('openedPurchaseOrderShipping'),
                    dataTest: 'orders_detail_orderShipping_btn',
                    text: 'order.orderShipping'
                  }
                ])
              : null}
            {orderStatus === 2 && shippingStatus === 2 // Confirmed && In transit
              ? this.renderSegment(null, 11, null, 'order.transit.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.markDelivered,
                    dataTest: 'orders_detail_markAsDelivered_btn',
                    text: 'order.markAsDelivered',
                    loading: isSending
                  }
                ])
              : null}
            {orderStatus === 2 && reviewStatus === 1 && creditReviewStatus === 0 // Confirmed && Pending
              ? this.renderSegment(null, 10, null, 'order.delivered.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.acceptDelivery,
                    dataTest: 'orders_detail_accept_btn',
                    text: 'global.accept',
                    loading: isSending && !openedPopup
                  },
                  {
                    buttonType: 'basic',
                    onClick: () => openPopupName('openedPurchaseRejectDelivery'),
                    dataTest: 'orders_detail_reject_btn',
                    text: 'global.reject'
                  },
                  requestCreditButton
                ])
              : null}
            {orderStatus === 2 && reviewStatus === 1 && creditReviewStatus === 2
              ? // Confirmed && PENDING && COUNTER_OFFER_PENDING
                this.renderSegment(null, 11, null, 'order.reviewCreditRequestPurchase.description', [
                  {
                    buttonType: 'primary',
                    onClick: () => openPopupName('openedPurchaseReviewCreditRequest'),
                    dataTest: 'orders_detail_reviewCreditRequest_btn',
                    text: 'order.reviewCreditRequest'
                  }
                ])
              : null}
            {orderStatus === 2 && reviewStatus === 3 && returnStatus === 1 // Confirmed && Rejected && COUNTER_OFFER_PENDING
              ? this.renderSegment(null, 11, null, 'order.waitToReturn.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.markShippedReturn,
                    dataTest: 'orders_detail_markAsShippedReturn_btn',
                    text: 'order.markAsShipped',
                    loading: isSending && !openedPopup
                  }
                ])
              : null}
            {orderStatus === 2 && (detail.paymentStatus === 5 || detail.paymentStatus === 4)
              ? this.renderSegment('red', 11, null, 'order.payment.failed.description', [
                  {
                    buttonType: 'primary',
                    onClick: openReinitiateTransfer,
                    dataTest: 'orders_detail_reinitiate_transfer',
                    text: 'order.reinitiateTransfer'
                  }
                ])
              : null}
          </>
        )}
      </>
    )
  }
}

function checkAssignLotsRequired(data) {
  const status = getSafe(
    () =>
      data.orderItems.filter(orderItem => {
        return (
          orderItem.amount ===
          orderItem.lots.reduce(function (allocated, lot) {
            return allocated + lot.amount
          }, 0)
        )
      }).length === data.orderItems.length,
    false
  )
  return status
}

function mapStateToProps(state, ownProps) {
  const { orders } = state
  return {
    orderStatus: getSafe(() => orders.detail.orderStatus, 0),
    shippingStatus: getSafe(() => orders.detail.shippingStatus, 0),
    reviewStatus: getSafe(() => orders.detail.reviewStatus, 0),
    creditReviewStatus: getSafe(() => orders.detail.creditReviewStatus, 0),
    returnStatus: getSafe(() => orders.detail.returnStatus, 0),
    assignLotsRequired: false, // checkAssignLotsRequired(orders.detail),
    isSending: orders.isSending,
    fundingSourceId: '?', // ! ! which param? (string)

    order: ownProps.order,
    detail: orders.detail,
    ordersType: ownProps.ordersType,
    shippingTrackingCode: orders.detail.shippingTrackingCode ? orders.detail.shippingTrackingCode : '',
    returnShippingTrackingCode: orders.detail.returnShippingTrackingCode
      ? orders.detail.returnShippingTrackingCode
      : '',
    orderCreditHistoryOpen: getSafe(() => orders.detail.orderCreditHistoryOpen, false),
    openedPopup:
      orders.openedEnterTrackingIdShip |
      orders.openedEnterTrackingIdReturnShip |
      orders.openedPurchaseRejectDelivery |
      orders.openedPurchaseRequestCreditDelivery |
      orders.opendSaleAttachingProductOffer,
    sellEligible: getSafe(() => state.auth.identity.company.sellEligible, false),
    actionNeeded: getSafe(() => orders.detail.actionNeeded, '')
  }
}

export default connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(ActionsRequired)))
