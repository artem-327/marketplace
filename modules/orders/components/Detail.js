import React, { Component } from 'react'
import '~/src/pages/inventory/addInventory/AddInventory.scss'
import Spinner from '~/src/components/Spinner/Spinner'
import {
  Grid,
  Segment,
  Accordion,
  Table,
  List,
  Label,
  Button,
  Icon,
  Divider,
  Header,
  Popup,
  GridRow
} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import ActionsRequired from './components/ActionsRequired'
import AssignLots from './components/AssignLots'
import ReinitiateTransfer from './components/ReinitiateTransfer'
import EnterTrackingIdShip from './components/EnterTrackingIdShip'
import EnterTrackingIdReturnShip from './components/EnterTrackingIdReturnShip'

import PurchaseRejectDelivery from './components/PurchaseRejectDelivery'
import PurchaseRequestCreditDelivery from './components/PurchaseRequestCreditDelivery'
import PurchaseReviewCreditRequest from './components/PurchaseReviewCreditRequest'
import SaleReviewCreditRequest from './components/SaleReviewCreditRequest'
import SaleReturnShipping from './components/SaleReturnShipping'
import PurchaseOrderShipping from './components/PurchaseOrderShipping'

import confirm from '~/src/components/Confirmable/confirm'
import moment from 'moment/moment'
import { FormattedPhone } from '~/components/formatted-messages/'
import { withToastManager } from 'react-toast-notifications'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { FormattedNumber } from 'react-intl'
import { currency } from '~/constants/index'

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

const StyledTable = styled(Table)`
  padding-top: 1em !important;
  padding-bottom: 1em !important;
`

const TableRowData = styled(Table.Row)`
  padding-top: 0.75em !important;
  padding-bottom: 0.75em !important;
  font-size: 1.14285714rem;
  line-height: 1.125;

  strong {
    padding-left: 0;
    padding-right: 0;
  }
`

class Detail extends Component {
  state = {
    activeIndexes: [true, true, false, false, false, false]
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

    if (this.props.reloadPage) this.props.loadDetail(endpointType, this.props.order.id)

    let dataCells = document.querySelectorAll('.data-list dd')
    for (let i = 0; i < dataCells.length; i++) {
      if (dataCells[i].textContent === 'N/A') {
        dataCells[i].className = 'na'
      } else {
        dataCells[i].className = ''
      }
    }
  }

