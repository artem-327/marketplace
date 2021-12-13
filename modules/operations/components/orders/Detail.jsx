import { useEffect, useState } from 'react'
import Link from 'next/link'
import { withToastManager } from 'react-toast-notifications'
import { Grid, Segment, Accordion, Table, List, Button, Divider, Header, GridRow, Modal, Dimmer, Loader } from 'semantic-ui-react'
import { DownloadCloud, ArrowLeft, Info, Link2 } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import { injectIntl, FormattedNumber } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ModalResolveDispute from './ModalResolveDispute'
import BasicButton from '../../../../components/buttons/BasicButton'
import Spinner from '../../../../components/Spinner/Spinner'
import { FormattedPhone } from '../../../../components/formatted-messages/'
import ProdexGrid from '../../../../components/table'
import TransactionInfo from '../../../orders/components/components/TransactionInfoConatiner'
// Constants
import { currency } from '../../../../constants/index'
// Styles
import {
  OrderSegment,
  OrderList,
  OrderAccordion,
  AccordionTitle,
  Chevron,
  GridData,
  GridDataColumn,
  StyledTable,
  TableRowData,
  GridDataColumnTrackingID,
  StyledModal,
  TopRow,
  StyledHeader,
  ButtonCancel
} from '../../styles'
// Services
import { getSafe } from '../../../../utils/functions'
import {
  columnsRelatedOrdersDetailDocuments,
  downloadOrder,
  handleClick,
  getRows,
  openRelatedPopup,
  getRelatedDocumentsContent,
  confirmCancelOrder,
  getOrder
} from './Detail.services'


/**
 * Order Detail Component
 * @category Operations - Orders - Detail
 * @components
 */
