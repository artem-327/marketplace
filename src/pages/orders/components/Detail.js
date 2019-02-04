import React, {Component} from 'react'
import CollapsiblePanel from '../../../components/CollapsiblePanel'
import '../../../pages/inventory/addInventory/AddInventory.css'

class Detail extends Component {

    componentWillMount() {
        this.props.loadDetail(this.props.match.params.id)
    }

    render() {
        const {order, action, isDetailFetching} = this.props

        return (
            <div id="page">
                <h1 className='header left'>Sales Order {isDetailFetching ? 'Loading...' : '# '+order.id}</h1>
                <ul className="order-statuses">
                    <li>
                        <label>Order Status</label>
                        <span>{order.orderStatus}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Shipping Status</label>
                        <span>{order.shippingStatus}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Review Status</label>
                        <span>{order.reviewStatus}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Credit Status</label>
                        <span>{order.creditStatus}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Return Status</label>
                        <span>{order.returnStatus}</span>
                    </li>
                    <li className="separator"></li>
                    <li>
                        <label>Payment Status</label>
                        <span>{order.paymentStatus}</span>
                    </li>
                </ul>

                <div className="clearfix"></div>

                {action ? (
                    <form className='action-required'>
                        <h3>Action Required</h3>
                        <p>This order is in pending status. Please select &quot;accept&quot; to move forward with the order. If you press &quot;reject&quot; the order will be cancelled. </p>
                        <div className="buttons-wrapper">
                            <button type="button" className="button blue">Accept</button>
                            <button type="button" className="button grey">Decline</button>
                        </div>
                    </form>
                ) : ''}

                <CollapsiblePanel header="Order Info">
                    <div className='row'>
                        <div className='col-md-6'>
                            <dl className='data-list'>
                                <dt>Sales Order</dt>
                                <dd>{order.id}</dd>
                                <dt>SO Date</dt>
                                <dd>{order.orderDate}</dd>
                                <dt>SO Confirmation Date</dt>
                                <dd>{order.confirmationDate}</dd>
                                <dt>Order Acceptance Date</dt>
                                <dd>{order.acceptanceDate}</dd>
                            </dl>
                        </div>
                        <div className='col-md-6 border-left'>
                            <dl className='data-list'>
                                <dt>Seller Rejection Date</dt>
                                <dd>{order.sellerRejectionDate}</dd>
                                <dt>Buyer Rejection Date</dt>
                                <dd>{order.buyerRejectionDate}</dd>
                            </dl>
                        </div>
                    </div>
                </CollapsiblePanel>

                <CollapsiblePanel header="Product Info">
                    <dl className='data-list'>
                        <dt>Chemical Name</dt>
                        <dd></dd>
                        <dt>Product Name</dt>
                        <dd>{order.productName}</dd>
                        <dt>Product Number</dt>
                        <dd>{order.productNumber}</dd>
                        <dt>Packaging</dt>
                        <dd>{order.size}#{order.packaging}</dd>
                        <dt>Total PKG</dt>
                        <dd>{order.totalPkg}</dd>
                        <dt>Quantity Ordered</dt>
                        <dd>{order.quantityOrdered}</dd>
                        <dt>Unit</dt>
                        <dd>{order.unit}</dd>
                        <dt>Unit Price</dt>
                        <dd></dd>
                        <dt>Unit Cost</dt>
                        <dd></dd>
                    </dl>
                </CollapsiblePanel>

                <CollapsiblePanel header="Pick Up Info" open={false}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <dl className='data-list'>
                                <dt>Pick-Up Address</dt>
                                <dd></dd>
                            </dl>
                        </div>
                        <div className='col-md-6 border-left'>
                            <dl className='data-list'>
                                <dt>Shipping Contact</dt>
                                <dd></dd>
                                <dt>Contact Number</dt>
                                <dd></dd>
                                <dt>Contact E-Mail</dt>
                                <dd></dd>
                            </dl>
                        </div>
                    </div>
                </CollapsiblePanel>

                <CollapsiblePanel header="Shipping" open={false}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <dl className='data-list'>
                                <dt>Shipping Status</dt>
                                <dd>{order.shippingStatus}</dd>
                                <dt>Ship To</dt>
                                <dd>{order.shipTo}</dd>
                                <dt>Ship To Address</dt>
                                <dd></dd>
                                <dt>Ship Date</dt>
                                <dd></dd>
                                <dt>Delivery Date</dt>
                                <dd></dd>
                                <dt>Return Ship Date</dt>
                                <dd></dd>
                                <dt>Return Delivery Date</dt>
                                <dd></dd>
                            </dl>
                        </div>
                        <div className='col-md-6 border-left'>
                            <dl className='data-list'>
                                <dt>Carrier</dt>
                                <dd>{order.carrier}</dd>
                                <dt>Service</dt>
                                <dd></dd>
                                <dt>Pro Number</dt>
                                <dd></dd>
                                <dt>Incoterms</dt>
                                <dd></dd>
                            </dl>
                        </div>
                    </div>
                </CollapsiblePanel>

                <CollapsiblePanel header="Payment / Customer" open={false}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <dl className='data-list'>
                                <dt>Payment Status</dt>
                                <dd></dd>
                                <dt>Payment Send Date</dt>
                                <dd></dd>
                                <dt>Payment Initiation Date</dt>
                                <dd></dd>
                                <dt>Payment Received Date</dt>
                                <dd></dd>
                                <dt>Refund Date</dt>
                                <dd></dd>
                                <dt>Terms</dt>
                                <dd></dd>
                            </dl>
                        </div>
                        <div className='col-md-6 border-left'>
                            <dl className='data-list'>
                                <dt>Vendor Name</dt>
                                <dd></dd>
                                <dt>Vendor Address</dt>
                                <dd></dd>
                                <dt>Vendor Phone</dt>
                                <dd></dd>
                                <dt>Vendor E-Mail</dt>
                                <dd></dd>
                                <dt>Vendor Contact</dt>
                                <dd></dd>
                            </dl>
                        </div>
                    </div>
                </CollapsiblePanel>
            </div>
        )
    }
}

export default Detail
