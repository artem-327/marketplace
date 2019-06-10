import React, { Component } from 'react'
// import '../styles/orders.scss'
import Spinner from "~/src/components/Spinner/Spinner"
import Filter from '~/src/components/Filter'
import SubMenu from '~/src/components/SubMenu'
import { Menu, Header, Container, Icon } from 'semantic-ui-react'
import styled from "styled-components"
import ProdexGrid from '~/components/table'
import { actions } from 'react-redux-form'

class Orders extends Component {
  state = {
    columns: [
      { name: 'id', title: 'Order ID', width: 120 },
      { name: 'globalStatus', title: 'Status', width: 120 },
      { name: 'date', title: 'Order Date', width: 120 },
      { name: 'customerName', title: 'Vendor', width: 120 },
      { name: 'productName', title: 'Product Name', width: 160 },
      { name: 'orderStatus', title: 'Order', width: 120 },
      { name: 'shippingStatus', title: 'Shipping', width: 120 },
      { name: 'reviewStatus', title: 'Review', width: 120 },
      { name: 'creditStatus', title: 'Credit', width: 120 },
      { name: 'paymentStatus', title: 'Payment', width: 120 },
      { name: 'bl', title: 'B/L', width: 80 },
      { name: 'sds', title: 'SDS', width: 80 },
      { name: 'cofA', title: 'C of A', width: 80 },
      { name: 'orderTotal', title: 'Order Total', width: 160 }
    ]
  }

  componentDidMount() {
    this.props.loadData(this.props.endpointType)
  }

  loadData(endpointType, filterData) {
    this.props.dispatch(actions.change('forms.filter.status', filterData.status))
    this.props.loadData(endpointType, filterData)
  }

  getRows = () => {
    return this.props.rows.map(row => {
      return {
        ...row,
        bl: <Icon name="file" className='unknown' />, // unknown / positive / negative
        sds: <Icon name="file" className='unknown' />,
        cofA: <Icon name="file" className='unknown' />
      }
    })
  }


  render() {
    const { endpointType, match, rows, isFetching, activeStatus, router } = this.props
    const { status } = this.props.filterData
    const { columns } = this.state
    const query = router ? router.query : match.params
    let ordersType = query.type.charAt(0).toUpperCase() + query.type.slice(1)

    return (
      <div id="page" className='flex stretched scrolling'>
        <Container fluid style={{ padding: '0 32px' }}>
          <Menu pointing secondary horizontal>
            <Menu.Item name='ALL' onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'All' })} active={!activeStatus || activeStatus === 'All'} />
            <Menu.Item name='PENDING' onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Pending' })} active={activeStatus === 'Pending'} />
            <Menu.Item name='IN TRANSIT' onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'In Transit' })} active={activeStatus === 'In Transit'} />
            <Menu.Item name='REVIEW' onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Review' })} active={activeStatus === 'Review'} />
            <Menu.Item name='CREDIT' onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Credit' })} active={activeStatus === 'Credit'} />
            <Menu.Item name='COMPLETED' onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Completed' })} active={activeStatus === 'Completed'} />
            <Menu.Item name='RETURNED' onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Returned' })} active={activeStatus === 'Returned'} />
            <Menu.Item name='DECLINED' onClick={() => this.loadData(endpointType, { ...this.props.filterData, status: 'Declined' })} active={activeStatus === 'Declined'} />
            <Menu.Menu position='right'>
              <Menu.Item name='Filter'><SubMenu /></Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
        <Container fluid style={{ padding: '20px 32px 0 32px' }} className="flex stretched">
          <Header as='h1' size='medium'>{(activeStatus ? activeStatus.toUpperCase() : 'ALL') + ' ' + ordersType.toUpperCase() + ' ORDERS'}</Header>
          <Filter orderId
            orderDate
            customer
            product
            orderStatus={{ filterValue: activeStatus }}
            filterFunc={(inputs) => this.props.loadData(endpointType, inputs)}
            savingFilters={false}
            {...this.props}
          />
          {isFetching ? <Spinner /> :

            <ProdexGrid tableName="orders_grid"
              columns={columns}
              rows={this.getRows()}
              rowActions={[
                { text: 'Detail', callback: (row) => router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`) }
              ]}
              onRowClick={(e, row) => {
                const targetTag = e.target.tagName.toLowerCase()
                if (targetTag !== 'input' && targetTag !== 'label' && targetTag !== 'i') {
                  router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`)
                }
              }}
            />
          }
        </Container>
      </div>
    )
  }
}

export default Orders