const Detail = props => {
  const [state, setState] = useState({
    activeIndexes: [true, true, true, true, true, false, false, false, false, false, false],
    activeDimmer: false,
    replaceRow: '',
    toggleTrackingID: false,
    shippingTrackingCode: '',
    openDocumentsPopup: false,
    openDocumentsAttachments: [],
    documentsPopupProduct: '',
    submitting: false
  })

  useEffect(() => {
    setState({ ...state, shippingTrackingCode: props.order.shippingTrackingCode })
  }, [getSafe(() => props.order.shippingTrackingCode, '')])

  const {
    order,
    isDetailFetching,
    intl: { formatMessage },
    echoSupportPhone,
    closePopup,
    isOpenPopup,
    loading,
    orderByIdLoading,
    downloadPdfLoading,
    openPopup,
    resolveDisputeReject,
    resolveDisputeCredit,
    resolveDisputeAccept,
    downloadDisputeAttachment,
    isCancelable
  } = props

  const { activeIndexes, activeDimmer, documentsPopupProduct } = state
  let ordersType = 'Sales'
  const { counterOrderId } = order

  const keyColumn = 5
  const valColumn = 16 - keyColumn

  return (
    <div id='page' className='auto-scrolling'>
      <Dimmer active={activeDimmer || orderByIdLoading} inverted style={{background: 'rgba(255, 255, 255, 0.85)'}}>
        <Loader />
      </Dimmer>
      <ModalResolveDispute
        orderId={order?.id}
        disputeReasonComment={order?.disputeReasonComment}
        disputeAttachments={order?.disputeAttachments}
        open={isOpenPopup}
        loading={loading}
        onClose={closePopup}
        actions={{ resolveDisputeReject, resolveDisputeCredit, resolveDisputeAccept, downloadDisputeAttachment }}
      />
      {state.openDocumentsPopup && (
        <StyledModal
          size='Default'
          closeIcon={false}
          onClose={() => setState({ ...state, openDocumentsPopup: false })}
          centered={true}
          open={true}>
          <Modal.Header>
            <>
              <FormattedMessage id='order.relatedDocumentsFor' defaultMessage='RELATED DOCUMENTS FOR ' />
              <StyledHeader>{documentsPopupProduct}</StyledHeader>
            </>
          </Modal.Header>
          <Modal.Content scrolling>{getRelatedDocumentsContent(props, state)}</Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => setState({ ...state, openDocumentsPopup: false })}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}
      <div className='scroll-area'>
        <TopRow>
          <a
            onClick={() => props.openOrderDetail(null)}
            style={{ cursor: 'pointer' }}
            data-test='orders_detail_back_btn'>
            <ArrowLeft />
            <FormattedMessage id='order.detail.backToOrders' defaultMessage='Back to Orders' />
          </a>
          {counterOrderId ? (
            <a
              onClick={async () => {
                const order = await getOrder(counterOrderId, props)
                if (order) props.openOrderDetail(order)
              }}
              style={{ cursor: 'pointer' }}
              data-test='orders_detail_view_linked_order_btn'>
              <Link2 />
              <FormattedMessage id='order.detail.viewLinkedOrder' defaultMessage='View Linked Order' />
            </a>
          ) : null}
        </TopRow>
        <OrderSegment>
          <Grid verticalAlign='middle'>
            <GridRow className='row-flex'>
              <Grid.Column width={4}>
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
                    <FormattedMessage id='order' defaultMessage='Order' />
                    {'# ' + order.id}
                  </Header>
                  <a
                    onClick={() => downloadOrder(props)}
                    style={{ fontSize: '1.14285714em', cursor: 'pointer' }}
                    data-test='orders_detail_download_order'>
                    <Dimmer active={downloadPdfLoading} inverted style={{background: 'rgba(255, 255, 255, 0.85)'}}>
                      <Loader />
                    </Dimmer>
                    <DownloadCloud />
                    <FormattedMessage id='global.download' defaultMessage='Download' />
                  </a>
                  {isCancelable && (
                    <ButtonCancel
                      basic
                      onClick={() => confirmCancelOrder(props, state, setState)}
                      data-test='orders_detail_cancel_order_button'
                    >
                      <FormattedMessage id='order.detail.cancelOrder' defaultMessage='Cancel Order' />
                    </ButtonCancel>
                  )}
                </div>
              </Grid.Column>
              <Grid.Column width={12}>
                <OrderList divided relaxed horizontal size='large'>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='order.orderStatus' defaultMessage='Order Status' />
                      </List.Header>
                      <List.Description
                        as='span'
                        className={
                          order.orderStatus === 'Discarded' ||
                          order.orderStatus === 'Rejected' ||
                          order.orderStatus === 'Cancelled'
                            ? 'red'
                            : order.orderStatus === 'Confirmed'
                            ? 'green'
                            : order.orderStatus === 'Pending' || order.orderStatus === 'Draft'
                            ? null // could be blue
                            : null
                        }>
                        {order.orderStatus}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='order.deliveryStatus' defaultMessage='Delivery Status' />
                      </List.Header>
                      <List.Description
                        as='span'
                        className={
                          order.shippingStatus === 'Delivered'
                            ? 'green'
                            : order.shippingStatus === 'Returned'
                            ? 'red'
                            : order.shippingStatus === 'In Transit'
                            ? null // could be blue
                            : null
                        }>
                        {order.shippingStatus}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='order.reviewStatus' defaultMessage='Review Status' />
                      </List.Header>
                      <List.Description
                        as='span'
                        className={
                          order.reviewStatus === 'Accepted'
                            ? 'green'
                            : order.reviewStatus === 'Rejected'
                            ? 'red'
                            : order.reviewStatus === 'Pending'
                            ? null // could be blue
                            : null
                        }>
                        {order.reviewStatus}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  {/*Commente based on  https://bluepallet.atlassian.net/browse/DT-144*/}
                  {false && order.creditStatus && (
                    <List.Item>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='order.creditStatus' defaultMessage='Credit Status' />
                        </List.Header>
                        <List.Description
                          as='span'
                          className={
                            order.creditStatus === 'Accepted'
                              ? 'green'
                              : order.creditStatus === 'Rejected'
                              ? 'red'
                              : order.creditStatus === 'Pending' || order.creditStatus === 'Counter Offer Pending'
                              ? null // could be blue
                              : null
                          }>
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
                        <List.Description
                          as='span'
                          className={
                            order.returnStatus === 'Delivered'
                              ? 'green'
                              : order.returnStatus === 'Not Shipped'
                              ? 'red'
                              : order.returnStatus === 'In Transit'
                              ? null // could be blue
                              : null
                          }>
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
                      <List.Description
                        as='span'
                        className={
                          order.paymentStatus === 'Failed' || order.paymentStatus === 'Canceled'
                            ? 'red'
                            : order.paymentStatus === 'Paid'
                            ? 'green'
                            : order.paymentStatus === 'Pending' ||
                              order.paymentStatus === 'Refunded' ||
                              order.paymentStatus === 'Initiated'
                            ? null // could be blue
                            : null
                        }>
                        {order.paymentStatus}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </OrderList>
              </Grid.Column>
            </GridRow>
          </Grid>
        </OrderSegment>
        {isDetailFetching ? (
          <Spinner />
        ) : (
          <>
            <TransactionInfo echoSupportPhone={echoSupportPhone} order={order} />
            {order?.reviewStatus === 'Disputed' && order?.disputeResolutionStatus === 1 ? (
              <Segment color={'blue'} style={{ marginLeft: '32px', marginRight: '32px' }}>
                <Info />
                <Grid verticalAlign='middle' columns='equal'>
                  <Grid.Column width={10}>
                    <Header as='h3' color={'blue'} style={{ margin: '0 0 6px' }}>
                      <FormattedMessage id='order.actionDisputed' defaultMessage='Order Dispute' />
                    </Header>
                    <FormattedMessage
                      id='order.actionDisputed.text'
                      defaultMessage='This order has been disputed by the buyer and needs to be resolved. When ready enter the resolution here.'
                    />
                  </Grid.Column>
                  <Grid.Column width={6} textAlign='right'>
                    <BasicButton onClick={() => openPopup()}>
                      <FormattedMessage id='global.continue' defaultMessage='Continue' />
                    </BasicButton>
                  </Grid.Column>
                </Grid>
              </Segment>
            ) : null}

            <Divider hidden />
            <OrderAccordion
              defaultActiveIndex={[0, 1, 2, 3]}
              styled
              fluid
              style={{ width: 'calc(100% - 64px)', margin: '0 32px' }}>
              <AccordionTitle
                active={activeIndexes[0]}
                index={0}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_order_info'>
                <Chevron />
                <FormattedMessage id='order.customer' defaultMessage='Customer' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[0]}>
                <Grid divided='horizontally'>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.customerName' defaultMessage='Customer Name' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentName}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.customerAddress' defaultMessage='Customer Address' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentAddress}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.companyEin' defaultMessage='Company EIN' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.companyEin}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.customerEmail' defaultMessage='Customer E-Mail' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentEmail}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.customerContact' defaultMessage='Customer Contact' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentContact}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.customerPhone' defaultMessage='Customer Phone' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>
                          <FormattedPhone value={order.paymentPhone} />
                        </GridDataColumn>
                      </GridData>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              <AccordionTitle
                active={activeIndexes[1]}
                index={1}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_order_seller'>
                <Chevron />
                <FormattedMessage id='order.seller' defaultMessage='Seller' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[1]}>
                <Grid divided='horizontally'>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.sellerName' defaultMessage='Seller Name' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.sellerCompanyName}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.sellerAddress' defaultMessage='Seller Address' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.sellerAddress}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.companyEin' defaultMessage='Company EIN' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.sellerCompanyEin}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.sellerEmail' defaultMessage='Seller E-Mail' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.sellerCompanyContactEmail}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.sellerContact' defaultMessage='Seller Contact' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.sellerCompanyContactName}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.detail.sellerPhone' defaultMessage='Seller Phone' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>
                          <FormattedPhone value={order.sellerCompanyContactPhone} />
                        </GridDataColumn>
                      </GridData>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              <AccordionTitle
                active={activeIndexes[2]}
                index={2}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_order_info'>
                <Chevron />
                <FormattedMessage id='order.orderInfo' defaultMessage='Order Info' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[2]}>
                <Grid divided='horizontally'>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <GridData>
                        <GridDataColumn width={keyColumn} className='key'>
                          {ordersType} <FormattedMessage id='order' defaultMessage='Order' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.id}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          {ordersType.charAt(0)}
                          <FormattedMessage id='order.oDate' defaultMessage='O Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.orderDate}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          {ordersType.charAt(0)}
                          <FormattedMessage id='order.oConfirmDate' defaultMessage='O Confirmation Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.confirmationDate}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.orderAcceptDate' defaultMessage='Order Acceptance Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.acceptanceDate}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                    <Grid.Column width={4} floated='right'>
                      <GridData>
                        <GridDataColumn style={{ paddingTop: '0 !important', paddingBottom: '0 !important' }}>
                          <StyledTable basic='very' collapsing singleLine className='order-total'>
                            <Table.Header>
                              <TableRowData>
                                <Table.HeaderCell>
                                  <FormattedMessage id='order.orderTotal' defaultMessage='Order Total' />
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign='right'>{order.subtotal}</Table.HeaderCell>
                              </TableRowData>
                            </Table.Header>
                            <Table.Body>
                              <TableRowData>
                                <Table.Cell>
                                  <FormattedMessage id='order.transactionFee' defaultMessage='Transaction Fee' />
                                </Table.Cell>
                                <Table.Cell textAlign='right'>{order.transactionFeeFormatted}</Table.Cell>
                              </TableRowData>
                              {order.brokerageFee && (
                                <TableRowData>
                                  <Table.Cell>
                                    <FormattedMessage id='order.brokerageFee' defaultMessage='Brokerage Fee' />
                                  </Table.Cell>
                                  <Table.Cell textAlign='right'>{order.brokerageFee}</Table.Cell>
                                </TableRowData>
                              )}
                              <TableRowData>
                                <Table.Cell>
                                  <FormattedMessage id='order.shippingCost' defaultMessage='Shipping Cost' />
                                </Table.Cell>
                                <Table.Cell textAlign='right'>{order.freight}</Table.Cell>
                              </TableRowData>
                            </Table.Body>
                            <divider/>
                            <Table.Footer>
                              <TableRowData>
                                <Table.HeaderCell>
                                  <FormattedMessage id='order.total' defaultMessage='Total' />
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign='right'>
                                  <strong>{order.total}</strong>
                                </Table.HeaderCell>
                              </TableRowData>
                            </Table.Footer>
                          </StyledTable>
                        </GridDataColumn>
                      </GridData>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              <AccordionTitle
                active={activeIndexes[3]}
                index={3}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_product_info'>
                <Chevron />
                <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[3]}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column style={{ paddingLeft: '30px', paddingRight: '2.2857143em' }}>
                      <ProdexGrid
                        displayRowActionsOverBorder
                        removeFlexClass={true}
                        tableName='related_orders_detail_documents'
                        columns={columnsRelatedOrdersDetailDocuments}
                        rows={getRows(order.attachments, props)}
                        hideCheckboxes
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              <AccordionTitle
                active={activeIndexes[4]}
                index={4}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_product_info'>
                <Chevron />
                <FormattedMessage id='order.productInfo' defaultMessage='Product Info' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[4]}>
                <div className='table-responsive'>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell className='p-0'></Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.productName' defaultMessage='Product Name' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.productCode' defaultMessage='Product Code' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.packaging' defaultMessage='Packaging' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.pkgs' defaultMessage='PKGs' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.quantity' defaultMessage='Quantity' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.fobPrice' defaultMessage='FOB Price' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.itemTotal' defaultMessage='Item Total' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='order.unitCost' defaultMessage='Unit Cost' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id='global.documents' defaultMessage='Documents' />
                        </Table.HeaderCell>

                        <Table.HeaderCell className='p-0'></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {order &&
                        order.productName &&
                        order.productName.map((element, index) => (
                          <Table.Row>
                            <Table.Cell className='p-0'></Table.Cell>
                            <Table.Cell>
                              <span className='product-name'>{element}</span>
                            </Table.Cell>
                            <Table.Cell>{order.productCode[index]}</Table.Cell>
                            <Table.Cell>{order.packaging[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>{order.totalPkg[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>{order.quantityOrdered[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>{order.unitPrice[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>{order.itemTotal[index]}</Table.Cell>
                            <Table.Cell textAlign='right'>
                              {order.unitCost[index] ? (
                                <FormattedNumber
                                  minimumFractionDigits={2}
                                  maximumFractionDigits={2}
                                  style='currency'
                                  currency={currency}
                                  value={order.unitCost[index]}
                                />
                              ) : (
                                'N/A'
                              )}
                            </Table.Cell>
                            <Table.Cell>
                              {order.orderItems[index].attachments.length ? (
                                <a
                                  href='#'
                                  onClick={() => openRelatedPopup(order.orderItems[index].attachments, element, state, setState)}>
                                  <FormattedMessage id='global.view' defaultMessage='View' />
                                </a>
                              ) : (
                                'N/A'
                              )}
                            </Table.Cell>
                            <Table.Cell className='p-0'></Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </div>
              </Accordion.Content>

              <AccordionTitle
                active={activeIndexes[5]}
                index={5}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_pickup_info'>
                <Chevron />
                <FormattedMessage id='order.pickupInfo' defaultMessage='Pick Up Info' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[5]}>
                <Grid divided='horizontally'>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.pickupAddress' defaultMessage='Pick-Up Address' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.pickUpAddress}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.deliveryContact' defaultMessage='Delivery Contact' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.returnAddressName}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.contactNumber' defaultMessage='Contact Number' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.returnAddressContactPhone}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.contactEmail' defaultMessage='Contact E-Mail' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.returnAddressContactEmail}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              {order.reviewStatus === 'Rejected' && (
                <>
                  <AccordionTitle
                    active={activeIndexes[6]}
                    index={6}
                    onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                    data-test='orders_detail_return_shipping'>
                    <Chevron />
                    <FormattedMessage id='order.returnShipping' defaultMessage='Return Shipping' />
                  </AccordionTitle>
                  <Accordion.Content active={activeIndexes[6]}>
                    <Grid divided='horizontally'>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <GridData columns={2}>
                            <GridDataColumn width={keyColumn} className='key'>
                              <FormattedMessage id='order.returnTo' defaultMessage='Return To' />
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>{order.returnTo}</GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key'>
                              <FormattedMessage id='order.returnToAddress' defaultMessage='Return To Address' />
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>{order.returnAddress}</GridDataColumn>
                            {order.returnShipDate && (
                              <>
                                <GridDataColumn width={keyColumn} className='key'>
                                  <FormattedMessage id='order.returnShipDate' defaultMessage='Return Ship Date' />
                                </GridDataColumn>
                                <GridDataColumn width={valColumn}>{order.returnShipDate}</GridDataColumn>
                              </>
                            )}
                            {order.returnDeliveryDate && (
                              <>
                                <GridDataColumn width={keyColumn} className='key'>
                                  <FormattedMessage
                                    id='order.returnDeliveryDate'
                                    defaultMessage='Return Delivery Date'
                                  />
                                </GridDataColumn>
                                <GridDataColumn width={valColumn}>{order.returnDeliveryDate}</GridDataColumn>
                              </>
                            )}
                          </GridData>
                        </Grid.Column>
                        <Grid.Column>
                          <GridData columns={2}>
                            <GridDataColumn width={keyColumn} className='key'>
                              <FormattedMessage id='order.returnCarrier' defaultMessage='Return Carrier' />
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>{order.returnCourierName}</GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key'>
                              <FormattedMessage
                                id='order.returnTrackingNumber'
                                defaultMessage='Return Tracking Number'
                              />
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>{order.returnShippingTrackingCode}</GridDataColumn>
                          </GridData>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Accordion.Content>
                </>
              )}

              <AccordionTitle
                active={activeIndexes[7]}
                index={7}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_shipping'>
                <Chevron />
                <FormattedMessage id='order.deliveryInfo' defaultMessage='Delivery Info' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[7]}>
                <Grid divided='horizontally'>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.Delivery' defaultMessage='Delivery Status' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shippingStatus}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.shipTo' defaultMessage='Ship To' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipTo}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.shipToAddress' defaultMessage='Ship To Address' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipToAddress}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.shipDate' defaultMessage='Ship Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipDate}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.contactNumber' defaultMessage='Contact Number' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipToPhone}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.contactEmail' defaultMessage='Contact E-Mail' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipToEmail}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.deliveryDate' defaultMessage='Delivery Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.deliveryDate}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.carrier' defaultMessage='Carrier' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.carrier}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.service' defaultMessage='Service' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.service}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.trackingNumber' defaultMessage='Tracking Number' />
                        </GridDataColumn>
                        <GridDataColumnTrackingID width={valColumn}>
                          {order.shippingTrackingCode}
                        </GridDataColumnTrackingID>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.incoterms' defaultMessage='Incoterms' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.incoterms}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              <AccordionTitle
                active={activeIndexes[8]}
                index={8}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_payment'>
                <Chevron />
                <FormattedMessage id='order.payment' defaultMessage='Payment' /> / {order.paymentType}
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[8]}>
                <Grid divided='horizontally'>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.paymentStatus' defaultMessage='Payment Status' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentStatus}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.paymentSendDate' defaultMessage='Payment Send Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentSendDate}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.paymentInitDate' defaultMessage='Payment Initiation Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentInitiationDate}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.paymentReceivedDate' defaultMessage='Payment Received Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentReceivedDate}</GridDataColumn>
                        {order.refundDate && (
                          <>
                            <GridDataColumn width={keyColumn} className='key'>
                              <FormattedMessage id='order.refundDate' defaultMessage='Refund Date' />
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>{order.refundDate}</GridDataColumn>
                          </>
                        )}
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.terms' defaultMessage='Terms' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.terms}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                    <Grid.Column>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          {order.paymentType} <FormattedMessage id='order.name' defaultMessage='Name' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentName}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          {order.paymentType} <FormattedMessage id='order.address' defaultMessage='Address' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentAddress}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          {order.paymentType} <FormattedMessage id='order.phone' defaultMessage='Phone' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>
                          <FormattedPhone value={order.paymentPhone} />
                        </GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          {order.paymentType} <FormattedMessage id='order.email' defaultMessage='E-Mail' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentEmail}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          {order.paymentType} <FormattedMessage id='order.contact' defaultMessage='Contact' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentContact}</GridDataColumn>
                      </GridData>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>
              <AccordionTitle
                active={activeIndexes[9]}
                index={9}
                onClick={(e, titleProps) => handleClick(titleProps, state, setState)}
                data-test='orders_detail_notes'>
                <Chevron />
                <FormattedMessage id='order.detailNotes' defaultMessage='NOTES' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[9]}>
                <Grid.Row>
                  <Grid.Column>{getSafe(() => props.order.note, '')}</Grid.Column>
                </Grid.Row>
              </Accordion.Content>
            </OrderAccordion>
          </>
        )}
      </div>
    </div>
  )
}

