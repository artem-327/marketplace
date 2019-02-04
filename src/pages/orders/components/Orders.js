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
                <table id="saleOrdersTable">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Customer</th>
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
                            <td>{moment(r.date).format('MM/DD/YYYY')}</td>
                            <td></td>
                            <td></td>
                            <td>{r.orderStatus}</td>
                            <td>{r.shippingStatus}</td>
                            <td>{r.reviewStatus}</td>
                            <td>{r.creditStatus}</td>
                            <td>{r.paymentStatus}</td>
                            <td className="a-center"><i className="list unknown"></i></td>
                            <td className="a-center"><i className="list positive"></i></td>
                            <td className="a-center"><i className="list negative"></i></td>
                            <td className="a-right"></td>
                            <td className="a-right"><button type="button" className="button light-blue smallest" onClick={() => {this.props.history.push(`/orders/${r.id}`)}}>View</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Orders