  openAssignLots = order => {
    this.props.openAssignLots()
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
    const {
      router,
      order,
      action,
      isDetailFetching,
      openedAssignLots,
      openedReinitiateTransfer,
      openedEnterTrackingIdShip,
      openedEnterTrackingIdReturnShip,
      openedPurchaseRejectDelivery,
      openedPurchaseRequestCreditDelivery,
      openedPurchaseReviewCreditRequest,
      openedSaleReturnShipping,
      openedSaleReviewCreditRequest,
      openedPurchaseOrderShipping,
      cancelPayment,
      toastManager,
      isPaymentCancellable
    } = this.props
    const { activeIndexes } = this.state
    let ordersType = router.query.type.charAt(0).toUpperCase() + router.query.type.slice(1)

    let orderDate = moment(order.orderDate, 'MMM Do, YYYY h:mm:ss A')

    return (
      <div id='page' className='scrolling'>
        <PerfectScrollbar>
          <Divider hidden />
          <Grid verticalAlign='middle' style={{ padding: '0 32px' }}>
            <GridRow>
              <Grid.Column width={3}>
                <div className='header-top clean left detail-align'>
                  <Header
                    as='h1'
                    className='header inv-header'
                    style={{
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      fontSize: '1.14285714em',
                      fontWeight: '500'
                    }}>
                    {ordersType} <FormattedMessage id='order' defaultMessage='Order' />{' '}
                    {isDetailFetching ? '' : '# ' + order.id}
                  </Header>
                  <a
                    onClick={() => this.downloadOrder()}
                    style={{ fontSize: '1.14285714em', cursor: 'pointer' }}
                    data-test='orders_detail_download_order'>
                    <Icon name='download' style={{ verticalAlign: 'top' }} color='blue' />
                    <FormattedMessage
                      id='order.downloadOrder'
                      defaultMessage={`Download ${order.orderType} Order`}
                      values={{ orderType: order.orderType }}
                    />
                  </a>
                </div>
              </Grid.Column>
              <Grid.Column width={12}>
                <List divided relaxed horizontal size='large' floated='right'>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='order.orderStatus' defaultMessage='Order Status' />
                      </List.Header>
                      <List.Description as='span'>
                        <Label
                          circular
                          empty
                          color={
                            order.orderStatus === 'Declined' || order.orderStatus === 'Rejected'
                              ? 'red'
                              : order.orderStatus === 'Confirmed'
                              ? 'green'
                              : false
                          }></Label>{' '}
                        {order.orderStatus}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='order.shippingStatus' defaultMessage='Shipping Status' />
                      </List.Header>
                      <List.Description as='span'>
                        <Label circular empty color={order.shippingStatus !== 'N/A' ? 'blue' : false}></Label>{' '}
                        {order.shippingStatus}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='order.reviewStatus' defaultMessage='Review Status' />
                      </List.Header>
                      <List.Description as='span'>
                        <Label circular empty color={order.reviewStatus !== 'N/A' ? 'blue' : false}></Label>{' '}
                        {order.reviewStatus}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  {order.creditStatus && (
                    <List.Item>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='order.creditStatus' defaultMessage='Credit Status' />
                        </List.Header>
                        <List.Description as='span'>
                          <Label
                            circular
                            empty
                            color={
                              order.creditStatus === 'Pending' || order.creditStatus === 'Counter Offer Pending'
                                ? 'blue'
                                : order.creditStatus === 'Accepted'
                                ? 'green'
                                : 'red'
                            }></Label>{' '}
                          {order.creditStatus}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  )}
                  {order.returnStatus && (
                    <List.Item>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='order.returnStatus' defaultMessage='Return Status' />
                        </List.Header>
                        <List.Description as='span'>
                          <Label
                            circular
                            empty
                            color={
                              order.returnStatus === 'In Transit'
                                ? 'blue'
                                : order.returnStatus === 'Delivered'
                                ? 'green'
                                : 'red'
                            }></Label>{' '}
                          {order.returnStatus}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  )}
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='order.paymentStatus' defaultMessage='Payment Status' />
                      </List.Header>
                      <List.Description as='span'>
                        <Label
                          circular
                          empty
                          color={
                            order.paymentStatus === 'Failed' ? 'red' : order.paymentStatus !== 'N/A' ? 'blue' : false
                          }></Label>{' '}
                        {order.orderType === 'Purchase' && order.paymentStatus === 'Pending' && isPaymentCancellable ? (
                          <Popup
                            content={
                              <FormattedMessage id='confirm.cancelPayment.title' defaultMessage='Cancel Payment' />
                            }
                            trigger={
                              <a
                                onClick={() =>
                                  confirm(
                                    <FormattedMessage
                                      id='confirm.cancelPayment.title'
                                      defaultMessage='Cancel Payment'
                                    />,
                                    <FormattedMessage
                                      id='confirm.cancelPayment.content'
                                      defaultMessage='Do you really want to Cancel Payment for Order #{orderId}'
                                      values={{ orderId: order.id }}
                                    />
                                  ).then(() => {
                                    cancelPayment(order.id).then(r => {
                                      toastManager.add(
                                        generateToastMarkup(
                                          <FormattedMessage
                                            id='order.cancelTransfer.success.header'
                                            defaultMessage='Canceled Payment'
                                          />,
                                          <FormattedMessage
                                            id='order.cancelTransfer.success.content'
                                            defaultMessage='Payment transfer for order #{orderId} was canceled successfully'
                                            values={{ orderId: order.id }}
                                          />
                                        ),
                                        {
                                          appearance: 'success'
                                        }
                                      )
                                    })
                                  })
                                }>
                                {order.paymentStatus}
                              </a>
                            }
                          />
                        ) : (
                          order.paymentStatus
                        )}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            </GridRow>
          </Grid>
          {isDetailFetching ? (
            <Spinner />
          ) : (
            <>
              <ActionsRequired order={order} ordersType={ordersType} />
              {openedAssignLots ? <AssignLots /> : null}
              {openedReinitiateTransfer ? <ReinitiateTransfer /> : null}
              {openedEnterTrackingIdShip ? <EnterTrackingIdShip /> : null}
              {openedEnterTrackingIdReturnShip ? <EnterTrackingIdReturnShip /> : null}
              {openedPurchaseRejectDelivery ? <PurchaseRejectDelivery /> : null}
              {openedPurchaseRequestCreditDelivery ? <PurchaseRequestCreditDelivery /> : null}
              {openedPurchaseReviewCreditRequest ? <PurchaseReviewCreditRequest /> : null}
              {openedSaleReturnShipping ? <SaleReturnShipping /> : null}
              {openedSaleReviewCreditRequest ? <SaleReviewCreditRequest /> : null}
              {openedPurchaseOrderShipping ? <PurchaseOrderShipping /> : null}

              <Divider hidden />
              <Accordion
                defaultActiveIndex={[0, 1]}
                styled
                fluid
                style={{ width: 'calc(100% - 64px)', margin: '0 32px' }}>
                <AccordionTitle
                  active={activeIndexes[0]}
                  index={0}
                  onClick={this.handleClick}
                  data-test='orders_detail_order_info'>
                  <Icon
                    name={'chevron ' + (activeIndexes[0] ? 'down' : 'right')}
                    size='large'
                    color={activeIndexes[0] ? 'blue' : 'black'}
                  />
                  <FormattedMessage id='order.orderInfo' defaultMessage='Order Info' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[0]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={8}>
                            <strong>
                              {ordersType} <FormattedMessage id='order' defaultMessage='Order' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={8}>{order.id}</GridDataColumn>
                          <GridDataColumn width={8}>
                            <strong>
                              {ordersType.charAt(0)}
                              <FormattedMessage id='order.oDate' defaultMessage='O Date' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={8}>{order.orderDate}</GridDataColumn>
                          <GridDataColumn width={8}>
                            <strong>
                              {ordersType.charAt(0)}
                              <FormattedMessage id='order.oConfirmDate' defaultMessage='O Confirmation Date' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={8}>{order.confirmationDate}</GridDataColumn>
                          <GridDataColumn width={8}>
                            <strong>
                              <FormattedMessage id='order.orderAcceptDate' defaultMessage='Order Acceptance Date' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={8}>{order.acceptanceDate}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      {order.sellerRejectionDate ||
                        order.buyerRejectionDate ||
                        (ordersType === 'Purchase' && (
                          <Grid.Column>
                            <GridData columns={2}>
                              {order.sellerRejectionDate && (
                                <>
                                  <GridDataColumn width={8}>
                                    <strong>
                                      <FormattedMessage
                                        id='order.sellerRejectionDate'
                                        defaultMessage='Seller Rejection Date'
                                      />
                                    </strong>
                                  </GridDataColumn>
                                  <GridDataColumn width={8}>{order.sellerRejectionDate}</GridDataColumn>
                                </>
                              )}
                              {order.buyerRejectionDate && (
                                <>
                                  <GridDataColumn width={8}>
                                    <strong>
                                      <FormattedMessage
                                        id='order.buyerRejectionDate'
                                        defaultMessage='Buyer Rejection Date'
                                      />
                                    </strong>
                                  </GridDataColumn>
                                  <GridDataColumn width={8}>{order.buyerRejectionDate}</GridDataColumn>
                                </>
                              )}
                              {ordersType === 'Purchase' ? (
                                <>
                                  <GridDataColumn width={8}>
                                    <strong>
                                      <FormattedMessage id='order.createdBy' defaultMessage='Created By' />
                                    </strong>
                                  </GridDataColumn>
                                  <GridDataColumn width={8}>{order.createdBy}</GridDataColumn>
                                </>
                              ) : (
                                ''
                              )}
                            </GridData>
                          </Grid.Column>
                        ))}
                      <Grid.Column>
                        <GridData columns={2}>
                          <div className='left'>
                            {ordersType === 'Sales' ? (
                              <>
                                <StyledTable basic='very' collapsing singleLine className='order-total'>
                                  <Table.Header>
                                    <TableRowData>
                                      <Table.HeaderCell colSpan='2'>
                                        <strong>
                                          <FormattedMessage id='order.orderTotal' defaultMessage='Order Total' />
                                        </strong>
                                      </Table.HeaderCell>
                                    </TableRowData>
                                  </Table.Header>
                                  <Table.Body>
                                    <TableRowData>
                                      <Table.Cell>
                                        <strong>
                                          <FormattedMessage id='order.echoFees' defaultMessage='Echo Fees' /> (
                                          {order.feesPercent}%)
                                        </strong>
                                      </Table.Cell>
                                      <Table.Cell textAlign='right'>{order.feesAmount}</Table.Cell>
                                    </TableRowData>
                                  </Table.Body>
                                  <Table.Footer>
                                    <TableRowData>
                                      <Table.HeaderCell>
                                        <strong>
                                          <FormattedMessage id='order.total' defaultMessage='Total' />
                                        </strong>
                                      </Table.HeaderCell>
                                      <Table.HeaderCell textAlign='right'>
                                        <strong>{order.total}</strong>
                                      </Table.HeaderCell>
                                    </TableRowData>
                                  </Table.Footer>
                                </StyledTable>

                                <Divider hidden />

                                <StyledTable basic='very' collapsing singleLine className='order-total'>
                                  <Table.Body>
                                    <TableRowData>
                                      <Table.Cell>
                                        <strong>
                                          <FormattedMessage id='order.cogs' defaultMessage='COGS' />
                                        </strong>
                                      </Table.Cell>
                                      <Table.Cell textAlign='right'></Table.Cell>
                                    </TableRowData>
                                  </Table.Body>
                                  <Table.Footer>
                                    <TableRowData>
                                      <Table.HeaderCell>
                                        <strong>
                                          <FormattedMessage id='order.grossProfit' defaultMessage='Gross Profit' />
                                        </strong>
                                      </Table.HeaderCell>
                                      <Table.HeaderCell textAlign='right'>
                                        <strong>{order.grossProfit}</strong>
                                      </Table.HeaderCell>
                                    </TableRowData>
                                  </Table.Footer>
                                </StyledTable>
                              </>
                            ) : (
                              <>
                                <StyledTable basic='very' collapsing singleLine className='order-total'>
                                  <Table.Header>
                                    <TableRowData>
                                      <Table.HeaderCell colSpan='2'>
                                        <strong>
                                          <FormattedMessage id='order.orderTotal' defaultMessage='Order Total' />
                                        </strong>
                                      </Table.HeaderCell>
                                    </TableRowData>
                                  </Table.Header>
                                  <Table.Body>
                                    <TableRowData>
                                      <Table.Cell>
                                        <strong>
                                          <FormattedMessage id='order.subtotal' defaultMessage='Subtotal' />
                                        </strong>
                                      </Table.Cell>
                                      <Table.Cell textAlign='right'>
                                        {
                                          <FormattedNumber
                                            style='currency'
                                            currency={currency}
                                            value={order.subtotal}
                                          />
                                        }
                                      </Table.Cell>
                                    </TableRowData>
                                    <TableRowData>
                                      <Table.Cell>
                                        <strong>
                                          <FormattedMessage id='order.shipping' defaultMessage='Shipping' />
                                        </strong>
                                      </Table.Cell>
                                      <Table.Cell textAlign='right'>{order.freight}</Table.Cell>
                                    </TableRowData>
                                    <TableRowData>
                                      <Table.Cell>
                                        <strong>
                                          <FormattedMessage id='order.tax' defaultMessage='Tax' />
                                        </strong>
                                      </Table.Cell>
                                      <Table.Cell textAlign='right'>{'$0'}</Table.Cell>
                                    </TableRowData>
                                  </Table.Body>
                                  <Table.Footer>
                                    <TableRowData>
                                      <Table.HeaderCell>
                                        <strong>
                                          <FormattedMessage id='order.total' defaultMessage='Total' />
                                        </strong>
                                      </Table.HeaderCell>
                                      <Table.HeaderCell textAlign='right'>
                                        <strong>{order.total}</strong>
                                      </Table.HeaderCell>
                                    </TableRowData>
                                  </Table.Footer>
                                </StyledTable>
                              </>
                            )}
                          </div>
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle
                  active={activeIndexes[1]}
                  index={1}
                  onClick={this.handleClick}
                  data-test='orders_detail_product_info'>
                  <Icon
                    name={'chevron ' + (activeIndexes[1] ? 'down' : 'right')}
                    size='large'
                    color={activeIndexes[1] ? 'blue' : 'black'}
                  />
                  <FormattedMessage id='order.productInfo' defaultMessage='Product Info' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[1]}>
                  <Table basic='very'>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.name' defaultMessage='Name' />
                        </Table.HeaderCell>
                        {false && (<Table.HeaderCell>
                          <FormattedMessage id='order.code' defaultMessage='Code' />
                        </Table.HeaderCell>)}
                        <Table.HeaderCell>
                          <FormattedMessage id='order.packaging' defaultMessage='Packaging' />
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>
                          <FormattedMessage id='order.pkgs' defaultMessage='PKGs' />
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>
                          <FormattedMessage id='order.quantity' defaultMessage='Quantity' />
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>
                          <FormattedMessage id='order.fobPrice' defaultMessage='FOB Price' />
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>
                          <FormattedMessage id='order.itemTotal' defaultMessage='Item Total' />
                        </Table.HeaderCell>
                        {ordersType === 'Sales' && (
                          <>
                            <Table.HeaderCell textAlign='right'>
                              <FormattedMessage id='order.unitCost' defaultMessage='Unit Cost' />
                            </Table.HeaderCell>
                          </>
                        )}
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {order &&
                        order.productName &&
                        order.productName.map((element, index) => (
                          <Table.Row>
                            <Table.Cell>{element}</Table.Cell>
                            {false && (<Table.Cell>{order.productCode[index]}</Table.Cell>)}
                            <Table.Cell>{order.packaging[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>{order.totalPkg[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>{order.quantityOrdered[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>{order.unitPrice[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>
                              {<FormattedNumber style='currency' currency={currency} value={order.itemTotal[index]} />}
                            </Table.Cell>
                            {ordersType === 'Sales' && (
                              <>
                                <Table.Cell textAlign='right'>
                                  {order.unitCost[index] ? (
                                    <FormattedNumber
                                      style='currency'
                                      currency={currency}
                                      value={order.unitCost[index]}
                                    />
                                  ) : (
                                    'N/A'
                                  )}
                                </Table.Cell>
                              </>
                            )}
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </Accordion.Content>

                <AccordionTitle
                  active={activeIndexes[1]}
                  index={1}
                  onClick={this.handleClick}
                  data-test='orders_detail_product_info'>
                  <Icon
                    name={'chevron ' + (activeIndexes[1] ? 'down' : 'right')}
                    size='large'
                    color={activeIndexes[1] ? 'blue' : 'black'}
                  />
                  <FormattedMessage id='order.productInfo' defaultMessage='Product Info' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[1]}>
                  <Grid divided='horizontally'>
                    <Grid.Row>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.chemicalName' defaultMessage='Chemical Name' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.chemicalName}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.name' defaultMessage='Name' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.productName}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.code' defaultMessage='Code' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.productCode}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.packaging' defaultMessage='Packaging' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.packaging}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.pkgs' defaultMessage='PKGs' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.totalPkg}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.quantity' defaultMessage='Quantity' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.quantityOrdered}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.fobPrice' defaultMessage='FOB Price' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.unitPrice}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.itemTotal' defaultMessage='Item Total' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.subtotal}</GridDataColumn>

                          {ordersType === 'Sales' ? (
                            <>
                              <GridDataColumn width={4}>
                                <strong>
                                  <FormattedMessage id='order.unitCost' defaultMessage='Unit Cost' />
                                </strong>
                              </GridDataColumn>
                              <GridDataColumn width={12}>{order.unitCost}</GridDataColumn>
                            </>
                          ) : (
                            ''
                          )}
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle
                  active={activeIndexes[2]}
                  index={2}
                  onClick={this.handleClick}
                  data-test='orders_detail_pickup_info'>
                  <Icon
                    name={'chevron ' + (activeIndexes[2] ? 'down' : 'right')}
                    size='large'
                    color={activeIndexes[2] ? 'blue' : 'black'}
                  />
                  <FormattedMessage id='order.pickupInfo' defaultMessage='Pick Up Info' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[2]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.pickupAddress' defaultMessage='Pick-Up Address' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.pickUpAddress}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.shippingContact' defaultMessage='Shipping Contact' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.shippingContact}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.contactNumber' defaultMessage='Contact Number' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.contactNumber}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.contactEmail' defaultMessage='Contact E-Mail' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.contactEmail}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                {order.reviewStatus === 'Rejected' && (
                  <>
                    <AccordionTitle
                      active={activeIndexes[3]}
                      index={3}
                      onClick={this.handleClick}
                      data-test='orders_detail_return_shipping'>
                      <Icon
                        name={'chevron ' + (activeIndexes[3] ? 'down' : 'right')}
                        size='large'
                        color={activeIndexes[3] ? 'blue' : 'black'}
                      />
                      <FormattedMessage id='order.returnShipping' defaultMessage='Return Shipping' />
                    </AccordionTitle>
                    <Accordion.Content active={activeIndexes[3]}>
                      <Grid divided='horizontally'>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <GridData columns={2}>
                              <GridDataColumn width={4}>
                                <strong>
                                  <FormattedMessage id='order.returnTo' defaultMessage='Return To' />
                                </strong>
                              </GridDataColumn>
                              <GridDataColumn width={12}>{order.returnTo}</GridDataColumn>
                              <GridDataColumn width={4}>
                                <strong>
                                  <FormattedMessage id='order.returnToAddress' defaultMessage='Return To Address' />
                                </strong>
                              </GridDataColumn>
                              <GridDataColumn width={12}>{order.returnAddress}</GridDataColumn>
                              {order.returnShipDate && (
                                <>
                                  <GridDataColumn width={4}>
                                    <strong>
                                      <FormattedMessage id='order.returnShipDate' defaultMessage='Return Ship Date' />
                                    </strong>
                                  </GridDataColumn>
                                  <GridDataColumn width={12}>{order.returnShipDate}</GridDataColumn>
                                </>
                              )}
                              {order.returnDeliveryDate && (
                                <>
                                  <GridDataColumn width={4}>
                                    <strong>
                                      <FormattedMessage
                                        id='order.returnDeliveryDate'
                                        defaultMessage='Return Delivery Date'
                                      />
                                    </strong>
                                  </GridDataColumn>
                                  <GridDataColumn width={12}>{order.returnDeliveryDate}</GridDataColumn>
                                </>
                              )}
                            </GridData>
                          </Grid.Column>
                          <Grid.Column>
                            <GridData columns={2}>
                              <GridDataColumn width={4}>
                                <strong>
                                  <FormattedMessage id='order.returnCarrier' defaultMessage='Return Carrier' />
                                </strong>
                              </GridDataColumn>
                              <GridDataColumn width={12}>{order.returnCourierName}</GridDataColumn>
                              <GridDataColumn width={4}>
                                <strong>
                                  <FormattedMessage
                                    id='order.returnTrackingNumber'
                                    defaultMessage='Return Tracking Number'
                                  />
                                </strong>
                              </GridDataColumn>
                              <GridDataColumn width={12}>{order.returnShippingTrackingCode}</GridDataColumn>
                            </GridData>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Accordion.Content>
                  </>
                )}

                <AccordionTitle
                  active={activeIndexes[4]}
                  index={4}
                  onClick={this.handleClick}
                  data-test='orders_detail_shipping'>
                  <Icon
                    name={'chevron ' + (activeIndexes[4] ? 'down' : 'right')}
                    size='large'
                    color={activeIndexes[4] ? 'blue' : 'black'}
                  />
                  <FormattedMessage id='order.shipping' defaultMessage='Shipping' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[4]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.shippingStatus' defaultMessage='Shipping Status' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.shippingStatus}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.shipTo' defaultMessage='Ship To' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.shipTo}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.shipToAddress' defaultMessage='Ship To Address' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.shipToAddress}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.shipDate' defaultMessage='Ship Date' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.shipDate}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.deliveryDate' defaultMessage='Delivery Date' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.deliveryDate}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.carrier' defaultMessage='Carrier' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.carrier}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.service' defaultMessage='Service' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.service}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.trackingNumber' defaultMessage='Tracking Number' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.shippingTrackingCode}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.incoterms' defaultMessage='Incoterms' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.incoterms}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle
                  active={activeIndexes[5]}
                  index={5}
                  onClick={this.handleClick}
                  data-test='orders_detail_payment'>
                  <Icon
                    name={'chevron ' + (activeIndexes[5] ? 'down' : 'right')}
                    size='large'
                    color={activeIndexes[5] ? 'blue' : 'black'}
                  />
                  <FormattedMessage id='order.payment' defaultMessage='Payment' /> / {order.paymentType}
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[5]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.paymentStatus' defaultMessage='Payment Status' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentStatus}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.paymentSendDate' defaultMessage='Payment Send Date' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentSendDate}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.paymentInitDate' defaultMessage='Payment Initiation Date' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentInitiationDate}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.paymentReceivedDate' defaultMessage='Payment Received Date' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentReceivedDate}</GridDataColumn>
                          {order.refundDate && (
                            <>
                              <GridDataColumn width={4}>
                                <strong>
                                  <FormattedMessage id='order.refundDate' defaultMessage='Refund Date' />
                                </strong>
                              </GridDataColumn>
                              <GridDataColumn width={12}>{order.refundDate}</GridDataColumn>
                            </>
                          )}
                          <GridDataColumn width={4}>
                            <strong>
                              <FormattedMessage id='order.terms' defaultMessage='Terms' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.terms}</GridDataColumn>
                        </GridData>
                      </Grid.Column>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={4}>
                            <strong>
                              {order.paymentType} <FormattedMessage id='order.name' defaultMessage='Name' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentName}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              {order.paymentType} <FormattedMessage id='order.address' defaultMessage='Address' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentAddress}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              {order.paymentType} <FormattedMessage id='order.phone' defaultMessage='Phone' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>
                            <FormattedPhone value={order.paymentPhone} />
                          </GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              {order.paymentType} <FormattedMessage id='order.email' defaultMessage='E-Mail' />
                            </strong>
                          </GridDataColumn>
                          <GridDataColumn width={12}>{order.paymentEmail}</GridDataColumn>
                          <GridDataColumn width={4}>
                            <strong>
                              {order.paymentType} <FormattedMessage id='order.contact' defaultMessage='Contact' />
                            </strong>
                          </GridDataColumn>
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

export default withToastManager(Detail)
