import React, {Component} from 'react'
import CollapsiblePanel from '../../../components/CollapsiblePanel'
import '../../../pages/inventory/addInventory/AddInventory.scss'
import Spinner from "../../../components/Spinner/Spinner"
import { Grid, Segment, Accordion, Table, List, Label, Button, Icon, Divider } from 'semantic-ui-react'

class Detail extends Component {
    state = { activeIndexes: [
            true,
            true,
            false,
            false,
            false
        ]}

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let endpointType = this.props.router.query.type === 'sales' ? 'sale' : this.props.router.query.type
        this.props.loadDetail(endpointType, this.props.router.query.id)
    }

    componentDidUpdate() {
        let endpointType = this.props.router.query.type === 'sales' ? 'sale' : this.props.router.query.type

        if (this.props.reloadPage)
            this.props.loadDetail(endpointType, this.props.order.id)

        let dataCells = document.querySelectorAll('.data-list dd')
        for (let i = 0; i < dataCells.length; i++) {
            if (dataCells[i].textContent === 'N/A') {
                dataCells[i].className = 'na'
            } else {
                dataCells[i].className = ''
            }
        }
    }

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndexes} = this.state

        activeIndexes[index] = activeIndexes[index] ? false : true

        this.setState({ activeIndexes })
    }

    render() {
        const {router, order, action, isDetailFetching} = this.props
        const {activeIndexes} = this.state
        let ordersType = router.query.type.charAt(0).toUpperCase() + router.query.type.slice(1)

        return (
            <div id="page">
                <Divider hidden />
                <Grid verticalAlign='middle' columns='equal'>
                    <Grid.Column width={6}>
                        <div className='header-top clean left detail-align'>
                            <h1 className='header inv-header'>{ordersType} Order {isDetailFetching ? '' : '# '+order.id}</h1>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <List divided relaxed horizontal size='large' floated='right' style={{whiteSpace: 'nowrap'}}>
                            <List.Item>
                                <List.Content>
                                    <List.Header as='label'>Order Status</List.Header>
                                    <List.Description as='span'><Label color='red'>{order.orderStatus}</Label></List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header as='label'>Shipping Status</List.Header>
                                    <List.Description as='span'>{order.shippingStatus}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header as='label'>Review Status</List.Header>
                                    <List.Description as='span'>{order.reviewStatus}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header as='label'>Credit Status</List.Header>
                                    <List.Description as='span'>{order.creditStatus}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header as='label'>Return Status</List.Header>
                                    <List.Description as='span'>{order.returnStatus}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header as='label'>Payment Status</List.Header>
                                    <List.Description as='span'>{order.paymentStatus}</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
                {isDetailFetching ? <Spinner /> : (
                    <>
                        {action && (ordersType === 'Sales') ? /* This action is not prepared for Purchase Orders yet! */ (
                            <Segment color='blue'>
                                <Grid verticalAlign='middle' columns='equal'>
                                    <Grid.Column width={13}>
                                        <h3>Action Required</h3>
                                        <p>This order is in pending status. Please select &quot;accept&quot; to move forward with the order. If you press &quot;reject&quot; the order will be cancelled. </p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Grid verticalAlign='middle' columns='equal'>
                                            <Grid.Column>
                                                <Button primary fluid size='large' value={order.id} onClick={() => this.props.confirmOrder(order.id)}>Accept</Button>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Button basic fluid size='large' value={order.id} onClick={() => this.props.rejectOrder(order.id)}>Decline</Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        ) : ''}

                        <Divider hidden />

                        <Accordion defaultActiveIndex={[0,1]} styled fluid>
                            <Accordion.Title active={activeIndexes[0]} index={0} onClick={this.handleClick}>
                                <Icon name={'chevron ' + (activeIndexes[0] ? 'down' : 'up')}  size='large' color={activeIndexes[0] ? 'blue' : 'black'}/>
                                Order Info
                            </Accordion.Title>
                            <Accordion.Content active={activeIndexes[0]}>
                                <Grid divided='horizontally'>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>{ordersType} Order</strong></dt>
                                                <dd>{order.id}</dd>
                                                <dt><strong>{ordersType.charAt(0)}O Date</strong></dt>
                                                <dd>{order.orderDate}</dd>
                                                <dt><strong>{ordersType.charAt(0)}O Confirmation Date</strong></dt>
                                                <dd>{order.confirmationDate}</dd>
                                                <dt><strong>Order Acceptance Date</strong></dt>
                                                <dd>{order.acceptanceDate}</dd>
                                            </dl>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>Seller Rejection Date</strong></dt>
                                                <dd>{order.sellerRejectionDate}</dd>
                                                <dt><strong>Buyer Rejection Date</strong></dt>
                                                <dd>{order.buyerRejectionDate}</dd>
                                                {ordersType === 'Purchase' ? (
                                                    <>
                                                        <dt>Created By</dt>
                                                        <dd></dd>
                                                    </>
                                                ) : ''}
                                            </dl>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Accordion.Content>

                            <Accordion.Title active={activeIndexes[1]} index={1} onClick={this.handleClick}>
                                <Icon name={'chevron ' + (activeIndexes[1] ? 'down' : 'up')}  size='large' color={activeIndexes[1] ? 'blue' : 'black'}/>
                                Product Info
                            </Accordion.Title>
                            <Accordion.Content active={activeIndexes[1]}>
                                <Grid divided='horizontally'>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>Chemical Name</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Product Name</strong></dt>
                                                <dd>{order.productName}</dd>
                                                <dt><strong>Product Number</strong></dt>
                                                <dd>{order.productCode}</dd>
                                                <dt><strong>Packaging</strong></dt>
                                                <dd>{order.size}#{order.packaging}</dd>
                                                <dt><strong>Total PKG</strong></dt>
                                                <dd>{order.totalPkg}</dd>
                                                <dt><strong>Quantity Ordered</strong></dt>
                                                <dd>{order.quantityOrdered}</dd>
                                                <dt><strong>Unit</strong></dt>
                                                <dd>{order.unit}</dd>
                                                <dt><strong>Unit Price</strong></dt>
                                                <dd></dd>

                                                {ordersType === 'Sales' ? (
                                                    <>
                                                        <dt><strong>Unit Cost</strong></dt>
                                                        <dd></dd>
                                                    </>
                                                ) : ''}
                                            </dl>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <div className='left'>
                                                {ordersType === 'Sales' ? (
                                                    <>
                                                        <Table basic='very' collapsing singleLine className='order-total'>
                                                            <Table.Header>
                                                                <Table.Row>
                                                                    <Table.HeaderCell colSpan="2"><strong>Order Total</strong></Table.HeaderCell>
                                                                </Table.Row>
                                                            </Table.Header>
                                                            <Table.Body>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>Amount</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'>{order.amount}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>Echo Fees ({order.feesPercent}%)</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'></Table.Cell>
                                                                </Table.Row>
                                                            </Table.Body>
                                                            <Table.Footer>
                                                                <Table.Row>
                                                                    <Table.HeaderCell><strong>Total</strong></Table.HeaderCell>
                                                                    <Table.HeaderCell textAlign='right'><strong>{order.total}</strong></Table.HeaderCell>
                                                                </Table.Row>
                                                            </Table.Footer>
                                                        </Table>

                                                        <Divider hidden />

                                                        <Table basic='very' collapsing singleLine className='order-total'>
                                                            <Table.Body>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>COGS</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'></Table.Cell>
                                                                </Table.Row>
                                                            </Table.Body>
                                                            <Table.Footer>
                                                                <Table.Row>
                                                                    <Table.HeaderCell><strong>Gross Profit</strong></Table.HeaderCell>
                                                                    <Table.HeaderCell textAlign='right'><strong></strong></Table.HeaderCell>
                                                                </Table.Row>
                                                            </Table.Footer>
                                                        </Table>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Table basic='very' collapsing singleLine className='order-total'>
                                                            <Table.Header>
                                                                <Table.Row>
                                                                    <Table.HeaderCell colSpan="2"><strong>Order Total</strong></Table.HeaderCell>
                                                                </Table.Row>
                                                            </Table.Header>
                                                            <Table.Body>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>Amount</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'>{order.amount}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>Subtotal</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'></Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>Freight</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'></Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>Other</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'></Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>Delivery Cost</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'></Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell><strong>Delivery Total</strong></Table.Cell>
                                                                    <Table.Cell textAlign='right'></Table.Cell>
                                                                </Table.Row>
                                                            </Table.Body>
                                                            <Table.Footer>
                                                                <Table.Row>
                                                                    <Table.HeaderCell><strong>Total</strong></Table.HeaderCell>
                                                                    <Table.HeaderCell textAlign='right'><strong>{order.total}</strong></Table.HeaderCell>
                                                                </Table.Row>
                                                            </Table.Footer>
                                                        </Table>
                                                    </>
                                                )}
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Accordion.Content>

                            <Accordion.Title active={activeIndexes[2]} index={2} onClick={this.handleClick}>
                                <Icon name={'chevron ' + (activeIndexes[2] ? 'down' : 'up')}  size='large' color={activeIndexes[2] ? 'blue' : 'black'}/>
                                Pick Up Info
                            </Accordion.Title>
                            <Accordion.Content active={activeIndexes[2]}>
                                <Grid divided='horizontally'>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>Pick-Up Address</strong></dt>
                                                <dd></dd>
                                            </dl>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>Shipping Contact</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Contact Number</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Contact E-Mail</strong></dt>
                                                <dd></dd>
                                            </dl>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Accordion.Content>

                            <Accordion.Title active={activeIndexes[3]} index={3} onClick={this.handleClick}>
                                <Icon name={'chevron ' + (activeIndexes[3] ? 'down' : 'up')}  size='large' color={activeIndexes[3] ? 'blue' : 'black'}/>
                                Shipping
                            </Accordion.Title>
                            <Accordion.Content active={activeIndexes[3]}>
                                <Grid divided='horizontally'>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>Shipping Status</strong></dt>
                                                <dd>{order.shippingStatus}</dd>
                                                <dt><strong>Ship To</strong></dt>
                                                <dd>{order.shipTo}</dd>
                                                <dt><strong>Ship To Address</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Ship Date</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Delivery Date</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Return Ship Date</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Return Delivery Date</strong></dt>
                                                <dd></dd>
                                            </dl>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>Carrier</strong></dt>
                                                <dd>{order.carrier}</dd>
                                                <dt><strong>Service</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Pro Number</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Incoterms</strong></dt>
                                                <dd></dd>
                                            </dl>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Accordion.Content>

                            <Accordion.Title active={activeIndexes[4]} index={4} onClick={this.handleClick}>
                                <Icon name={'chevron ' + (activeIndexes[4] ? 'down' : 'up')}  size='large' color={activeIndexes[4] ? 'blue' : 'black'}/>
                                Payment / Customer
                            </Accordion.Title>
                            <Accordion.Content active={activeIndexes[4]}>
                                <Grid divided='horizontally'>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>Payment Status</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Payment Send Date</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Payment Initiation Date</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Payment Received Date</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Refund Date</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Terms</strong></dt>
                                                <dd></dd>
                                            </dl>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <dl className='data-list'>
                                                <dt><strong>Vendor Name</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Vendor Address</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Vendor Phone</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Vendor E-Mail</strong></dt>
                                                <dd></dd>
                                                <dt><strong>Vendor Contact</strong></dt>
                                                <dd></dd>
                                            </dl>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Accordion.Content>
                        </Accordion>
                    </>
                )}
            </div>
        )
    }
}

export default Detail
