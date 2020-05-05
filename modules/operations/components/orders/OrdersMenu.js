import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Menu } from 'semantic-ui-react'
import * as Actions from '../../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

class OrdersMenu extends Component {
  state = {
    filters: {
      All: { filters: [] },
      Draft: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Draft`]
          }
        ]
      },
      Pending: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Pending`]
          }
        ]
      },
      'In Transit': {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`In Transit`]
          }
        ]
      },
      Review: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Review`]
          }
        ]
      },
      Credit: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Credit`]
          }
        ]
      },
      Completed: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Completed`]
          }
        ]
      },
      'To Ship': {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`To Ship`]
          }
        ]
      },
      Returned: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Returned`]
          }
        ]
      },
      Declined: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Declined`]
          }
        ]
      },
      Cancelled: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Cancelled`]
          }
        ]
      },
      'To Return': {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`To Return`]
          }
        ]
      },
      Confirmed: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Confirmed`]
          }
        ]
      }
    },
  }

  componentDidMount() {
    this.props.datagrid.setFilter(this.state.filters[this.props.activeStatus], true, 'orderMenu')
  }

  loadData(filterData) {
    this.props.datagrid.setFilter(this.state.filters[filterData.status], true, 'orderMenu')
    this.props.loadData(filterData)
  }

  render() {
    const {
      activeStatus,
      intl: { formatMessage }
    } = this.props

    return (
      <Container fluid style={{ padding: '0 32px' }}>
        <Menu pointing secondary horizontal>
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.all',
              defaultMessage: 'ALL'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'All'
              })
            }
            active={!activeStatus || activeStatus === 'All'}
            data-test='menu_orders_all'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.draft',
              defaultMessage: 'Draft'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Draft'
              })
            }
            active={activeStatus === 'Draft'}
            data-test='menu_orders_draft'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.pending',
              defaultMessage: 'PENDING'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Pending'
              })
            }
            active={activeStatus === 'Pending'}
            data-test='menu_orders_pending'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.inTransit',
              defaultMessage: 'IN TRANSIT'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'In Transit'
              })
            }
            active={activeStatus === 'In Transit'}
            data-test='menu_orders_inTransit'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.review',
              defaultMessage: 'REVIEW'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Review'
              })
            }
            active={activeStatus === 'Review'}
            data-test='menu_orders_review'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.credit',
              defaultMessage: 'CREDIT'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Credit'
              })
            }
            active={activeStatus === 'Credit'}
            data-test='menu_orders_credit'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.completed',
              defaultMessage: 'COMPLETED'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Completed'
              })
            }
            active={activeStatus === 'Completed'}
            data-test='menu_orders_completed'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.toShip',
              defaultMessage: 'TO SHIP'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'To Ship'
              })
            }
            active={activeStatus === 'To Ship'}
            data-test='menu_orders_ship'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.returned',
              defaultMessage: 'RETURNED'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Returned'
              })
            }
            active={activeStatus === 'Returned'}
            data-test='menu_orders_returned'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.declined',
              defaultMessage: 'DECLINED'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Declined'
              })
            }
            active={activeStatus === 'Declined'}
            data-test='menu_orders_declined'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.cancelled',
              defaultMessage: 'Cancelled'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Cancelled'
              })
            }
            active={activeStatus === 'Cancelled'}
            data-test='menu_orders_cancelled'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.toReturn',
              defaultMessage: 'To Return'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'To Return'
              })
            }
            active={activeStatus === 'To Return'}
            data-test='menu_orders_to_return'
          />
          <Menu.Item
            name={formatMessage({
              id: 'order.menu.confirmed',
              defaultMessage: 'Confirmed'
            })}
            onClick={() =>
              this.loadData({
                ...this.props.filterData,
                status: 'Confirmed'
              })
            }
            active={activeStatus === 'Confirmed'}
            data-test='menu_orders_confirmed'
          />
        </Menu>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { operations } = state
  return {
    activeStatus: operations.ordersStatusFilter,
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(OrdersMenu)))

