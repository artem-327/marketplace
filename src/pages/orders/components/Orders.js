import React, {Component} from 'react'
import '../styles/orders.css'
import Spinner from "../../../components/Spinner/Spinner"
import Filter from '../../../components/Filter'
import SubMenu from '../../../components/SubMenu'
import PerfectScrollbar from 'react-perfect-scrollbar'

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

    render() {
        const {endpointType, match, rows, isFetching, activeStatus, router: {query}} = this.props
        const {status} = this.props.filterData
        let ordersType = query.type.charAt(0).toUpperCase() + query.type.slice(1)

        return (
            <div id="page">
                <div className='top-toolbar'>
                    <ul className='quick-filter'>
                        <li value={endpointType} onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'All'})} className={!activeStatus || activeStatus === 'All' ? 'active' : ''}>ALL</li>
                        <li value={endpointType} onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Pending'})} className={activeStatus === 'Pending' ? 'active' : ''}>PENDING</li>
                        <li value={endpointType} onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'In Transit'})} className={activeStatus === 'In Transit' ? 'active' : ''}>IN TRANSIT</li>
                        <li value={endpointType} onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Review'})} className={activeStatus === 'Review' ? 'active' : ''}>REVIEW</li>
                        <li value={endpointType} onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Credit'})} className={activeStatus === 'Credit' ? 'active' : ''}>CREDIT</li>
                        <li value={endpointType} onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Completed'})} className={activeStatus === 'Completed' ? 'active' : ''}>COMPLETED</li>
                        <li value={endpointType} onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Returned'})} className={activeStatus === 'Returned' ? 'active' : ''}>RETURNED</li>
                        <li value={endpointType} onClick={() => this.loadData(endpointType, {...this.props.filterData, status: 'Declined'})} className={activeStatus === 'Declined' ? 'active' : ''}>DECLINED</li>
                    </ul>
                    <SubMenu/>
                </div>
                <div className='header-top clean'>
                    <h1 className='header inv-header'>{activeStatus ? activeStatus : 'All'} {ordersType} Orders</h1>
                </div>
                <Filter
                    orderId
                    orderDate
                    customer
                    product
                    orderStatus={{filterValue: activeStatus}}
                    filterFunc={(inputs) => this.props.loadData(endpointType, inputs)}
                    {...this.props}
                />
                {isFetching ? <Spinner /> :
                    <div id="datatable-wrapper" className="data-table-wr orders">
                        <PerfectScrollbar onScrollY={this.handleScrollY} onScrollX={this.handleScrollX}>
                            <table id="saleOrdersTable" className="data-table">
                                <thead>
                                    <tr>
                                        <th>Order ID<div className='fix-header'>Order ID</div></th>
                                        <th>Status<div className='fix-header'>Status</div></th>
                                        <th>Order Date<div className='fix-header'>Order Date</div></th>
                                        <th>{ordersType === 'Sales' ? 'Customer' : 'Vendor'}<div className='fix-header'>{ordersType === 'Sales' ? 'Customer' : 'Vendor'}</div></th>
                                        <th>Product Name<div className='fix-header'>Product Name</div></th>
                                        <th>Order<div className='fix-header'>Order</div></th>
                                        <th>Shipping<div className='fix-header'>Shipping</div></th>
                                        <th>Review<div className='fix-header'>Review</div></th>
                                        <th>Credit<div className='fix-header'>Credit</div></th>
                                        <th>Payment<div className='fix-header'>Payment</div></th>
                                        <th className="a-center">B/L<div className='fix-header'>B/L</div></th>
                                        <th className="a-center">SDS<div className='fix-header'>SDS</div></th>
                                        <th className="a-center">CofA<div className='fix-header'>CofA</div></th>
                                        <th className="a-right">Order Total<div className='fix-header'>Order Total</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {rows.map(r => (
                                    <tr key={r.id} onClick={() => {this.props.history.push(`/orders/${ordersType.toLowerCase()}/${r.id}`)}}>
                                        <td>{r.id}</td>
                                        <td>{r.globalStatus}</td>
                                        <td>{r.date}</td>
                                        <td>{r.customerName}</td>
                                        <td>{r.productName}</td>
                                        <td>{r.orderStatus}</td>
                                        <td>{r.shippingStatus}</td>
                                        <td>{r.reviewStatus}</td>
                                        <td>{r.creditStatus}</td>
                                        <td>{r.paymentStatus}</td>
                                        <td className="a-center"><i className="list unknown"></i></td>
                                        <td className="a-center"><i className="list positive"></i></td>
                                        <td className="a-center"><i className="list negative"></i></td>
                                        <td className="a-right">{r.orderTotal}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </PerfectScrollbar>
                    </div>
                }
            </div>
        )
    }
}

export default Orders

