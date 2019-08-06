import React, { Component } from 'react'
import '~/src/pages/inventory/addInventory/AddInventory.scss'
import Spinner from '~/src/components/Spinner/Spinner'
import { Grid, Segment, Accordion, Table, List, Label, Button, Icon, Divider, Header } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'

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

    const element = document.createElement('a')
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
      <div id='page' className='scrolling'>
        <PerfectScrollbar>
          <Divider hidden />
          <Grid verticalAlign='middle' columns='equal' style={{ padding: '0 32px' }}>
            <Grid.Column width={6}>
              <div className='header-top clean left detail-align'>
                <Header as='h1' className='header inv-header' style={{ marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '1.14285714em', fontWeight: '500' }}>{ordersType}
                  <FormattedMessage id='order' defaultMessage='Order' /> {isDetailFetching ? '' : '# ' + order.id}</Header>
                <a onClick={() => this.downloadOrder()} style={{ fontSize: '1.14285714em', cursor: 'pointer' }} data-test='orders_detail_download_order'><Icon name='download' style={{ verticalAlign: 'top' }} color='blue' />
                  <FormattedMessage id='order.downloadOrder' defaultMessage={`Download ${order.orderType} Order`} values={{ orderType: order.orderType }} />
                </a>
              </div>
            </Grid.Column>
            <Grid.Column>
              <List divided relaxed horizontal size='large' floated='right' style={{ whiteSpace: 'nowrap' }}>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'>
                      <FormattedMessage id='order.orderStatus' defaultMessage='Order Status' />
                    </List.Header>
                    <List.Description as='span'>
                      <Label circular empty color={order.orderStatus === 'Declined' || order.orderStatus === 'Rejected' ? 'red' : (order.orderStatus === 'Confirmed' ? 'green' : false)}></Label> {order.orderStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'><FormattedMessage id='order.shippingStatus' defaultMessage='Shipping Status' /></List.Header>
                    <List.Description as='span'><Label circular empty color={order.shippingStatus !== 'N/A' ? 'blue' : false}></Label> {order.shippingStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'><FormattedMessage id='order.reviewStatus' defaultMessage='Review Status' /></List.Header>
                    <List.Description as='span'><Label circular empty color={order.reviewStatus !== 'N/A' ? 'blue' : false}></Label> {order.reviewStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'><FormattedMessage id='order.creditStatus' defaultMessage='Credit Status' /></List.Header>
                    <List.Description as='span'><Label circular empty color={order.creditStatus !== 'N/A' ? 'blue' : false}></Label> {order.creditStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'><FormattedMessage id='order.returnStatus' defaultMessage='Return Status' /></List.Header>
                    <List.Description as='span'><Label circular empty color={order.returnStatus !== 'N/A' ? 'blue' : false}></Label> {order.returnStatus}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'><FormattedMessage id='order.paymentStatus' defaultMessage='Payment Status' /></List.Header>
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
                      <Header as='h3' style={{ margin: '0 0 0.3571429rem' }}>
                        <FormattedMessage id='order.actionRequired' defaultMessage='Action Required' />
                      </Header>
                      <FormattedMessage id='order.confirm.description' defaultMessage='This order is in pending status. Please select accept to move forward with the order. If you press reject the order will be cancelled.' />
                    </Grid.Column>
                    <Grid.Column>
                      <Grid verticalAlign='middle' columns='equal'>
                        <Grid.Column>
                          <Button primary fluid size='large' value={order.id} onClick={() => this.props.confirmOrder(order.id)} data-test='orders_detail_accept_btn' >
                            <FormattedMessage id='global.accept' defaultMessage='Accept' />
                          </Button>
                        </Grid.Column>
                        <Grid.Column>
                          <Button basic fluid size='large' value={order.id} onClick={() => this.props.rejectOrder(order.id)} data-test='orders_detail_decline_btn' >
                            <FormattedMessage id='global.decline' defaultMessage='Decline' />
                          </Button>
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid>
                </Segment>
              ) : null}

              <Divider hidden />
              <Accordion defaultActiveIndex={[0, 1]} styled fluid style={{ width: 'calc(100% - 64px)', margin: '0 32px' }}>
                <AccordionTitle active={activeIndexes[0]} index={0} onClick={this.handleClick} data-test='orders_detail_order_info'>
                  <Icon name={'chevron ' + (activeIndexes[0] ? 'down' : 'right')} size='large' color={activeIndexes[0] ? 'blue' : 'black'} />
                  <FormattedMessage id='order.orderInfo' defaultMessage='Order Info' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[0]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>{ordersType} <FormattedMessage id='order' defaultMessage='Order' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.id}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{ordersType.charAt(0)}<FormattedMessage id='order.oDate' defaultMessage='O Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.orderDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{ordersType.charAt(0)}<FormattedMessage id='order.oConfirmDate' defaultMessage='O Confirmation Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.confirmationDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.orderAcceptDate' defaultMessage='Order Acceptance Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.acceptanceDate}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.sellerRejectionDate' defaultMessage='Seller Rejection Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.sellerRejectionDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.buyerRejectionDate' defaultMessage='Buyer Rejection Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.buyerRejectionDate}</GridDataColumn>
                          {ordersType === 'Purchase' ? (
                            <>
                              <GridDataColumn width={4}><strong><FormattedMessage id='order.createdBy' defaultMessage='Created By' /></strong></GridDataColumn>
                              <GridDataColumn width={12}>{order.createdBy}</GridDataColumn>
                            </>
                          ) : ''}
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle active={activeIndexes[1]} index={1} onClick={this.handleClick} data-test='orders_detail_product_info'>
                  <Icon name={'chevron ' + (activeIndexes[1] ? 'down' : 'right')} size='large' color={activeIndexes[1] ? 'blue' : 'black'} />
                  <FormattedMessage id='order.productInfo' defaultMessage='Product Info' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[1]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.chemicalName' defaultMessage='Chemical Name' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.chemicalName}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.productName' defaultMessage='Product Name' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.productName}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.productNumber' defaultMessage='Product Number' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.productCode}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.packaging' defaultMessage='Packaging' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.size}#{order.packaging}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.totalPkg' defaultMessage='Total PKG' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.totalPkg}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.quantityOrdered' defaultMessage='Quantity Ordered' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.quantityOrdered}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.unit' defaultMessage='Unit' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.unit}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.unitPrice' defaultMessage='Unit Price' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.unitPrice}</GridDataColumn>

                          {ordersType === 'Sales' ? (
                            <>
                              <GridDataColumn width={4}><strong><FormattedMessage id='order.unitCost' defaultMessage='Unit Cost' /></strong></GridDataColumn>
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
                                    <Table.HeaderCell colSpan='2'><strong><FormattedMessage id='order.orderTotal' defaultMessage='Order Total' /></strong></Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                  <Table.Row>
                                    <Table.Cell><strong><FormattedMessage id='order.amount' defaultMessage='Amount' /></strong></Table.Cell>
                                    <Table.Cell textAlign='right'>{order.amount}</Table.Cell>
                                  </Table.Row>
                                  <Table.Row>
                                    <Table.Cell><strong><FormattedMessage id='order.echoFees' defaultMessage='Echo Fees' /> ({order.feesPercent}%)</strong></Table.Cell>
                                    <Table.Cell textAlign='right'>{order.feesAmount}</Table.Cell>
                                  </Table.Row>
                                </Table.Body>
                                <Table.Footer>
                                  <Table.Row>
                                    <Table.HeaderCell><strong><FormattedMessage id='order.total' defaultMessage='Total' /></strong></Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'><strong>{order.total}</strong></Table.HeaderCell>
                                  </Table.Row>
                                </Table.Footer>
                              </Table>

                              <Divider hidden />

                              <Table basic='very' collapsing singleLine className='order-total'>
                                <Table.Body>
                                  <Table.Row>
                                    <Table.Cell><strong><FormattedMessage id='order.cogs' defaultMessage='COGS' /></strong></Table.Cell>
                                    <Table.Cell textAlign='right'></Table.Cell>
                                  </Table.Row>
                                </Table.Body>
                                <Table.Footer>
                                  <Table.Row>
                                    <Table.HeaderCell><strong><FormattedMessage id='order.grossProfit' defaultMessage='Gross Profit' /></strong></Table.HeaderCell>
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
                                      <Table.HeaderCell colSpan='2'><strong><FormattedMessage id='order.orderTotal' defaultMessage='Order Total' /></strong></Table.HeaderCell>
                                    </Table.Row>
                                  </Table.Header>
                                  <Table.Body>
                                    <Table.Row>
                                      <Table.Cell><strong><FormattedMessage id='order.amount' defaultMessage='Amount' /></strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.amount}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong><FormattedMessage id='order.subtotal' defaultMessage='Subtotal' /></strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.subtotal}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong><FormattedMessage id='order.freight' defaultMessage='Freight' /></strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.freight}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong><FormattedMessage id='order.other' defaultMessage='Other' /></strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.other}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong><FormattedMessage id='order.deliveryCost' defaultMessage='Delivery Cost' /></strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.deliveryCost}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.Cell><strong><FormattedMessage id='order.deliveryTotal' defaultMessage='Delivery Total' /></strong></Table.Cell>
                                      <Table.Cell textAlign='right'>{order.deliveryTotal}</Table.Cell>
                                    </Table.Row>
                                  </Table.Body>
                                  <Table.Footer>
                                    <Table.Row>
                                      <Table.HeaderCell><strong><FormattedMessage id='order.total' defaultMessage='Total' /></strong></Table.HeaderCell>
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

                <AccordionTitle active={activeIndexes[2]} index={2} onClick={this.handleClick} data-test='orders_detail_pickup_info'>
                  <Icon name={'chevron ' + (activeIndexes[2] ? 'down' : 'right')} size='large' color={activeIndexes[2] ? 'blue' : 'black'} />
                  <FormattedMessage id='order.pickupInfo' defaultMessage='Pick Up Info' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[2]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.pickupAddress' defaultMessage='Pick-Up Address' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.pickUpAddress}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.shippingContact' defaultMessage='Shipping Contact' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shippingContact}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.contactNumber' defaultMessage='Contact Number' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.contactNumber}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.contactEmail' defaultMessage='Contact E-Mail' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.contactEmail}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle active={activeIndexes[3]} index={3} onClick={this.handleClick} data-test='orders_detail_shipping'>
                  <Icon name={'chevron ' + (activeIndexes[3] ? 'down' : 'right')} size='large' color={activeIndexes[3] ? 'blue' : 'black'} />
                  <FormattedMessage id='order.shipping' defaultMessage='Shipping' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[3]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.shippingStatus' defaultMessage='Shipping Status' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shippingStatus}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.shipTo' defaultMessage='Ship To' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shipTo}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.shipToAddress' defaultMessage='Ship To Address' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shipToAddress}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.shipDate' defaultMessage='Ship Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.shipDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.deliveryDate' defaultMessage='Delivery Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.deliveryDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.returnShipDate' defaultMessage='Return Ship Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.returnShipDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.returnDeliveryDate' defaultMessage='Return Delivery Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.returnDeliveryDate}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.carrier' defaultMessage='Carrier' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.carrier}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.service' defaultMessage='Service' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.service}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.proNumber' defaultMessage='Pro Number' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.proNumber}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.incoterms' defaultMessage='Incoterms' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.incoterms}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle active={activeIndexes[4]} index={4} onClick={this.handleClick} data-test='orders_detail_payment'>
                  <Icon name={'chevron ' + (activeIndexes[4] ? 'down' : 'right')} size='large' color={activeIndexes[4] ? 'blue' : 'black'} />
                  <FormattedMessage id='order.payment' defaultMessage='Payment' /> / {order.paymentType}
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[4]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.paymentStatus' defaultMessage='Payment Status' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentStatus}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.paymentSendDate' defaultMessage='Payment Send Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentSendDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.paymentInitDate' defaultMessage='Payment Initiation Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentInitiationDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.paymentReceivedDate' defaultMessage='Payment Received Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentReceivedDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.refundDate' defaultMessage='Refund Date' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.refundDate}</GridDataColumn>
                          <GridDataColumn width={4}><strong><FormattedMessage id='order.terms' defaultMessage='Terms' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.terms}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}><strong>{order.paymentType} <FormattedMessage id='order.name' defaultMessage='Name' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentName}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{order.paymentType} <FormattedMessage id='order.address' defaultMessage='Address' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentAddress}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{order.paymentType} <FormattedMessage id='order.phone' defaultMessage='Phone' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentPhone}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{order.paymentType} <FormattedMessage id='order.email' defaultMessage='E-Mail' /></strong></GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentEmail}</GridDataColumn>
                          <GridDataColumn width={4}><strong>{order.paymentType} <FormattedMessage id='order.contact' defaultMessage='Contact' />></strong></GridDataColumn>
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
