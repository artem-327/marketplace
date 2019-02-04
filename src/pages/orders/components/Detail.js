import React, {Component} from 'react'
import * as OrdersHelper from '../../../helpers/Orders'

class Detail extends Component {

    componentWillMount() {
        this.props.loadDetail(this.props.match.params.id)
    }

    render() {
        const {detail, action, isDetailFetching} = this.props

        return (
            <div id="page">
                <h1 className='header left'>Sales Order {isDetailFetching ? 'Loading...' : '# '+detail.id}</h1>
                <ul className="order-statuses">
                    <li>
                        <label>Order Status</label>
                        <span>{OrdersHelper.getShippingStatus(detail.orderStatus)}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Shipping Status</label>
                        <span>{OrdersHelper.getShippingStatus(detail.shippingStatus)}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Review Status</label>
                        <span>{OrdersHelper.getShippingStatus(detail.reviewStatus)}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Credit Status</label>
                        <span>{OrdersHelper.getShippingStatus(detail.creditStatus)}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Return Status</label>
                        <span>{OrdersHelper.getShippingStatus(detail.returnStatus)}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Payment Status</label>
                        <span>{OrdersHelper.getShippingStatus(detail.paymentStatus)}</span>
                    </li>
                </ul>

                <div className="clearfix"></div>

                {action ? (
                    <form className='action-required'>
                        <h3>Action Required</h3>
                        <p>This order is in pending status. Please select “accept” to move forward with the order. If you press “reject” the order will be cancelled. </p>
                        <div>
                            <button type="button" className="button blue">Accept</button>
                            <button type="button" className="button grey">Decline</button>
                        </div>
                    </form>
                ) : ''}
            </div>
        )
    }
}

export default Detail
