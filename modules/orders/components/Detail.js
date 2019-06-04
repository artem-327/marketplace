import React, { Component } from 'react'
import '~/src/pages/inventory/addInventory/AddInventory.scss'
import Spinner from "~/src/components/Spinner/Spinner"
import { Grid, Segment, Accordion, Table, List, Label, Button, Icon, Divider, Header } from 'semantic-ui-react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from "styled-components"

const AccordionTitle = styled(Accordion.Title)`
  text-transform: uppercase;
  font-size: 1.14285714rem !important;
  line-height: 1.5;
  
  i.chevron {
   margin-right: 1rem;
   vertical-align: top;
  }
`

const GridData = styled(Grid)`
  padding-top: 1em !important;
  padding-bottom: 1em !important;
`

const GridDataColumn = styled(Grid.Column)`
  padding-top: 0.75em !important;
  padding-bottom: 0.75em !important;
  font-size: 1.14285714rem;
  line-height: 1.125;
  
  strong {
    padding-left: 0.4375em;
    padding-right: 0.4375em;
  }
`

class Detail extends Component {
  state = {
    activeIndexes: [
      true,
      true,
      false,
      false,
      false
    ]
  }

  constructor(props) {
    super(props)
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

  downloadOrder = async () => {
    let endpointType = this.props.router.query.type === 'sales' ? 'sale' : this.props.router.query.type
    let pdf = await this.props.downloadPdf(endpointType, this.props.order.id)

    const element = document.createElement("a")
    const file = new Blob([pdf.value.data], { type: 'application/pdf' })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    element.download = `${this.props.router.query.type}-order-${this.props.order.id}.pdf`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexes } = this.state

    activeIndexes[index] = activeIndexes[index] ? false : true

    this.setState({ activeIndexes })
  }

