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
      await d.action()
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
      confirmTitleId:               'confirm.markOrderAsConfirmed.title',
      confirmTitleDefaultMessage:   'Mark Order as Confirmed?',
      confirmContentId:             'confirm.markOrderAsConfirmed.content',
      confirmContentDefaultMessage: `Do you really want to mark Order '${order.id}' as Confirmed?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.markOrderAsConfirmed.success.header',
      toastTitleDefaultMessage:     'Order Marked as Confirmed',
      toastContentId:               'notifications.markOrderAsConfirmed.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully marked as Confirmed',
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
      confirmTitleId:               'confirm.markOrderAsRejected.title',
      confirmTitleDefaultMessage:   'Mark Order as Rejected?',
      confirmContentId:             'confirm.markOrderAsRejected.content',
      confirmContentDefaultMessage: `Do you really want to mark Order '${order.id}' as Rejected?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.markOrderAsRejected.success.header',
      toastTitleDefaultMessage:     'Order Marked as Rejected',
      toastContentId:               'notifications.markOrderAsRejected.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully marked as Rejected',
      toastValues: { orderId: order.id }
    })
  }

  markShipped =() => {
    const { order, shippingTrackingCode, shipOrder, openEnterTrackingId } = this.props

    if (shippingTrackingCode.length) {
      this.confirmCall({
        action: () => shipOrder(order.id, shippingTrackingCode),
        confirmTitleId:               'confirm.markOrderAsShipped.title',
        confirmTitleDefaultMessage:   'Mark Order as Shipped?',
        confirmContentId:             'confirm.markOrderAsShipped.content',
        confirmContentDefaultMessage: `Do you really want to mark Order '${order.id}' as shipped?`,
        confirmValues: { orderId: order.id },
        toastTitleId:                 'notifications.markOrderAsShipped.success.header',
        toastTitleDefaultMessage:     'Order Marked as Shipped',
        toastContentId:               'notifications.markOrderAsShipped.success.content',
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
      confirmTitleId:               'confirm.markOrderAsCancelled.title',
      confirmTitleDefaultMessage:   'Mark Order as Cancelled?',
      confirmContentId:             'confirm.markOrderAsCancelled.content',
      confirmContentDefaultMessage: `Do you really want to mark Order '${order.id}' as Cancelled?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.markOrderAsCancelled.success.header',
      toastTitleDefaultMessage:     'Order Marked as Cancelled',
      toastContentId:               'notifications.markOrderAsCancelled.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully marked as Cancelled',
      toastValues: { orderId: order.id }
    })
  }

  approveOrder = () => {
    const { order, approveOrder } = this.props

    this.confirmCall({
      action: () => approveOrder(order.id),
      confirmTitleId:               'confirm.markOrderAsApproved.title',
      confirmTitleDefaultMessage:   'Mark Order as Approved?',
      confirmContentId:             'confirm.markOrderAsApproved.content',
      confirmContentDefaultMessage: `Do you really want to mark Order '${order.id}' as Approved?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.markOrderAsApproved.success.header',
      toastTitleDefaultMessage:     'Order Marked as Approved',
      toastContentId:               'notifications.markOrderAsApproved.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully marked as Approved',
      toastValues: { orderId: order.id }
    })
  }

  disapproveOrder = () => {
    const { order, disapproveOrder } = this.props

    this.confirmCall({
      action: () => disapproveOrder(order.id),
      confirmTitleId:               'confirm.markOrderAsDisapproved.title',
      confirmTitleDefaultMessage:   'Mark Order as Disapproved?',
      confirmContentId:             'confirm.markOrderAsDisapproved.content',
      confirmContentDefaultMessage: `Do you really want to mark Order '${order.id}' as Disapproved?`,
      confirmValues: { orderId: order.id },
      toastTitleId:                 'notifications.markOrderAsDisapproved.success.header',
      toastTitleDefaultMessage:     'Order Marked as Disapproved',
      toastContentId:               'notifications.markOrderAsDisapproved.success.content',
      toastContentDefaultMessage:   'Order {orderId} successfully marked as Disapproved',
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
    const { action, ordersType, detail, openReinitiateTransfer, cancelOrder } = this.props
    const repayUntil = moment(detail.orderDate)
    // Todo - when completing this refactor using ~/constants/backendObjects/ (OrderStatusEnum, ShippingStatusEnum)
    // Some switch might do the trick

    return (
      <>
        {ordersType === 'Sales' ? (
          <>
            {action === '100'
              ? this.renderSegment(null, 13, null, 'order.confirm.accept.decline', [
                  {
                    buttonType: 'primary',
                    onClick: this.confirmOrder,
                    dataTest: 'orders_detail_accept_btn',
                    text: 'global.accept'
                  },
                  {
                    buttonType: 'basic',
                    onClick: this.rejectOrder,
                    dataTest: 'orders_detail_decline_btn',
                    text: 'global.decline'
                  }
                ])
              : null}

            {false && action === '210'  // ! ! to be deleted?
              ? this.renderSegment(null, 14, null, 'order.assignLots.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.openAssignLots,
                    dataTest: 'orders_detail_assign_lots_btn',
                    text: 'order.assignLots'
                  }
                ])
              : null}

            {false && action === '211'  // ! ! to be deleted?
              ? this.renderSegment(null, 12, null, 'order.ship.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.openAssignLots,
                    dataTest: 'orders_detail_assign_lots_btn',
                    text: 'order.assignLots.re'
                  },
                  {
                    buttonType: 'primary',
                    onClick: this.markShipped,
                    dataTest: 'orders_detail_ship_btn',
                    text: 'order.ship'
                  }
                ])
              : null}
            {action === '210' || action === '211'
              ? this.renderSegment(null, 12, null, 'order.ship.description', [
                {
                  buttonType: 'primary',
                  onClick: this.markShipped,
                  dataTest: 'orders_detail_ship_btn',
                  text: 'order.markAsShipped'
                }
              ])
              : null}
          </>
        ) : (
          //orderStatus === 'Purchase'
          <>
            {action === '100' // Pending
              ? this.renderSegment(null, 13, null, 'order.detail.status.pending', [
                  {
                    buttonType: 'basic',
                    onClick: this.cancelOrder,
                    dataTest: 'orders_detail_cancel_btn',
                    text: 'global.cancel'
                  }
                ])
              : null}
            {action === '400' // Draft
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
                    dataTest: 'orders_detail_disapprove_btn',
                    text: 'global.discard'
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

function actionRequired(data) {
  // return merged status codes
  // orderStatus + shippingStatus + assignedLots
  const statusCode =
    getSafe(() => data.orderStatus.toString(), 0) +
    getSafe(() => data.shippingStatus.toString(), 0) +
    getSafe(
      () =>
        data.orderItems.filter(orderItem => {
          return (
            orderItem.amount ===
            orderItem.lots.reduce(function(allocated, lot) {
              return allocated + lot.amount
            }, 0)
          )
        }).length === data.orderItems.length
          ? 1
          : 0,
      0
    )
  return statusCode
}

function mapStateToProps(state, ownProps) {
  const { orders } = state
  return {
    action: actionRequired(orders.detail),
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
