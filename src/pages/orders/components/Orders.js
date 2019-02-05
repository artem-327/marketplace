import React, {Component} from 'react'
import '../styles/orders.css'

class Orders extends Component {

    componentDidMount() {
        let endpointType = this.props.match.params.type === 'sales' ? 'sale' : this.props.match.params.type
        this.props.loadData(endpointType)
    }

    render() {
        const {match, rows, isFetching} = this.props
        let ordersType = match.params.type.charAt(0).toUpperCase() + match.params.type.slice(1)

        return (
            <div id="page">
                <h1 className='header'>{ordersType} Orders {isFetching ? 'Loading...' : ''}</h1>
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
                            <td></td>
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
            </div>
        )
    }
}

export default Orders

