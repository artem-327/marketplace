import React, {Component} from 'react'
import '../styles/orders.css'
import Spinner from "../../../components/Spinner/Spinner"

class Orders extends Component {

    componentDidMount() {
        let endpointType = this.props.match.params.type === 'sales' ? 'sale' : this.props.match.params.type
        this.props.loadData(endpointType)
    }

    render() {
        const {match, rows, isFetching, activeStatus} = this.props
        let ordersType = match.params.type.charAt(0).toUpperCase() + match.params.type.slice(1)
        let endpointType = match.params.type === 'sales' ? 'sale' : match.params.type

        // TODO: generate quick-filter with array
        let quickFilter = ['All', 'Pending', 'In Transit', 'Review', 'Credit', 'Completed', 'Returned', 'Declined'];

        return (
            <div id="page">
                <div className='top-toolbar'>
                    <ul className='quick-filter'>
                        <li value={endpointType} onClick={() => this.props.loadData(endpointType)} className={activeStatus === null ? 'active' : ''}>ALL</li>
                        <li value={endpointType} onClick={() => this.props.loadData(endpointType, 'Pending')} className={activeStatus === 'Pending' ? 'active' : ''}>PENDING</li>
                        <li value={endpointType} onClick={() => this.props.loadData(endpointType, 'In Transit')} className={activeStatus === 'In Transit' ? 'active' : ''}>IN TRANSIT</li>
                        <li value={endpointType} onClick={() => this.props.loadData(endpointType, 'Review')} className={activeStatus === 'Review' ? 'active' : ''}>REVIEW</li>
                        <li value={endpointType} onClick={() => this.props.loadData(endpointType, 'Credit')} className={activeStatus === 'Credit' ? 'active' : ''}>CREDIT</li>
                        <li value={endpointType} onClick={() => this.props.loadData(endpointType, 'Completed')} className={activeStatus === 'Completed' ? 'active' : ''}>COMPLETED</li>
                        <li value={endpointType} onClick={() => this.props.loadData(endpointType, 'Returned')} className={activeStatus === 'Returned' ? 'active' : ''}>RETURNED</li>
                        <li value={endpointType} onClick={() => this.props.loadData(endpointType, 'Declined')} className={activeStatus === 'Declined' ? 'active' : ''}>DECLINED</li>
                    </ul>
                </div>
                <div className='header-top clean'>
                    <h1 className='header inv-header'>All {ordersType} Orders</h1>
                </div>
                {isFetching ? <Spinner /> :
                    <table id="saleOrdersTable">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Order Date</th>
                                <th>{ordersType === 'Sales' ? 'Customer' : 'Vendor'}</th>
                                <th>Product Name</th>
                                <th>Order</th>
                                <th>Shipping</th>
                                <th>Review</th>
                                <th>Credit</th>
                                <th>Payment</th>
                                <th className="a-center">B/L</th>
                                <th className="a-center">SDS</th>
                                <th className="a-center">CofA</th>
                                <th className="a-right">Order Total</th>
                                <th className="a-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {rows.map(r => (
                            <tr key={r.id}>
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
                                <td className="a-right"><button type="button" className="button light-blue smallest" onClick={() => {this.props.history.push(`/orders/${ordersType.toLowerCase()}/${r.id}`)}}>View</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default Orders