Detail.propTypes = {
  order: PropTypes.object,
  intl: PropTypes.object,
  echoSupportPhone: PropTypes.string,
  isDetailFetching: PropTypes.bool,
  isOpenPopup: PropTypes.bool,
  loading: PropTypes.bool,
  isCancelable: PropTypes.bool,
  closePopup: PropTypes.func,
  openPopup: PropTypes.func,
  resolveDisputeReject: PropTypes.func,
  resolveDisputeCredit: PropTypes.func,
  resolveDisputeAccept: PropTypes.func,
  downloadDisputeAttachment: PropTypes.func,
  openOrderDetail: PropTypes.func,
  downloadPdf: PropTypes.func,
  downloadAttachment: PropTypes.func
}

Detail.defaultValues = {
  order: {},
  intl: {},
  echoSupportPhone: 'N/A',
  isDetailFetching: false,
  isOpenPopup: false,
  loading: false,
  isCancelable: false,
  closePopup: () => {},
  openPopup: () => {},
  resolveDisputeReject: () => {},
  resolveDisputeCredit: () => {},
  resolveDisputeAccept: () => {},
  downloadDisputeAttachment: () => {},
  openOrderDetail: () => {},
  downloadPdf: () => {},
  downloadAttachment: () => {}  
}

export default injectIntl(withToastManager(Detail))
