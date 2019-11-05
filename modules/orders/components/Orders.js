import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Menu, Header, Container, Icon } from 'semantic-ui-react'

import SubMenu from '~/src/components/SubMenu'
import Spinner from '~/src/components/Spinner/Spinner'
import ProdexGrid from '~/components/table'
import { actions } from 'react-redux-form'
import { OrderFilter } from '~/modules/filter'
import { getSafe } from '~/utils/functions'
import { filterPresets } from '~/modules/filter/constants/filter'

class Orders extends Component {
  state = {
    columns: [
      { name: 'id', title: <FormattedMessage id='order.orderId' defaultMessage='Order ID'>{text => text}</FormattedMessage>, width: 120, sortPath: 'Order.id' },
      { name: 'globalStatus', title: <FormattedMessage id='order.cfGlobalStatus' defaultMessage='Status'>{text => text}</FormattedMessage>, width: 120, sortPath: 'Order.cfGlobalStatus' },
      { name: 'date', title: <FormattedMessage id='order.date' defaultMessage='Order Date'>{text => text}</FormattedMessage>, width: 120, sortPath: 'Order.orderDate' },
      { name: 'customerName', title: <FormattedMessage id='order.vendor' defaultMessage='Vendor'>{text => text}</FormattedMessage>, width: 120, sortPath: 'Order.sellerCompanyName' }, // ! ! ? seller vs purchaser
      { name: 'productName', title: <FormattedMessage id='order.productName' defaultMessage='Product Name'>{text => text}</FormattedMessage>, width: 160 },
      { name: 'orderStatus', title: <FormattedMessage id='order' defaultMessage='Order'>{text => text}</FormattedMessage>, width: 120 },
      { name: 'shippingStatus', title: <FormattedMessage id='order.shipping' defaultMessage='Shipping'>{text => text}</FormattedMessage>, width: 120 },
      { name: 'reviewStatus', title: <FormattedMessage id='order.review' defaultMessage='Review'>{text => text}</FormattedMessage>, width: 120 },
      { name: 'creditStatus', title: <FormattedMessage id='order.credit' defaultMessage='Credit'>{text => text}</FormattedMessage>, width: 120 },
      { name: 'paymentStatus', title: <FormattedMessage id='order.payment' defaultMessage='Payment'>{text => text}</FormattedMessage>, width: 120 },
      { name: 'bl', title: <FormattedMessage id='order.bl' defaultMessage='B/L'>{text => text}</FormattedMessage>, width: 80 },
      { name: 'sds', title: <FormattedMessage id='order.sds' defaultMessage='SDS'>{text => text}</FormattedMessage>, width: 80 },
      { name: 'cofA', title: <FormattedMessage id='order.cOfa' defaultMessage='C of A'>{text => text}</FormattedMessage>, width: 80 },
      { name: 'orderTotal', title: <FormattedMessage id='order.orderTotal' defaultMessage='Order Total'>{text => text}</FormattedMessage>, width: 160, sortPath: 'Order.cfPriceSubtotal' }
    ],
    sorting: {
      sortDirection: '',
      sortPath: ''
    },

    LastEndpointType: '',

    filters: {
      'All': { filters: [] },
      'Pending': {
        filters: [
          { operator: 'EQUALS', path: 'Order.cfGlobalStatus', values: [`Pending`] }
        ]
      },
      'In Transit': {
        filters: [
          { operator: 'EQUALS', path: 'Order.cfGlobalStatus', values: [`In Transit`] }
        ]
      },
      'Review': {
        filters: [
          { operator: 'EQUALS', path: 'Order.cfGlobalStatus', values: [`Review`] }
        ]
      },
      'Credit': {
        filters: [
          { operator: 'EQUALS', path: 'Order.cfGlobalStatus', values: [`Credit`] }
        ]
      },
      'Completed': {
        filters: [
          { operator: 'EQUALS', path: 'Order.cfGlobalStatus', values: [`Completed`] }
        ]
      },
      'Returned': {
        filters: [
          { operator: 'EQUALS', path: 'Order.cfGlobalStatus', values: [`Returned`] }
        ]
      },
      'Declined': {
        filters: [
          { operator: 'EQUALS', path: 'Order.cfGlobalStatus', values: [`Declined`] }
        ]
      },
    }
  }

  loadData(endpointType, filterData) {
    this.props.dispatch(actions.change('forms.filter.status', filterData.status))
    this.props.datagrid.loadData(this.state.filters[filterData.status])
    this.props.loadData(endpointType, filterData)
  }

  failedWrapper = (value) => {
    return (
      <span style={{ color: '#DB2828' }}>{value}</span>
    )
  }

