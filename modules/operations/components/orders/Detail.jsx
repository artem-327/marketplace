import { useEffect, useState } from 'react'
import '../../../../components/AddInventory.scss'
import Spinner from '../../../../components/Spinner/Spinner'
import Link from 'next/link'
import { Grid, Segment, Accordion, Table, List, Button, Icon, Divider, Header, GridRow, Modal } from 'semantic-ui-react'
import { DownloadCloud, ArrowLeft } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import moment from 'moment/moment'
import { FormattedPhone } from '../../../../components/formatted-messages/'
import { withToastManager } from 'react-toast-notifications'
import { getSafe } from '../../../../utils/functions'
import { injectIntl, FormattedNumber } from 'react-intl'
import { currency } from '../../../../constants/index'
import ProdexGrid from '../../../../components/table'
import { getLocaleDateFormat } from '../../../../components/date-format'
import TransactionInfo from '../../../orders/components/components/TransactionInfo'
import { Info } from 'react-feather'
// Components
import ModalResolveDispute from './ModalResolveDispute'
import BasicButton from '../../../../components/buttons/BasicButton'
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
  StyledHeader
} from '../../styles'


const Detail = props => {
  const columnsRelatedOrdersDetailDocuments = [
    {
      name: 'documentName',
      title: (
        <FormattedMessage id='order.detail.documents.name' defaultMessage='Document #' />
      ),
      width: 150
    },
    {
      name: 'documenType',
      title: (
        <FormattedMessage id='order.detail.documents.type' defaultMessage='Type' />
      ),
      width: 150
    },
    {
      name: 'documenDate',
      title: (
        <FormattedMessage id='order.detail.documents.date' defaultMessage='Document Date' />
      ),
      width: 150
    },
    {
      name: 'documenIssuer',
      title: (
        <FormattedMessage id='order.detail.documents.issuer' defaultMessage='Issuer' />
      ),
      width: 150
    },
    {
      name: 'download',
      title: (
        <FormattedMessage id='global.download' defaultMessage='Download' />
      ),
      width: 150,
      align: 'center'
    }
  ]
  
  const [state, setState] = useState({
    activeIndexes: [true, true, true, false, false, false, false, false],
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

  const downloadOrder = async () => {
    let endpointType = 'sale'
    let pdf = await props.downloadPdf(endpointType, props.order.id)

    const element = document.createElement('a')
    const file = new Blob([pdf.value.data], { type: 'application/pdf' })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    element.download = `${endpointType}-order-${props.order.id}.pdf`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexes } = state

    activeIndexes[index] = activeIndexes[index] ? false : true

    setState({ ...state, activeIndexes })
  }

  const getMimeType = documentName => {
    const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)

    switch (documentExtension) {
      case 'doc':
        return 'application/msword'
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      case 'ppt':
        return 'application/vnd.ms-powerpoint'
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      case 'xls':
        return 'application/vnd.ms-excel'
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      case 'gif':
        return 'image/gif'
      case 'png':
        return 'image/png'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'svg':
        return 'image/svg'
      case 'pdf':
        return 'application/pdf'
      case '7z':
        return 'application/x-7z-compressed'
      case 'zip':
        return 'application/zip'
      case 'tar':
        return 'application/x-tar'
      case 'rar':
        return 'application/x-rar-compressed'
      case 'xml':
        return 'application/xml'
      default:
        return 'text/plain'
    }
  }

  const downloadAttachment = async (documentName, documentId) => {
    const element = await prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const prepareLinkToAttachment = async documentId => {
    let downloadedFile = await props.downloadAttachment(documentId)
    const fileName = extractFileName(downloadedFile.value.headers['content-disposition'])
    const mimeType = fileName && getMimeType(fileName)
    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)
    element.href = fileURL

    return element
  }

  const extractFileName = contentDispositionValue => {
    var filename = ''
    if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      var matches = filenameRegex.exec(contentDispositionValue)
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '')
      }
    }
    return filename
  }

  const getRows = attachments => {
    if (attachments && attachments.length) {
      return attachments.map(row => {
        return {
          id: row.id,
          documentTypeId: getSafe(() => row.documentType.id, 'N/A'),
          documentName: (
            <Button as='a' onClick={() => downloadAttachment(row.name, row.id)}>
              {row.name}
            </Button>
          ),
          documenType: getSafe(() => row.documentType.name, 'N/A'),
          documenDate: row.expirationDate
            ? getSafe(() => moment(row.expirationDate).format(getLocaleDateFormat()), 'N/A')
            : 'N/A',
          documenIssuer: getSafe(() => row.issuer, 'N/A'),
          download: (
            <a href='#' onClick={() => downloadAttachment(row.name, row.id)}>
              <Icon name='file' className='positive' />
            </a>
          )
        }
      })
    } else {
      return []
    }
  }

  const openRelatedPopup = (attachments, name) => {
    setState({
      ...state,
      openDocumentsPopup: true,
      openDocumentsAttachments: attachments,
      documentsPopupProduct: name
    })
  }

  const getRelatedDocumentsContent = () => {
    const {
      intl: { formatMessage }
    } = props
    let { openDocumentsAttachments } = state

    const rowsDocuments = openDocumentsAttachments.map(att => ({
      id: att.id,
      documentName: (
        <Button as='a' onClick={() => downloadAttachment(att.name, att.id)}>
          {att.name}
        </Button>
      ),
      documenType: att.documentType.name,
      documenDate: 'N/A',
      documenIssuer: 'N/A',
      download: (
        <a href='#' onClick={() => downloadAttachment(att.name, att.id)}>
          <Icon name='file' className='positive' />
        </a>
      )
    }))
    return (
      <ProdexGrid
        loading={state.submitting}
        tableName='related_orders'
        columns={columnsRelatedOrdersDetailDocuments}
        rows={rowsDocuments}
      />
    )
  }

  const {
    order,
    isDetailFetching,
    intl: { formatMessage },
    echoSupportPhone,
    editTrackingCode,
    closePopup,
    isOpenPopup,
    loading,
    openPopup,
    resolveDisputeReject,
    resolveDisputeCredit,
    resolveDisputeAccept,
    downloadDisputeAttachment
  } = props

  const { activeIndexes, documentsPopupProduct } = state
  let ordersType = 'Sales'

  const keyColumn = 5
  const valColumn = 16 - keyColumn

  return (
    <div id='page' className='auto-scrolling'>
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
          <Modal.Content scrolling>{getRelatedDocumentsContent()}</Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => setState({ ...state, openDocumentsPopup: false })}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}
      <div className='scroll-area'>
        <TopRow>
          <Link href='/operations/orders'>
            <a
              onClick={() => props.openOrderDetail(null)}
              style={{ cursor: 'pointer' }}
              data-test='orders_detail_back_btn'>
              <ArrowLeft />
              <FormattedMessage id='order.detail.backToOrders' defaultMessage='Back to Orders' />
            </a>
          </Link>
          <div className='field'>
            <div>
              <FormattedMessage id='order.detail.buyerCompanyEin' defaultMessage='Buyer Company EIN' />
            </div>
            <div>
              <strong>{order.companyEin}</strong>
            </div>
          </div>
        </TopRow>
        <OrderSegment>
          <Grid verticalAlign='middle'>
            <GridRow>
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
                    onClick={() => downloadOrder()}
                    style={{ fontSize: '1.14285714em', cursor: 'pointer' }}
                    data-test='orders_detail_download_order'>
                    <DownloadCloud />
                    <FormattedMessage id='global.download' defaultMessage='Download' />
                  </a>
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
              defaultActiveIndex={[0, 1]}
              styled
              fluid
              style={{ width: 'calc(100% - 64px)', margin: '0 32px' }}>
              <AccordionTitle
                active={activeIndexes[0]}
                index={0}
                onClick={handleClick}
                data-test='orders_detail_order_info'>
                <Chevron />
                <FormattedMessage id='order.orderInfo' defaultMessage='Order Info' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[0]}>
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
                          {ordersType === 'Sales' ? (
                            <>
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
                                    <Table.Cell textAlign='right'>{order.echoFee}</Table.Cell>
                                  </TableRowData>
                                </Table.Body>
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
                            </>
                          ) : (
                            <>
                              <StyledTable basic='very' collapsing singleLine className='order-total'>
                                <Table.Header>
                                  <TableRowData>
                                    <Table.HeaderCell>
                                      <FormattedMessage id='order.subtotal' defaultMessage='Subtotal' />
                                    </Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'>{order.subtotal}</Table.HeaderCell>
                                  </TableRowData>
                                </Table.Header>
                                <Table.Body>
                                  <TableRowData>
                                    <Table.Cell>
                                      <FormattedMessage id='order.shipping' defaultMessage='Shipping' />
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>{order.freight}</Table.Cell>
                                  </TableRowData>
                                  <TableRowData>
                                    <Table.Cell>
                                      <FormattedMessage id='order.tax' defaultMessage='Tax' />
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>{'$0'}</Table.Cell>
                                  </TableRowData>
                                </Table.Body>
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
                            </>
                          )}
                        </GridDataColumn>
                      </GridData>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              <AccordionTitle
                active={activeIndexes[1]}
                index={1}
                onClick={handleClick}
                data-test='orders_detail_product_info'>
                <Chevron />
                <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[1]}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column style={{ paddingLeft: '30px', paddingRight: '2.2857143em' }}>
                      <ProdexGrid
                        displayRowActionsOverBorder
                        removeFlexClass={true}
                        tableName='related_orders_detail_documents'
                        columns={columnsRelatedOrdersDetailDocuments}
                        rows={getRows(order.attachments)}
                        hideCheckboxes
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              <AccordionTitle
                active={activeIndexes[2]}
                index={2}
                onClick={handleClick}
                data-test='orders_detail_product_info'>
                <Chevron />
                <FormattedMessage id='order.productInfo' defaultMessage='Product Info' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[2]}>
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
                                  onClick={() => openRelatedPopup(order.orderItems[index].attachments, element)}>
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
                active={activeIndexes[3]}
                index={3}
                onClick={handleClick}
                data-test='orders_detail_pickup_info'>
                <Chevron />
                <FormattedMessage id='order.pickupInfo' defaultMessage='Pick Up Info' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[3]}>
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
                    active={activeIndexes[4]}
                    index={4}
                    onClick={handleClick}
                    data-test='orders_detail_return_shipping'>
                    <Chevron />
                    <FormattedMessage id='order.returnShipping' defaultMessage='Return Shipping' />
                  </AccordionTitle>
                  <Accordion.Content active={activeIndexes[4]}>
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
                active={activeIndexes[5]}
                index={5}
                onClick={handleClick}
                data-test='orders_detail_shipping'>
                <Chevron />
                <FormattedMessage id='order.deliveryInfo' defaultMessage='Delivery Info' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[5]}>
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
                active={activeIndexes[6]}
                index={6}
                onClick={handleClick}
                data-test='orders_detail_payment'>
                <Chevron />
                <FormattedMessage id='order.payment' defaultMessage='Payment' /> / {order.paymentType}
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[6]}>
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
                active={activeIndexes[7]}
                index={7}
                onClick={handleClick}
                data-test='orders_detail_notes'>
                <Chevron />
                <FormattedMessage id='order.detailNotes' defaultMessage='NOTES' />
              </AccordionTitle>
              <Accordion.Content active={activeIndexes[7]}>
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

export default injectIntl(withToastManager(Detail))
