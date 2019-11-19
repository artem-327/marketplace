import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions'
import {Segment, Grid, Header, Button} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'
import {getSafe} from '~/utils/functions'
import moment from 'moment/moment'

class ActionsRequired extends React.Component {
  confirmOrder = () => {
    this.props.confirmOrder(this.props.order.id)
  }

  openAssignLots = () => {
    this.props.openAssignLots()
  }

  rejectOrder = () => {
    this.props.rejectOrder(this.props.order.id)
  }

  shipOrder = () => {
    this.props.shipOrder(this.props.order.id)
  }

  cancelOrder = () => {
    this.props.cancelOrder(this.props.order.id)
  }

  approveOrder = () => {
    this.props.approveOrder(this.props.order.id)
  }

  disapproveOrder = () => {
    this.props.disapproveOrder(this.props.order.id)
  }

  renderSegment(color, columnWidth, title, description, buttons) {
    console.log(buttons)
    return (
      <Segment color={color ? color : 'blue'} style={{marginLeft: '32px', marginRight: '32px'}}>
        <Grid verticalAlign='middle' columns='equal'>
          <Grid.Column width={columnWidth}>
            <Header as='h3' color={color ? color : 'black'} style={{margin: '0 0 0.3571429rem'}}>
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
    const {action, ordersType, detail, openReinitiateTransfer, cancelOrder} = this.props
    const repayUntil = moment(detail.orderDate)

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

            {action === '210'
              ? this.renderSegment(null, 14, null, 'order.assignLots.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.openAssignLots,
                    dataTest: 'orders_detail_assign_lots_btn',
                    text: 'order.assignLots'
                  }
                ])
              : null}

            {action === '211'
              ? this.renderSegment(null, 12, null, 'order.ship.description', [
                  {
                    buttonType: 'primary',
                    onClick: this.openAssignLots,
                    dataTest: 'orders_detail_assign_lots_btn',
                    text: 'order.assignLots.re'
                  },
                  {
                    buttonType: 'primary',
                    onClick: this.shipOrder,
                    dataTest: 'orders_detail_ship_btn',
                    text: 'order.ship'
                  }
                ])
              : null}
          </>
        ) : (
          //orderStatus === 'Purchase'
          <>
            {action === '100'
              ? this.renderSegment(null, 13, null, 'order.confirm.cancel', [
                  {
                    buttonType: 'basic',
                    onClick: this.cancelOrder,
                    dataTest: 'orders_detail_cancel_btn',
                    text: 'global.cancel'
                  }
                ])
              : null}
            {action === '400'
              ? this.renderSegment(null, 11, null, 'order.confirm.approve.dissaprove', [
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
                    text: 'global.disapprove'
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
  const {orders} = state

  return {
    action: actionRequired(orders.detail),
    order: ownProps.order,
    detail: orders.detail,
    ordersType: ownProps.ordersType
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsRequired)