  getRows = () => {
    return this.props.rows.map(row => ({
      ...row,
      globalStatus: row.globalStatus === 'Failed' ? this.failedWrapper(row.globalStatus) : row.globalStatus,
      paymentStatus: row.paymentStatus === 'Failed' ? this.failedWrapper(row.paymentStatus) : row.paymentStatus,
      bl: <Icon name='file' className='unknown' />, // unknown / positive / negative
      sds: <Icon name='file' className='unknown' />,
      cofA: <Icon name='file' className='unknown' />
    }))
  }

  handleFilterApply = payload => {
    let statusFilters = getSafe(() => this.state.filters[this.props.filterData.status].filters, [])
    statusFilters.forEach(f => payload.filters.push(f))

    this.props.datagrid.setFilter(payload)
  }

  componentDidMount() {
    const { endpointType, filterData } = this.props
    this.props.loadData(endpointType, { status: 'All' })
  }

  componentDidUpdate(prevProps) {
    const { endpointType } = this.props
    if (prevProps.endpointType !== this.props.endpointType) {
      this.props.loadData(endpointType, { status: 'All' })
    }
  }

  handleFilterClear = () => {
    this.props.applyFilter({ filters: [] })
    this.props.datagrid.setFilter({ filters: [] })
  }

  render() {
    const { endpointType, /*match, rows,*/ isFetching, activeStatus, queryType, router, datagrid, intl: { formatMessage } } = this.props

    const { columns } = this.state
    let ordersType = queryType.charAt(0).toUpperCase() + queryType.slice(1)

    return (
      <div id='page' className='flex stretched scrolling'>
        <Container fluid style={{ padding: '0 32px' }}>
          <Menu pointing secondary horizontal>
            <Menu.Item name={formatMessage({ id: 'order.menu.all', defaultMessage: 'ALL' })} onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'All' })} active={!activeStatus || activeStatus === 'All'} data-test='menu_orders_all' />
            <Menu.Item name={formatMessage({ id: 'order.menu.pending', defaultMessage: 'PENDING' })} onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Pending' })} active={activeStatus === 'Pending'} data-test='menu_orders_pending' />
            <Menu.Item name={formatMessage({ id: 'order.menu.inTransit', defaultMessage: 'IN TRANSIT' })} onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'In Transit' })} active={activeStatus === 'In Transit'} data-test='menu_orders_inTransit' />
            <Menu.Item name={formatMessage({ id: 'order.menu.review', defaultMessage: 'REVIEW' })} onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Review' })} active={activeStatus === 'Review'} data-test='menu_orders_review' />
            <Menu.Item name={formatMessage({ id: 'order.menu.credit', defaultMessage: 'CREDIT' })} onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Credit' })} active={activeStatus === 'Credit'} data-test='menu_orders_credit' />
            <Menu.Item name={formatMessage({ id: 'order.menu.completed', defaultMessage: 'COMPLETED' })} onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Completed' })} active={activeStatus === 'Completed'} data-test='menu_orders_completed' />
            <Menu.Item name={formatMessage({ id: 'order.menu.returned', defaultMessage: 'RETURNED' })} onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Returned' })} active={activeStatus === 'Returned'} data-test='menu_orders_returned' />
            <Menu.Item name={formatMessage({ id: 'order.menu.declined', defaultMessage: 'DECLINED' })} onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Declined' })} active={activeStatus === 'Declined'} data-test='menu_orders_declined' />
            <Menu.Menu position='right'>
              <Menu.Item name={formatMessage({ id: 'order.menu.filter', defaultMessage: 'Filter' })}><SubMenu filterType={filterPresets.ORDERS} /></Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
        <Container fluid style={{ padding: '20px 32px 0 32px' }} className='flex stretched'>
          <Header as='h1' size='medium'>
            {(activeStatus
              ? activeStatus.toUpperCase()
              : formatMessage({ id: 'order.menu.all', defaultMessage: 'ALL' }))} {`${ordersType.toUpperCase()} ${formatMessage({ id: 'order.orders', defaultMessage: '!ORDERS' })}`}
          </Header>
          <OrderFilter
            ordersType={ordersType.toLowerCase()}
            sortPath={this.state.sorting.sortPath}
            sortDirection={this.state.sorting.sortDirection}
            onApply={(payload) => this.handleFilterApply(payload)}
          />
          {isFetching ? <Spinner /> :

            <ProdexGrid tableName='orders_grid'
              columns={columns}
              {...datagrid.tableProps}
              loading={datagrid.loading}
              rows={this.getRows()}
              onSortingChange={(sorting) => sorting.sortPath && this.setState({ sorting })}
              rowActions={[
                { text: formatMessage({ id: 'orders.detail', defaultMessage: 'Detail' }), callback: (row) => router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`) }
              ]}
            /* COMMENTED #30916
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label' && targetTag !== 'i') {
                router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`)
              }
            }}*/
            />
          }
        </Container>
      </div>
    )
  }
}

export default injectIntl(Orders)

