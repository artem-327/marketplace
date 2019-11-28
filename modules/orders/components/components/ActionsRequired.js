import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import { Segment, Grid, Header, Button } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import moment from 'moment/moment'
import confirm from '~/src/components/Confirmable/confirm'
import { withToastManager } from 'react-toast-notifications'

class ActionsRequired extends React.Component {
  confirmCall = (d) => {
    const { intl: { formatMessage } } = this.props
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
      () => { // confirm
        d.toastTitleId
          ? this.toastCall({ ...d })
          : d.action()
      },
      () => { // cancel
      }
    )
  }

  toastCall = async (d) => {
    const { toastManager } = this.props
    try {
      //! !await d.action()
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage
            id={d.toastTitleId}
            defaultMessage={d.toastTitleDefaultMessage}
          />,
          <FormattedMessage
            id={d.toastContentId}
            defaultMessage={d.toastContentDefaultMessage}
            values={d.toastValues}
          />
        ), { appearance: 'success' }
      )
    } catch {}
  }

  confirmOrder = () => {
    const { order, confirmOrder } = this.props
    this.confirmCall({
      action: () => confirmOrder(order.id),
      confirmTitleId:               'confirm.order.actions.confirmed.title',
      confirmTitleDefaultMessage:   'Confirm Order',
      confirmContentId:             'confirm.order.actions.confirmed.content',
      confirmContentDefaultMessage: `Do you really want to confirm order '${order.id}'?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.order.actions.confirmed.success.header',
      toastTitleDefaultMessage:     'Order Confirmed',
      toastContentId:               'notifications.order.actions.confirmed.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully confirmed.',
      toastValues: { orderId: order.id }
    })
  }

  openAssignLots = () => {
    this.props.openAssignLots()
  }

  rejectOrder = () => {
    const { order, rejectOrder } = this.props
    this.confirmCall({
      action: () => rejectOrder(order.id),
      confirmTitleId:               'confirm.order.actions.rejected.title',
      confirmTitleDefaultMessage:   'Reject Order',
      confirmContentId:             'confirm.order.actions.rejected.content',
      confirmContentDefaultMessage: `Do you really want to reject order '${order.id}'?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.order.actions.rejected.success.header',
      toastTitleDefaultMessage:     'Order Rejected',
      toastContentId:               'notifications.order.actions.rejected.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully rejected.',
      toastValues: { orderId: order.id }
    })
  }

  markShipped =() => {
    const { order, shippingTrackingCode, shipOrder, openEnterTrackingId } = this.props

    if (shippingTrackingCode.length) {
      this.confirmCall({
        action: () => shipOrder(order.id, shippingTrackingCode),
        confirmTitleId:               'confirm.order.actions.shipped.title',
        confirmTitleDefaultMessage:   'Mark Order as Shipped',
        confirmContentId:             'confirm.order.actions.shipped.content',
        confirmContentDefaultMessage: `Do you really want to mark order '${order.id}' as shipped?`,
        confirmValues: { orderId: order.id },
        toastTitleId:                 'notifications.order.actions.shipped.success.header',
        toastTitleDefaultMessage:     'Order Marked as Shipped',
        toastContentId:               'notifications.order.actions.shipped.success.content',
        toastContentDefaultMessage:   'Order {orderId} successfully marked as shipped',
        toastValues: { orderId: order.id }
      })
    }
    else {
      openEnterTrackingId()
    }
  }

  cancelOrder = () => {
    const { order, cancelOrder } = this.props

    this.confirmCall({
      action: () => cancelOrder(order.id),
      confirmTitleId:               'confirm.order.actions.cancelled.title',
      confirmTitleDefaultMessage:   'Cancel Order',
      confirmContentId:             'confirm.order.actions.cancelled.content',
      confirmContentDefaultMessage: `Do you really want to cancel order '${order.id}'?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.order.actions.cancelled.success.header',
      toastTitleDefaultMessage:     'Order Cancelled',
      toastContentId:               'notifications.order.actions.cancelled.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully cancelled.',
      toastValues: { orderId: order.id }
    })
  }

  approveOrder = () => {
    const { order, approveOrder } = this.props

    this.confirmCall({
      action: () => approveOrder(order.id),
      confirmTitleId:               'confirm.order.actions.approved.title',
      confirmTitleDefaultMessage:   'Approve Order',
      confirmContentId:             'confirm.order.actions.approved.content',
      confirmContentDefaultMessage: `Do you really want to approve order '${order.id}'?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.order.actions.approved.success.header',
      toastTitleDefaultMessage:     'Order Approved',
      toastContentId:               'notifications.order.actions.approved.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully approved.',
      toastValues: { orderId: order.id }
    })
  }

  disapproveOrder = () => {
    const { order, disapproveOrder } = this.props

    this.confirmCall({
      action: () => disapproveOrder(order.id),
      confirmTitleId:               'confirm.order.actions.disapproved.title',
      confirmTitleDefaultMessage:   'Discard Order',
      confirmContentId:             'confirm.order.actions.disapproved.content',
      confirmContentDefaultMessage: `Do you really want to discard order '${order.id}'?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.order.actions.disapproved.success.header',
      toastTitleDefaultMessage:     'Order Discarded',
      toastContentId:               'notifications.order.actions.disapproved.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully discarded.',
      toastValues: { orderId: order.id }
    })
  }

  markDelivered = () => {
    const { order, receivedOrder } = this.props

    this.confirmCall({
      action: () => receivedOrder(order.id),
      confirmTitleId:               'confirm.order.actions.delivered.title',
      confirmTitleDefaultMessage:   'Mark Order as Delivered',
      confirmContentId:             'confirm.order.actions.delivered.content',
      confirmContentDefaultMessage: `Do you really want to mark order '${order.id}' as delivered?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.order.actions.delivered.success.header',
      toastTitleDefaultMessage:     'Order Marked as Delivered',
      toastContentId:               'notifications.order.actions.delivered.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully marked as delivered.',
      toastValues: { orderId: order.id }
    })
  }

  acceptDelivery = () => {
    const { order, acceptDelivery } = this.props

    this.confirmCall({
      action: () => acceptDelivery(order.id),
      confirmTitleId:               'confirm.order.actions.acceptDelivery.title',
      confirmTitleDefaultMessage:   'Accept Delivered Order',
      confirmContentId:             'confirm.order.actions.acceptDelivery.content',
      confirmContentDefaultMessage: `Do you really want to accept delivered order '${order.id}'?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.order.actions.acceptDelivery.success.header',
      toastTitleDefaultMessage:     'Order Marked as Delivered',
      toastContentId:               'notifications.order.actions.acceptDelivery.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully marked as delivered.',
      toastValues: { orderId: order.id }
    })
  }


  renderSegment(color, columnWidth, title, description, buttons) {
    return (
      <Segment color={color ? color : 'blue'} style={{ marginLeft: '32px', marginRight: '32px' }}>
        <Grid verticalAlign='middle' columns='equal'>
          <Grid.Column width={columnWidth}>
            <Header as='h3' color={color ? color : 'black'} style={{ margin: '0 0 0.3571429rem' }}>
              <FormattedMessage id={title ? title : 'order.actionRequired'} />
            </Header>
            <FormattedMessage id={description} />
          </Grid.Column>
          <Grid.Column>
            <Grid verticalAlign='middle' columns='equal'>
              {buttons.map(button => {
                return (
                  <Grid.Column>
                    <Button
                      primary={button.buttonType === 'primary'}
                      basic={button.buttonType === 'basic'}
                      fluid
                      size='large'
                      color={color ? color : null}
                      onClick={() => button.onClick()}
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
      orderStatus, shippingStatus, reviewStatus,
      ordersType, detail, openReinitiateTransfer, cancelOrder
    } = this.props
    const repayUntil = moment(detail.orderDate)
    // Todo - when completing this refactor using ~/constants/backendObjects/ (OrderStatusEnum, ShippingStatusEnum)
    // Some switch might do the trick

    return (
      <>
        {ordersType === 'Sales' ? (
          <>
            {orderStatus === 1 // Pending
              ? this.renderSegment(null, 13, null, 'order.confirm.accept.decline', [
                  {
                    buttonType: 'primary',
                    onClick: this.confirmOrder,
                    dataTest: 'orders_detail_confirm_btn',
                    text: 'global.confirm'
                  },
                  {
                    buttonType: 'basic',
                    onClick: this.rejectOrder,
                    dataTest: 'orders_detail_reject_btn',
                    text: 'global.reject'
                  }
                ])
              : null}

            {false && orderStatus === 210  // ! ! temporary commented
              ? this.renderSegment(null, 14, null, 'order.assignLots.description', [
                  {// FE - show action "Assign Lot Numbers" when necessary. (order contains a Virtual ProductOffer)
                    buttonType: 'primary',
                    onClick: this.openAssignLots,
                    dataTest: 'orders_detail_assign_lots_btn',
                    text: 'order.assignLots'
                  }
                ])
              : null}

            {false && orderStatus === 211  // ! ! temporary commented
              ? this.renderSegment(null, 12, null, 'order.ship.description', [
                  {// FE - show action "Assign Lot Numbers" when necessary. (order contains a Virtual ProductOffer)
                    buttonType: 'primary',
                    onClick: this.openAssignLots,
                    dataTest: 'orders_detail_assign_lots_btn',
                    text: 'order.assignLots.re'
                  },
                  {
                    buttonType: 'primary',
                    onClick: this.markShipped,
                    dataTest: 'orders_detail_markAsShipped_btn',
                    text: 'order.ship'
                  }
                ])
              : null}
            {orderStatus === 2 && shippingStatus === 1  // Confirmed && Not shipped
              ? this.renderSegment(null, 12, null, 'order.ship.description', [
                {
                  buttonType: 'primary',
                  onClick: this.markShipped,
                  dataTest: 'orders_detail_markAsShipped_btn',
                  text: 'order.markAsShipped'
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
                  text: 'global.approve'
                },
                {
                  buttonType: 'basic',
                  onClick: this.disapproveOrder,
                  dataTest: 'orders_detail_discard_btn',
                  text: 'global.discard'
                }
              ])
              : null}
            {orderStatus === 1 // Pending
              ? this.renderSegment(null, 13, null, 'order.detail.status.pending', [
                  {
                    buttonType: 'basic',
                    onClick: this.cancelOrder,
                    dataTest: 'orders_detail_cancel_btn',
                    text: 'global.cancel'
                  }
                ])
              : null}
            {orderStatus === 2 && shippingStatus === 2  // Confirmed && In transit
              ? this.renderSegment(null, 13, null, 'order.transit.description', [
                {
                  buttonType: 'primary',
                  onClick: this.markDelivered,
                  dataTest: 'orders_detail_markAsDelivered_btn',
                  text: 'order.markAsDelivered'
                }
              ])
              : null}
            {orderStatus === 2 && shippingStatus === 3 && reviewStatus === 1 // Confirmed && Delivered && Pending
              ? this.renderSegment(null, 10, null, 'order.delivered.description', [
                {
                  buttonType: 'primary',
                  onClick: this.acceptDelivery,
                  dataTest: 'orders_detail_accept_btn',
                  text: 'global.accept'
                },
                {
                  buttonType: 'basic',
                  onClick: this.requestCreditDelivery,
                  dataTest: 'orders_detail_requestCredit_btn',
                  text: 'order.requestCredit'
                },
                {
                  buttonType: 'basic',
                  onClick: this.rejectDelivery,
                  dataTest: 'orders_detail_reject_btn',
                  text: 'global.reject'
                }
              ])
              : null}
            {(detail.paymentStatus === 5 || detail.paymentStatus === 4) && moment().isBefore(repayUntil.add(3, 'days'))
              ? this.renderSegment('red', 14, null, 'order.payment.failed.description', [
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

function mapStateToProps(state, ownProps) {
  const { orders } = state
  return {
    orderStatus: 2,//getSafe(() => orders.detail.orderStatus, 0),
    shippingStatus: 3,//getSafe(() => orders.detail.shippingStatus, 0),
    reviewStatus: 1,//getSafe(() => orders.detail.reviewStatus, 0),

    order: ownProps.order,
    detail: orders.detail,
    ordersType: ownProps.ordersType,
    shippingTrackingCode: orders.detail.shippingTrackingCode ? orders.detail.shippingTrackingCode : '',
    returnShippingTrackingCode: orders.detail.returnShippingTrackingCode ? orders.detail.returnShippingTrackingCode : ''
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(ActionsRequired)))
