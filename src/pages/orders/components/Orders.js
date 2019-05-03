import React, {Component} from 'react'
import '../styles/orders.scss'
import Spinner from "../../../components/Spinner/Spinner"
import Filter from '../../../components/Filter'
import SubMenu from '../../../components/SubMenu'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Grid, Menu, Header, Table, Divider } from 'semantic-ui-react'

class Orders extends Component {

    componentDidMount() {
        this.props.loadData(this.props.endpointType)
    }

    loadData(endpointType, filterData) {
        //this.props.filterData = filterData
        this.props.loadData(endpointType, filterData)
    }

    handleScrollY() {
        let topPosition = document.querySelector('#datatable-wrapper > .scrollbar-container').scrollTop;
        let fixHeader = document.querySelectorAll('#datatable-wrapper th > .fix-header');
        for (let i = 0; i < fixHeader.length; i++) {
            fixHeader[i].style.top = topPosition + 'px';
        }
        let xScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-x');
        let yScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-y');
        xScrollbar.style.marginBottom = -topPosition + 'px';
        yScrollbar.style.marginTop = topPosition + 'px';
    }

    handleScrollX() {
        let leftPosition = document.querySelector('#datatable-wrapper > .scrollbar-container').scrollLeft;
        let xScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-x');
        let yScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-y');
        xScrollbar.style.marginLeft = leftPosition + 'px';
        yScrollbar.style.marginRight = -leftPosition + 'px';
    }

    renderFixHeader(headerText) {
        return (
          <>
            {headerText}<div class="fix-header">{headerText}</div>
          </>
        )
    }

    render() {
        const {endpointType, match, rows, isFetching, activeStatus, router} = this.props
        const {status} = this.props.filterData
        const query = router ? router.query : match.params
        let ordersType = query.type.charAt(0).toUpperCase() + query.type.slice(1)

        return (
            <div id="page">
                <Menu pointing secondary horizontal>
                  <Menu.Item name='ALL' onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'All'})} active={!activeStatus || activeStatus === 'All'} />
                  <Menu.Item name='PENDING' onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Pending'})} active={activeStatus === 'Pending'} />
                  <Menu.Item name='IN TRANSIT' onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'In Transit'})} active={activeStatus === 'In Transit'} />
                  <Menu.Item name='REVIEW' onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Review'})} active={activeStatus === 'Review'} />
                  <Menu.Item name='CREDIT' onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Credit'})} active={activeStatus === 'Credit'} />
                  <Menu.Item name='COMPLETED' onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Completed'})} active={activeStatus === 'Completed'} />
                  <Menu.Item name='RETURNED' onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Returned'})} active={activeStatus === 'Returned'} />
                  <Menu.Item name='DECLINED' onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Declined'})} active={activeStatus === 'Declined'} />
                  <Menu.Menu position='right'>
                    <Menu.Item name='Filter'><SubMenu /></Menu.Item>
                  </Menu.Menu>
                </Menu>
                <Header as='h1' size='medium'>{(activeStatus ? activeStatus.toUpperCase() : 'ALL') + ' ' + ordersType.toUpperCase() + ' ORDERS'}</Header>
                {false ? '' : (
                  <Filter orderId
                          orderDate
                          customer
                          product
                          orderStatus={{filterValue: activeStatus}}
                          filterFunc={(inputs) => this.props.loadData(endpointType, inputs)}
                          {...this.props}
                  />
                )}
                <Divider hidden />
                {isFetching ? <Spinner /> :
                    <div id="datatable-wrapper" className="data-table-wr orders">
                        <PerfectScrollbar onScrollY={this.handleScrollY} onScrollX={this.handleScrollX}>
                            <Table singleLine compact selectable basic='very'>
                                <Table.Header className='data-table-header'>
                                    <Table.Row>
                                      <Table.HeaderCell>{this.renderFixHeader('Order ID')}</Table.HeaderCell>
                                      <Table.HeaderCell>{this.renderFixHeader('Status')}</Table.HeaderCell>
                                      <Table.HeaderCell>{this.renderFixHeader('Order Date')}</Table.HeaderCell>
                                      <Table.HeaderCell>{ordersType === 'Sales' ? this.renderFixHeader('Customer') : this.renderFixHeader('Vendor')}</Table.HeaderCell>
                                      <Table.HeaderCell>{this.renderFixHeader('Product Name')}</Table.HeaderCell>
                                      <Table.HeaderCell>{this.renderFixHeader('Order')}</Table.HeaderCell>
                                      <Table.HeaderCell>{this.renderFixHeader('Shipping')}</Table.HeaderCell>
                                      <Table.HeaderCell>{this.renderFixHeader('Review')}</Table.HeaderCell>
                                      <Table.HeaderCell>{this.renderFixHeader('Credit')}</Table.HeaderCell>
                                      <Table.HeaderCell>{this.renderFixHeader('Payment')}</Table.HeaderCell>
                                      <Table.HeaderCell textAlign='center'>{this.renderFixHeader('B/L')}</Table.HeaderCell>
                                      <Table.HeaderCell textAlign='center'>{this.renderFixHeader('SDS')}</Table.HeaderCell>
                                      <Table.HeaderCell textAlign='center'>{this.renderFixHeader('CofA')}</Table.HeaderCell>
                                      <Table.HeaderCell textAlign='right'>{this.renderFixHeader('Order Total')}</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {rows.map(r => (
                                        <Table.Row key={r.id} onClick={() => {router.push(`/orders/${ordersType.toLowerCase()}/${r.id}`)}}>
                                            <Table.Cell>{r.id}</Table.Cell>
                                            <Table.Cell>{r.globalStatus}</Table.Cell>
                                            <Table.Cell>{r.date}</Table.Cell>
                                            <Table.Cell>{r.customerName}</Table.Cell>
                                            <Table.Cell>{r.productName}</Table.Cell>
                                            <Table.Cell>{r.orderStatus}</Table.Cell>
                                            <Table.Cell>{r.shippingStatus}</Table.Cell>
                                            <Table.Cell>{r.reviewStatus}</Table.Cell>
                                            <Table.Cell>{r.creditStatus}</Table.Cell>
                                            <Table.Cell>{r.paymentStatus}</Table.Cell>
                                            <Table.Cell textAlign='center'><i className="list unknown"></i></Table.Cell>
                                            <Table.Cell textAlign='center'><i className="list positive"></i></Table.Cell>
                                            <Table.Cell textAlign='center'><i className="list negative"></i></Table.Cell>
                                            <Table.Cell textAlign='right'>{r.orderTotal}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </PerfectScrollbar>
                    </div>
                }
            </div>
        )
    }
}

export default Orders

