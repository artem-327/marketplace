import React, {Component} from 'react'
import '../styles/orders.css'
import moment from "moment/moment"

class Orders extends Component {

    componentDidMount() {
        this.props.loadData()
    }

    render() {
        const {rows, isFetching} = this.props

        const headerInit = [
            {name: 'Order ID'},
            {name: 'Status'},
            {name: 'Order Date'},
            {name: 'Customer'},
            {name: 'Product Name'},
            {name: 'Order'},
            {name: 'Shipping'},
            {name: 'Review'},
            {name: 'Credit'},
            {name: 'Payment'},
            {name: 'B/L'},
            {name: 'SDS'},
            {name: 'CofA'},
            {name: 'Order Total'},
            {name: ''}
        ]

        return (
            <div>
                <h1 className='header'>Orders {isFetching ? 'Loading...' : ''}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Customer</th>
                            <th>Product Name</th>
                            <th>Order</th>
                            <th>Shipping</th>
                            <th>Review</th>
                            <th>Credit</th>
                            <th>Payment</th>
                            <th>B/L</th>
                            <th>SDS</th>
                            <th>CofA</th>
                            <th>Order Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {rows.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.status}</td>
                            <td>{moment(r.date).format('MM/DD/YYYY')}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{r.shippingStatus}</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td><i className="list unknown"></i></td>
                            <td><i className="list positive"></i></td>
                            <td><i className="list negative"></i></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Orders