  render() {
    const { router, order, action, isDetailFetching } = this.props
    const { activeIndexes } = this.state
    let ordersType = router.query.type.charAt(0).toUpperCase() + router.query.type.slice(1)

    return (
      <div id="page" className='scrolling'>
        <PerfectScrollbar>
          <Divider hidden />
          <Grid verticalAlign='middle' columns='equal' style={{ padding: '0 32px' }}>
            <Grid.Column width={6}>
              <div className='header-top clean left detail-align'>
                <h1 className='header inv-header' style={{ marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '1.14285714em', fontWeight: '500' }}>{ordersType} Order {isDetailFetching ? '' : '# ' + order.id}</h1>
                <a onClick={() => this.downloadOrder()} style={{ fontSize: '1.14285714em', cursor: 'pointer' }}><Icon name='download' style={{ verticalAlign: 'top' }} color='blue' /> Download {order.orderType} Order</a>
              </div>
            </Grid.Column>
            <Grid.Column>
              <List divided relaxed horizontal size='large' floated='right' style={{ whiteSpace: 'nowrap' }}>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'>Order Status</List.Header>
                    <List.Description as='span'><Label circular empty color={order.orderStatus === 'Declined' || order.orderStatus === 'Rejected' ? 'red' : (order.orderStatus === 'Confirmed' ? 'green' : false)}></Label> {order.orderStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'>Shipping Status</List.Header>
                    <List.Description as='span'><Label circular empty color={order.shippingStatus !== 'N/A' ? 'blue' : false}></Label> {order.shippingStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'>Review Status</List.Header>
                    <List.Description as='span'><Label circular empty color={order.reviewStatus !== 'N/A' ? 'blue' : false}></Label> {order.reviewStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'>Credit Status</List.Header>
                    <List.Description as='span'><Label circular empty color={order.creditStatus !== 'N/A' ? 'blue' : false}></Label> {order.creditStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'>Return Status</List.Header>
                    <List.Description as='span'><Label circular empty color={order.returnStatus !== 'N/A' ? 'blue' : false}></Label> {order.returnStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'>Payment Status</List.Header>
                    <List.Description as='span'><Label circular empty color={order.paymentStatus !== 'N/A' ? 'blue' : false}></Label> {order.paymentStatus}</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
          {isDetailFetching ? <Spinner /> : (
            <>
              {action && (ordersType === 'Sales') ? /* This action is not prepared for Purchase Orders yet! */ (
                <Segment color='blue' style={{ marginLeft: '32px', marginRight: '32px' }}>
                  <Grid verticalAlign='middle' columns='equal'>
                    <Grid.Column width={13}>
                      <Header as='h3' style={{ margin: '0 0 0.3571429rem' }}>Action Required</Header>
                      This order is in pending status. Please select &quot;accept&quot; to move forward with the order. If you press &quot;reject&quot; the order will be cancelled.
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

              <Accordion defaultActiveIndex={[0, 1]} styled fluid style={{ width: 'calc(100% - 64px)', margin: '0 32px' }}>
                <AccordionTitle active={activeIndexes[0]} index={0} onClick={this.handleClick}>
                  <Icon name={'chevron ' + (activeIndexes[0] ? 'down' : 'up')} size='large' color={activeIndexes[0] ? 'blue' : 'black'} />
                  Order Info
                            </AccordionTitle>
                <Accordion.Content active={activeIndexes[0]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>{ordersType} Order</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.id}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{ordersType.charAt(0)}O Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.orderDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{ordersType.charAt(0)}O Confirmation Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.confirmationDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Order Acceptance Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.acceptanceDate}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>Seller Rejection Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.sellerRejectionDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Buyer Rejection Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.buyerRejectionDate}</GridDataColumn>
                          {ordersType === 'Purchase' ? (
                            <>
                              <GridDataColumn width={4}><strong>Created By</strong></GridDataColumn>
                              <GridDataColumn width={12}>{order.createdBy}</GridDataColumn>
                            </>
                          ) : ''}
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle active={activeIndexes[1]} index={1} onClick={this.handleClick}>
                  <Icon name={'chevron ' + (activeIndexes[1] ? 'down' : 'up')} size='large' color={activeIndexes[1] ? 'blue' : 'black'} />
                  Product Info
                            </AccordionTitle>
                <Accordion.Content active={activeIndexes[1]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>Chemical Name</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.chemicalName}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Product Name</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.productName}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Product Number</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.productCode}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Packaging</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.size}#{order.packaging}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Total PKG</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.totalPkg}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Quantity Ordered</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.quantityOrdered}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Unit</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.unit}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Unit Price</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.unitPrice}</GridDataColumn>

                          {ordersType === 'Sales' ? (
                            <>
                              <GridDataColumn width={4}><strong>Unit Cost</strong></GridDataColumn>
                              <GridDataColumn width={12}>{order.unitCost}</GridDataColumn>
                            </>
                          ) : ''}
                        </GridData>
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
                                    <Table.Cell textAlign='right'>{order.feesAmount}</Table.Cell>
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
                                    <Table.HeaderCell textAlign='right'><strong>{order.grossProfit}</strong></Table.HeaderCell>
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
                                      <Table.Cell textAlign='right'>{order.subtotal}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong>Freight</strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.freight}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong>Other</strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.other}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong>Delivery Cost</strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.deliveryCost}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong>Delivery Total</strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.deliveryTotal}</Table.Cell>
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

                <AccordionTitle active={activeIndexes[2]} index={2} onClick={this.handleClick}>
                  <Icon name={'chevron ' + (activeIndexes[2] ? 'down' : 'up')} size='large' color={activeIndexes[2] ? 'blue' : 'black'} />
                  Pick Up Info
                            </AccordionTitle>
                <Accordion.Content active={activeIndexes[2]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>Pick-Up Address</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.pickUpAddress}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>Shipping Contact</strong></GridDataColumn>
                          <GridDataColumn width={12}></GridDataColumn>
                          <GridDataColumn width={4}><strong>Contact Number</strong></GridDataColumn>
                          <GridDataColumn width={12}></GridDataColumn>
                          <GridDataColumn width={4}><strong>Contact E-Mail</strong></GridDataColumn>
                          <GridDataColumn width={12}></GridDataColumn>
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle active={activeIndexes[3]} index={3} onClick={this.handleClick}>
                  <Icon name={'chevron ' + (activeIndexes[3] ? 'down' : 'up')} size='large' color={activeIndexes[3] ? 'blue' : 'black'} />
                  Shipping
                            </AccordionTitle>
                <Accordion.Content active={activeIndexes[3]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>Shipping Status</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shippingStatus}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Ship To</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shipTo}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Ship To Address</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shipToAddress}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Ship Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shipDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Delivery Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.deliveryDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Return Ship Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.returnShipDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Return Delivery Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.returnDeliveryDate}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>Carrier</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.carrier}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Service</strong></GridDataColumn>
                          <GridDataColumn width={12}></GridDataColumn>
                          <GridDataColumn width={4}><strong>Pro Number</strong></GridDataColumn>
                          <GridDataColumn width={12}></GridDataColumn>
                          <GridDataColumn width={4}><strong>Incoterms</strong></GridDataColumn>
                          <GridDataColumn width={12}></GridDataColumn>
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle active={activeIndexes[4]} index={4} onClick={this.handleClick}>
                  <Icon name={'chevron ' + (activeIndexes[4] ? 'down' : 'up')} size='large' color={activeIndexes[4] ? 'blue' : 'black'} />
                  Payment / {order.paymentType}
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[4]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>Payment Status</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentStatus}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Payment Send Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentSendDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Payment Initiation Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentInitiationDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Payment Received Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentReceivedDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Refund Date</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.refundDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>Terms</strong></GridDataColumn>
                          <GridDataColumn width={12}></GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>{order.paymentType} Name</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentName}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{order.paymentType} Address</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentAddress}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{order.paymentType} Phone</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentPhone}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{order.paymentType} E-Mail</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentEmail}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{order.paymentType} Contact</strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentContact}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>
              </Accordion>
            </>
          )}
        </PerfectScrollbar>
      </div>
    )
  }
}

export default Detail
