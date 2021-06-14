import { Segment, Grid, Header } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'react-feather'
// Services
import { getSafe } from '../../../../utils/functions'
import confirm from '../../../../components/Confirmable/confirm'
// Styles
import { ARButton } from '../../styles'

export const confirmCall = (d, props) => {
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

export const actionCall = async d => {
    try {
    await d.action()
    } catch {}
}

export const confirmOrder = async (props) => {
    const { order, confirmOrder } = props
    await confirmOrder(order.id)
}

export const openAssignLots = (props) => {
    props.openAssignLots()
}

export const rejectOrder = (props) => {
    const { order, rejectOrder } = props
    confirmCall({
    action: () => rejectOrder(order.id),
    confirmTitleId: 'confirm.order.actions.rejected.title',
    confirmTitleDefaultMessage: 'Reject Order',
    confirmContentId: 'confirm.order.actions.rejected.content',
    confirmContentDefaultMessage: `Do you really want to reject order '${order.id}'?`,
    confirmValues: { orderId: order.id }
    }, props)
}

export const markShipped = (props) => {
    const { order, shippingTrackingCode, shipOrder, openPopupName } = props
    if (shippingTrackingCode.length) {
    confirmCall({
        action: () => shipOrder(order.id, shippingTrackingCode),
        confirmTitleId: 'confirm.order.actions.shipped.title',
        confirmTitleDefaultMessage: 'Mark Order as Shipped',
        confirmContentId: 'confirm.order.actions.shipped.content',
        confirmContentDefaultMessage: `Do you really want to mark order '${order.id}' as shipped?`,
        confirmValues: { orderId: order.id }
    }, props)
    } else {
    openPopupName('openedEnterTrackingIdShip')
    }
}

export const markShippedReturn = (props) => {
    const { order, returnShippingTrackingCode, returnShipOrder, openPopupName } = props

    if (returnShippingTrackingCode.length) {
    confirmCall({
        action: () => returnShipOrder(order.id, returnShippingTrackingCode),
        confirmTitleId: 'confirm.order.actions.shipped.title',
        confirmTitleDefaultMessage: 'Mark Order as Shipped',
        confirmContentId: 'confirm.order.actions.shipped.content',
        confirmContentDefaultMessage: `Do you really want to mark order '${order.id}' as shipped?`,
        confirmValues: { orderId: order.id }
    }, props)
    } else {
    openPopupName('openedEnterTrackingIdReturnShip')
    }
}

export const markReturned = (props) => {
    const { order, confirmReturned } = props
    actionCall({
    action: () => confirmReturned(order.id)
    })
}

export const cancelOrder = (props) => {
    const { order, cancelOrder } = props

    confirmCall({
    action: () => cancelOrder(order.id),
    confirmTitleId: 'confirm.order.actions.cancelled.title',
    confirmTitleDefaultMessage: 'Cancel Order',
    confirmContentId: 'confirm.order.actions.cancelled.content',
    confirmContentDefaultMessage: `Do you really want to cancel order ${order.id}?`,
    confirmValues: { orderId: order.id }
    }, props)
}

export const approveOrder = (props) => {
    const { order, approveOrder } = props

    actionCall({
    action: () => approveOrder(order.id)
    })
}

export const discardOrder = (props) => {
    const { order, discardOrder } = props

    actionCall({
    action: () => discardOrder(order.id)
    })
}

export const markDelivered = (props) => {
    const { order, receivedOrder } = props

    actionCall({
    action: () => receivedOrder(order.id)
    })
}

export const acceptDelivery = (props) => {
    const { order, acceptDelivery } = props

    actionCall({
    action: () => acceptDelivery(order.id)
    })
}

export const renderIcon = (color) => {
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

export const renderSegment = (color, columnWidth, title, description, buttons) => {
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
