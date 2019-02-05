import React, {Component} from 'react'
import CollapsiblePanel from '../../../components/CollapsiblePanel'
import '../../../pages/inventory/addInventory/AddInventory.css'

class Detail extends Component {

    componentDidMount() {
        let endpointType = this.props.match.params.type === 'sales' ? 'sale' : this.props.match.params.type
        this.props.loadDetail(endpointType, this.props.match.params.id)
    }

    componentDidUpdate() {
        if (this.props.reloadPage)
            this.props.loadDetail(this.props.order.id)

        let dataCells = document.querySelectorAll('.data-list dd')
        for (let i = 0; i < dataCells.length; i++) {
            if (dataCells[i].textContent === 'N/A') {
                dataCells[i].className = 'na'
            } else {
                dataCells[i].className = ''
            }
        }
    }

    render() {
        const {match, order, action, isDetailFetching} = this.props
        let ordersType = match.params.type.charAt(0).toUpperCase() + match.params.type.slice(1)

        return (
            <div id="page">
                <h1 className='header left'>{ordersType} Order {isDetailFetching ? 'Loading...' : '# '+order.id}</h1>
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

                {action && (ordersType === 'Sales') ? /* This action is not prepared for Purchase Orders yet! */ (
                    <form className='action-required'>
                        <h3>Action Required</h3>
                        <p>This order is in pending status. Please select &quot;accept&quot; to move forward with the order. If you press &quot;reject&quot; the order will be cancelled. </p>
                        <div className="buttons-wrapper">
                            <button type="button" className="button blue" value={order.id} onClick={() => this.props.confirmOrder(order.id)}>Accept</button>
                            <button type="button" className="button grey">Decline</button>
                        </div>
                    </form>
                ) : ''}

                <CollapsiblePanel header="Order Info">
                    <div className='row order-space'>
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
                                {ordersType === 'Purchase' ? (
                                    <>
                                        <dt>Created By</dt>
                                        <dd></dd>
                                    </>
                                ) : ''}
                            </dl>
                        </div>
                    </div>
                </CollapsiblePanel>

                <CollapsiblePanel header="Product Info">
                    <div className='row order-space'>
                        <div className='col-md-6'>
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

                                {ordersType === 'Sales' ? (
                                    <>
                                        <dt>Unit Cost</dt>
                                        <dd></dd>
                                    </>
                                ) : ''}
                            </dl>
                        </div>
                        <div className='col-md-6 border-left'>
                            <div className='left'>
                                {ordersType === 'Sales' ? (
                                    <>
                                        <table className='order-total'>
                                            <thead>
                                                <tr>
                                                    <th colSpan="2">Order Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Amount</th>
                                                    <td>{order.amount}</td>
                                                </tr>
                                                <tr>
                                                    <th>Echo Fees ({order.feesPercent}%)</th>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Total</th>
                                                    <td>{order.total}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <table className='order-total'>
                                            <tbody>
                                                <tr>
                                                    <th>COGS</th>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Gross Profit</th>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </>
                                ) : (
                                  <>
                                      <table className='order-total'>
                                          <thead>
                                              <tr>
                                                  <th colSpan="2">Order Total</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr>
                                                  <th>Amount</th>
                                                  <td>{order.amount}</td>
                                              </tr>
                                              <tr>
                                                  <th>Subtotal</th>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <th>Freight</th>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <th>Other</th>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <th>Delivery Cost</th>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <th>Delivery Total</th>
                                                  <td></td>
                                              </tr>
                                          </tbody>
                                          <tfoot>
                                              <tr>
                                                  <th>Total</th>
                                                  <td>{order.total}</td>
                                              </tr>
                                          </tfoot>
                                      </table>
                                  </>
                                )}
                            </div>
                        </div>
                    </div>
                </CollapsiblePanel>

                <CollapsiblePanel header="Pick Up Info" open={false}>
                    <div className='row order-space'>
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
                    <div className='row order-space'>
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
                    <div className='row order-space'>
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
