import { useState, useEffect } from 'react'
import '../../../components/AddInventory.scss'
import Spinner from '../../../components/Spinner/Spinner'
import {
  Grid,
  Segment,
  Accordion,
  AccordionContent,
  GridColumn,
  Table,
  List,
  Label,
  Button,
  Icon,
  Divider,
  Header,
  Popup,
  GridRow,
  Dropdown,
  Input,
  Dimmer,
  Modal
} from 'semantic-ui-react'
import { ArrowLeft, ChevronDown, DownloadCloud, PlusCircle, UploadCloud, Link2 } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import ActionsRequired from './components/ActionsRequiredContainer'
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
import SaleAttachingProductOffer from './components/SaleAttachingProductOffer'

import confirm from '../../../components/Confirmable/confirm'
import moment from 'moment/moment'
import { FormattedPhone } from '../../../components/formatted-messages/'
import { withToastManager } from 'react-toast-notifications'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '../../../utils/functions'
import { injectIntl, FormattedNumber } from 'react-intl'
import { AttachmentManager } from '../../attachments'
import ProdexGrid from '../../../components/table'
import { getLocaleDateFormat } from '../../../components/date-format'
import TransactionInfo from './components/TransactionInfo'

import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle,
  InfoIcon
} from '../../cart/components/StyledComponents'
// Components
import ModalOrderResolution from './components/ModalOrderResolution'
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
  DocumentsDropdown,
  GridDataColumnTrackingID,
  CustomInput,
  CustomButton,
  PlusIcon,
  CustomA,
  TopRow,
  StyledModal,
  DivIcon,
  AIcon,
  UploadCloudIcon,
  StyledHeader,
  CustomDivAddDocument
} from './Detail.styles'


const Detail = props => {

  const [activeIndexes, setActiveIndexes] = useState([true, true, true, true, false, false, false, false, false])
  const [isOpenManager, setIsOpenManager] = useState(false)
  const [replaceRow, setReplaceRow] = useState('')
  const [listDocumentTypes, setListDocumentTypes] = useState('')
  const [attachmentRows, setAttachmentRows] = useState([])
  const [toggleTrackingID, setToggleTrackingID] = useState(false)
  const [toggleReturnShippingTrackingCode, setToggleReturnShippingTrackingCode] = useState(false)
  const [shippingTrackingCode, setShippingTrackingCode] = useState('')
  const [returnShippingTrackingCode, setReturnShippingTrackingCode] = useState('')
  const [openDocumentsPopup, setOpenDocumentsPopup] = useState(false)
  const [openDocumentsAttachments, setOpenDocumentsAttachments] = useState([])
  const [documentsPopupProduct, setDocumentsPopupProduct] = useState('')
  const [orderItemId, setOrderItemId] = useState(null)
  const [changedTypeOrder, setChangedTypeOrder] = useState(false)

  const columnsRelatedOrdersDetailDocuments = [
    {
      name: 'documentName',
      title: (
        <FormattedMessage id='order.detail.documents.name' defaultMessage='Document #' />
      ),
      width: 150
    },
    {
      name: 'documentType',
      title: (
        <FormattedMessage id='order.detail.documents.type' defaultMessage='Type' />
      ),
      width: 150
    },
    {
      name: 'documentDate',
      title: (
        <FormattedMessage id='order.detail.documents.date' defaultMessage='Document Date' />
      ),
      width: 150
    },
    {
      name: 'documentIssuer',
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

  useEffect(() => {
    let endpointType = props.router.query.type === 'sales' ? 'sale' : props.router.query.type
    props.loadDetail(endpointType, props.router.query.id)

    if (props.listDocumentTypes && !props.listDocumentTypes.length) props.getDocumentTypes()

    setShippingTrackingCode(getSafe(() => props.order.shippingTrackingCode, ''))
    setReturnShippingTrackingCode(getSafe(() => props.order.returnShippingTrackingCode, ''))

    return () => {
      props.clearOrderDetail()
    }
  }, [])


  const getRows = attachments => {
    if (attachments && attachments.length) {
      return attachments.map(row => {
        return {
          id: row.id,
          documentTypeId: getSafe(() => row.documentType.id, 'N/A'),
          documentName: (
            <Button as='a' onClick={() => downloadAttachment(row.name, row.id)}>
              <Icon name='download' />
              {row.name}
            </Button>
          ),
          documentType: getSafe(() => row.documentType.name, 'N/A'),
          documentDate: row.issuedAt
            ? getSafe(() => moment(row.issuedAt).format(getLocaleDateFormat()), 'N/A')
            : 'N/A',
          documentIssuer: getSafe(() => row.issuer, 'N/A'),
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

  useEffect(() => {
    if (changedTypeOrder) {
      let endpointType = props.router.query.type === 'sales' ? 'sale' : props.router.query.type
      props.loadDetail(endpointType, props.router.query.id)

      if (props.listDocumentTypes && !props.listDocumentTypes.length) props.getDocumentTypes()
      
      setShippingTrackingCode(getSafe(() => props.order.shippingTrackingCode, ''))
      setReturnShippingTrackingCode(getSafe(() => props.order.returnShippingTrackingCode, ''))
      setChangedTypeOrder(false)
    }
  }, [changedTypeOrder])

  useEffect(() => {
    setShippingTrackingCode(props.order.shippingTrackingCode)
  }, [getSafe(() => props.order.shippingTrackingCode, '')])

  useEffect(() => {
    setReturnShippingTrackingCode(props.order.returnShippingTrackingCode)
  }, [getSafe(() => props.order.returnShippingTrackingCode, '')])

  useEffect(() => {
    let dataCells = document.querySelectorAll('.data-list dd')
    for (let i = 0; i < dataCells.length; i++) {
      if (dataCells[i].textContent === 'N/A') {
        dataCells[i].className = 'na'
      } else {
        dataCells[i].className = ''
      }
    }

    if (
      !getSafe(() => attachmentRows.length, false) &&
      getSafe(() => props.order.attachments.length, false)
    ) {
      setAttachmentRows(getRows(props.order.attachments))
    }
  }, [getSafe(() => props.order.attachments, []), getSafe(() => props.order.id, 0)])


  const downloadOrder = async () => {
    let endpointType = props.router.query.type === 'sales' ? 'sale' : props.router.query.type
    let pdf = await props.downloadPdf(endpointType, props.order.id)

    const element = document.createElement('a')
    const file = new Blob([pdf.value.data], { type: 'application/pdf' })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    element.download = `${props.router.query.type}-order-${props.order.id}.pdf`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const handleClick = (index) => {
    let newActiveIndexes = activeIndexes.map((s, _i) => {
      return index === _i ? !s : s
    })
    setActiveIndexes(newActiveIndexes)
  }

  const attachDocumentsManager = async newDocuments => {
    const { linkAttachmentToOrder, order, getPurchaseOrder, getSaleOrder } = props
    setOpenDocumentsPopup(false)

    if (replaceRow) {
      await handleUnlink(replaceRow)
      setReplaceRow('')
    }
    const docArray = uniqueArrayByKey(newDocuments, 'id')

    try {
      if (docArray.length) {
        await docArray.forEach(doc => {
          linkAttachmentToOrder({ attachmentId: doc.id, orderId: order.id })
        })
      }
      let response = {}
      if (getSafe(() => props.router.query.type, false) === 'sales') {
        response = await getSaleOrder(order.id)
      } else {
        response = await getPurchaseOrder(order.id)
      }

      setIsOpenManager(false)
      setAttachmentRows(getRows(getSafe(() => response.value.data.attachments, [])))
    } catch (error) {
      console.error(error)
    }
  }

  const replaceExiting = row => {
    setIsOpenManager(true)
    setReplaceRow(row)
  }

  const handleUnlink = async row => {
    const { unlinkAttachmentToOrder, order, getSaleOrder, getPurchaseOrder } = props
    const query = {
      attachmentId: row.id,
      orderId: order.id
    }
    try {
      await unlinkAttachmentToOrder(query)
      let response = {}
      if (getSafe(() => props.router.query.type, false) === 'sales') {
        response = await getSaleOrder(order.id)
      } else {
        response = await getPurchaseOrder(order.id)
      }

      setAttachmentRows(getRows(getSafe(() => response.value.data.attachments, [])))
    } catch (err) {
      console.error(err)
    }
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

  const openRelatedPopup = (orderItem, name) => {
    setOpenDocumentsPopup(true)
    setOpenDocumentsAttachments(orderItem.attachments)
    setDocumentsPopupProduct(name)
    setOrderItemId(orderItem.id)
  }

  const getRelatedDocumentsContent = () => {
    const rowsDocuments = openDocumentsAttachments.map(att => ({
      id: att.id,
      documentName: (
        <Button as='a' onClick={() => downloadAttachment(att.name, att.id)}>
          {att.name}
        </Button>
      ),
      documentType: att.documentType.name,
      documentDate: 'N/A',
      documentIssuer: 'N/A',
      download: (
        <a href='#' onClick={() => downloadAttachment(att.name, att.id)}>
          <Icon name='file' className='positive' />
        </a>
      )
    }))
    return (
      <>
        <CustomDivAddDocument>
          <div>
            <AttachmentManager
              documentTypeIds={[]}
              isOpenManager={isOpenManager}
              asModal
              returnSelectedRows={rows => linkAttachment(rows, orderItemId)}
              returnCloseAttachmentManager={val => setIsOpenManager(false)}
            />
          </div>
        </CustomDivAddDocument>
        <ProdexGrid
          loading={props.loadingRelatedDocuments}
          tableName='related_orders'
          columns={columnsRelatedOrdersDetailDocuments}
          rows={rowsDocuments}
        />
      </>
    )
  }

  const removeAttachment = (orderItemId, file) => {
    const query = {
      attachmentId: file.id,
      orderItemId: orderItemId
    }

    props.removeLinkAttachmentToOrderItem(query)
  }

  const linkAttachment = async (files, orderItemId) => {
    const { order, getSaleOrder, getPurchaseOrder } = props

    const docArray = uniqueArrayByKey(files, 'id')
    let newAttachments = openDocumentsAttachments
    try {
      if (docArray.length) {
        await docArray.forEach(doc => {
          props.linkAttachmentToOrderItem({ attachmentId: doc.id, orderItemId: orderItemId })
          doc && newAttachments.push(doc)
        })
      }
      setOpenDocumentsAttachments(newAttachments)
      setTimeout(async () => {
        if (getSafe(() => props.router.query.type, false) === 'sales') {
          await getSaleOrder(order.id)
        } else {
          await getPurchaseOrder(order.id)
        }
      }, 250)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

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
    isPaymentCancellable,
    opendSaleAttachingProductOffer,
    loadingRelatedDocuments,
    intl: { formatMessage },
    echoSupportPhone,
    editTrackingCode,
    editReturnTrackingCode,
    isOrderProcessing,
    isCompanyAdmin,
    isAdmin,
    openedDisputedRequest,
    isSending,
    orderResolutionAccept,
    orderResolutionReopen,
    closePopup,
    appInfo
  } = props
  
  let ordersType = router.query.type.charAt(0).toUpperCase() + router.query.type.slice(1)
  let oppositeOrderType = ordersType === 'Sales' ? 'purchase' : 'sales'
  let orderDate = moment(order.orderDate, 'MMM Do, YYYY h:mm:ss A')
  const keyColumn = 5
  const valColumn = 16 - keyColumn

  const test = true
  const { counterOrderId } = order

  return (
    <div id='page' className='auto-scrolling'>
      {openDocumentsPopup && (
        <StyledModal
          size='Default'
          closeIcon={false}
          onClose={() => setOpenDocumentsPopup(false)}
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
            <Button basic onClick={() => setOpenDocumentsPopup(false)}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}
      <div className='scroll-area'>
        <TopRow>
          <a
            onClick={() => router.push(`/orders/${ordersType.toLowerCase()}`)}
            style={{ cursor: 'pointer' }}
            data-test='orders_detail_back_btn'>
            <ArrowLeft />
            <FormattedMessage id='order.detail.backToOrders' defaultMessage='Back to Orders' />
          </a>
          {counterOrderId ? (
            <a
              onClick={async () => {
                await router.push(`/orders/detail?type=${oppositeOrderType}&id=${counterOrderId}`)
                setChangedTypeOrder(true)
              }}
              style={{ cursor: 'pointer' }}
              data-test='orders_detail_view_linked_order_btn'>
              <Link2 />
              <FormattedMessage id='order.detail.viewLinkedOrder' defaultMessage='View Linked Order' />
            </a>
          ) : null}
        </TopRow>
        <OrderSegment loading={isDetailFetching || Object.keys(order).length === 0}>
          <Grid verticalAlign='middle'>
            <GridRow>
              <GridColumn width={4}>
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
                    {ordersType} <FormattedMessage id='order' defaultMessage='Order' />
                    {isDetailFetching ? '' : '# ' + order.id}
                  </Header>
                  <a
                    onClick={() => downloadOrder()}
                    style={{ fontSize: '1.14285714em', cursor: 'pointer' }}
                    data-test='orders_detail_download_order'>
                    <DownloadCloud />
                    <FormattedMessage
                      id='order.downloadOrder'
                      defaultMessage={`Download ${getSafe(() => order.orderType.charAt(0), '')}O`}
                      values={{ orderType: getSafe(() => order.orderType.charAt(0), '') }}
                    />
                  </a>
                </div>
              </GridColumn>
              <GridColumn width={12}>
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
                  {/* Commented based on https://bluepallet.atlassian.net/browse/DT-144 */}
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
                        {order.orderType === 'Purchase' &&
                        order.paymentStatus === 'Pending' &&
                        isPaymentCancellable ? (
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
                </OrderList>
              </GridColumn>
            </GridRow>
          </Grid>
        </OrderSegment>
        {isDetailFetching || Object.keys(order).length === 0 ? (
          <Dimmer inverted active>
            <Spinner />
          </Dimmer>
        ) : (
          <>
            <TransactionInfo echoSupportPhone={echoSupportPhone} order={order} />
            {isAdmin || isCompanyAdmin || isOrderProcessing ? (
              <>
                {openedDisputedRequest ? (
                  <ModalOrderResolution
                    appInfo={appInfo}
                    order={order}
                    onClose={closePopup}
                    loading={isSending}
                    actions={{ orderResolutionAccept, orderResolutionReopen }}
                    ordersType={
                      props?.router?.query?.type === 'sales' ? 'sale' : props?.router?.query?.type
                    }
                  />
                ) : null}
                {!counterOrderId ? <ActionsRequired order={order} ordersType={ordersType} /> : null}
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
                {opendSaleAttachingProductOffer ? <SaleAttachingProductOffer orderItems={order.orderItems} /> : null}
              </>
            ) : null}
            <Divider hidden />
            <OrderAccordion
              styled
              fluid
              style={{ width: 'calc(100% - 64px)', margin: '0 32px' }}>
              <AccordionTitle
                active={activeIndexes[0]}
                index={0}
                onClick={() => handleClick(0)}
                data-test='orders_detail_order_info'>
                <Chevron />
                <FormattedMessage id={`order.${order.paymentType}`} defaultMessage={order.paymentType} />
              </AccordionTitle>
              <AccordionContent active={activeIndexes[0]}>
                <Grid divided='horizontally'>
                  <GridRow columns={2}>
                    <GridColumn>
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
                          <FormattedMessage id='order.detail.companyEin' defaultMessage='Company EIN' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.companyEin}</GridDataColumn>
                      </GridData>
                    </GridColumn>
                    <GridColumn>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          {order.paymentType} <FormattedMessage id='order.email' defaultMessage='E-Mail' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentEmail}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          {order.paymentType} <FormattedMessage id='order.contact' defaultMessage='Contact' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.paymentContact}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          {order.paymentType} <FormattedMessage id='order.phone' defaultMessage='Phone' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>
                          <FormattedPhone value={order.paymentPhone} />
                        </GridDataColumn>
                      </GridData>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </AccordionContent>
              <AccordionTitle
                active={activeIndexes[1]}
                index={1}
                onClick={() => handleClick(1)}
                data-test='orders_detail_order_info'>
                <Chevron />
                <FormattedMessage id='order.orderInfo' defaultMessage='Order Info' />
              </AccordionTitle>
              <AccordionContent active={activeIndexes[1]}>
                <Grid divided='horizontally'>
                  <GridRow>
                    <GridColumn width={6}>
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
                    </GridColumn>
                    <GridColumn width={6} floated='right'>
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
                                  {/* Commented based on https://bluepallet.atlassian.net/browse/DT-333 */}
                                  {/* <TableRowData>
                                    <Table.Cell>
                                      <FormattedMessage id='order.transactionFee' defaultMessage='Transaction Fee' />
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>{order.echoFee}</Table.Cell>
                                  </TableRowData> */}
                                  {order?.transactionFee ? (
                                    <TableRowData>
                                      <Table.Cell>
                                        <FormattedMessage id='order.brokerageFee' defaultMessage='Transaction Fee' />
                                      </Table.Cell>
                                      <Table.Cell textAlign='right'>-{order.transactionFee}</Table.Cell>
                                    </TableRowData>
                                  ) : null}
                                  {order?.brokerageFee ? (
                                    <TableRowData>
                                      <Table.Cell>
                                        <FormattedMessage id='order.brokerageFee' defaultMessage='Brokerage Fee' />
                                      </Table.Cell>
                                      <Table.Cell textAlign='right'>-{order.brokerageFee}</Table.Cell>
                                    </TableRowData>
                                  ) : null}
                                </Table.Body>
                                <Table.Footer>
                                  <TableRowData>
                                    <Table.HeaderCell>
                                      <FormattedMessage id='order.totalPrice' defaultMessage='Total Price' />
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
                                      <FormattedMessage id='order.shippingCost' defaultMessage='Shipping Cost' />
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>{order.freight}</Table.Cell>
                                  </TableRowData>
                                  {order.cfTax && (
                                    <TableRowData>
                                      <Table.Cell>
                                        <FormattedMessage id='order.tax' defaultMessage='Tax' />
                                      </Table.Cell>
                                      <Table.Cell textAlign='right'>{order.cfTax}</Table.Cell>
                                    </TableRowData>
                                  )}
                                </Table.Body>
                                <Table.Footer>
                                  <TableRowData>
                                    <Table.HeaderCell>
                                      <FormattedMessage id='order.totalPrice' defaultMessage='Total Price' />
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
                    </GridColumn>
                  </GridRow>
                </Grid>
              </AccordionContent>

              <AccordionTitle
                active={activeIndexes[2]}
                index={2}
                onClick={() => handleClick(2)}
                data-test='orders_detail_product_info'>
                <Chevron />
                <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS' />
              </AccordionTitle>
              <AccordionContent active={activeIndexes[2]}>
                <Grid>
                  <GridRow>
                    <GridColumn width={10}>
                      <DocumentsDropdown
                        options={[
                          {
                            key: 0,
                            text: formatMessage({
                              id: 'order.detail.documents.dropdown.all',
                              defaultMessage: 'Select All'
                            }),
                            value: 0
                          }
                        ].concat(props.listDocumentTypes)}
                        value={listDocumentTypes}
                        selection
                        onChange={(event, { name, value }) => {
                          const rows = getRows(order.attachments)
                          setAttachmentRows(value === 0 ? rows : rows.filter(row => row.documentTypeId === value))
                          setListDocumentTypes(value)
                        }}
                        name='listDocumentTypes'
                        placeholder={formatMessage({
                          id: 'order.detail.documents.dropdown',
                          defaultMessage: 'Select Type'
                        })}
                      />
                    </GridColumn>
                    <GridColumn width={6}>
                      <AttachmentManager
                        isOpenManager={isOpenManager}
                        asModal
                        trigger={
                          <CustomButton type='button' floated='right'>
                            <PlusIcon size='18' />
                            <FormattedMessage id='global.addDocument' defaultMessage='Add Document' />
                          </CustomButton>
                        }
                        returnSelectedRows={rows => attachDocumentsManager(rows)}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn style={{ paddingLeft: '30px', paddingRight: '2.2857143em' }}>
                      <ProdexGrid 
                        displayRowActionsOverBorder
                        removeFlexClass={true}
                        loading={loadingRelatedDocuments}
                        tableName='related_orders_detail_documents'
                        columns={columnsRelatedOrdersDetailDocuments}
                        rows={attachmentRows}
                        hideCheckboxes
                        rowActions={[
                          {
                            text: formatMessage({
                              id: 'global.replaceExisting',
                              defaultMessage: 'Replace Existing'
                            }),
                            callback: row => replaceExiting(row)
                          },
                          {
                            text: formatMessage({
                              id: 'global.unlink',
                              defaultMessage: 'Unlink'
                            }),
                            callback: row => handleUnlink(row)
                          }
                        ]}
                      />
                    </GridColumn>
                  </GridRow>
                </Grid>
              </AccordionContent>

              <AccordionTitle
                active={activeIndexes[3]}
                index={3}
                onClick={() => handleClick(3)}
                data-test='orders_detail_product_info'>
                <Chevron />
                <FormattedMessage id='order.productInfo' defaultMessage='Product Info' />
              </AccordionTitle>
              <AccordionContent active={activeIndexes[3]}>
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
                            <Table.Cell>
                              {order.orderItems[index].attachments.length ? (
                                <a href='#' onClick={() => openRelatedPopup(order.orderItems[index], element)}>
                                  <FormattedMessage id='global.view' defaultMessage='View' />
                                </a>
                              ) : ordersType !== 'Purchase' ? (
                                <AttachmentManager
                                  asModal
                                  returnSelectedRows={rows => linkAttachment(rows, order.orderItems[index].id)}
                                />
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
              </AccordionContent>

              <AccordionTitle
                active={activeIndexes[4]}
                index={4}
                onClick={() => handleClick(4)}
                data-test='orders_detail_pickup_info'>
                <Chevron />
                <FormattedMessage id='order.pickupInfo' defaultMessage='Pick Up Info' />
              </AccordionTitle>
              <AccordionContent active={activeIndexes[4]}>
                <Grid divided='horizontally'>
                  <GridRow columns={2}>
                    <GridColumn>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.pickupAddress' defaultMessage='Pick-Up Address' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.pickUpAddress}</GridDataColumn>
                      </GridData>
                    </GridColumn>
                    <GridColumn>
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
                    </GridColumn>
                  </GridRow>
                </Grid>
              </AccordionContent>

              {order.reviewStatus === 'Rejected' && (
                <>
                  <AccordionTitle
                    active={activeIndexes[5]}
                    index={5}
                    onClick={() => handleClick(5)}
                    data-test='orders_detail_return_shipping'>
                    <Chevron />
                    <FormattedMessage id='order.returnShipping' defaultMessage='Return Shipping' />
                  </AccordionTitle>
                  <AccordionContent active={activeIndexes[5]}>
                    <Grid divided='horizontally'>
                      <GridRow columns={2}>
                        <GridColumn>
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
                            <GridDataColumn width={keyColumn} className='key'>
                              <FormattedMessage id='order.returnContact' defaultMessage='Return Contact' />
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
                        </GridColumn>
                        <GridColumn>
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

                            <GridDataColumnTrackingID width={valColumn}>
                              {!order.isReturnTrackingNumberEditable ? (
                                order.returnShippingTrackingCode
                              ) : toggleReturnShippingTrackingCode ? (
                                <>
                                  <CustomInput
                                    onChange={(e, { value }) => {
                                      setReturnShippingTrackingCode(value)
                                    }}
                                    type='number'
                                    value={returnShippingTrackingCode}
                                  />
                                  <CustomButton
                                    type='button'
                                    onClick={async e => {
                                      e.preventDefault()
                                      try {
                                        await editReturnTrackingCode(order.id, returnShippingTrackingCode)
                                      } catch (error) {
                                        setReturnShippingTrackingCode(order.returnShippingTrackingCode)
                                      } finally {
                                        setToggleReturnShippingTrackingCode(false)
                                      }
                                    }}>
                                    <FormattedMessage id='global.save' defaultMessage='Save' />
                                  </CustomButton>
                                </>
                              ) : (
                                <Popup
                                  content={
                                    <FormattedMessage id='order.detail.clickToEdit' defaultMessage='Click to edit' />
                                  }
                                  trigger={
                                    <CustomA
                                      onClick={() => setToggleReturnShippingTrackingCode(true)}>
                                      {returnShippingTrackingCode ? (
                                        returnShippingTrackingCode
                                      ) : (
                                        <FormattedMessage
                                          id='order.detail.addTrackingCode'
                                          defaultMessage='Add tracking code'
                                        />
                                      )}
                                    </CustomA>
                                  }
                                />
                              )}
                            </GridDataColumnTrackingID>
                          </GridData>
                        </GridColumn>
                      </GridRow>
                    </Grid>
                  </AccordionContent>
                </>
              )}

              <AccordionTitle
                active={activeIndexes[6]}
                index={6}
                onClick={() => handleClick(6)}
                data-test='orders_detail_shipping'>
                <Chevron />
                <FormattedMessage id='order.deliveryInfo' defaultMessage='Delivery Info' />
              </AccordionTitle>
              <AccordionContent active={activeIndexes[6]}>
                <Grid divided='horizontally'>
                  <GridRow columns={2}>
                    <GridColumn>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.deliveryStatus' defaultMessage='Delivery Status' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shippingStatus}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.shipTo' defaultMessage='Ship To' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipTo}</GridDataColumn>
                        {!!order.frsId && (
                          <>
                            <GridDataColumn width={keyColumn} className='key'>
                              <FormattedMessage id='order.frsId' defaultMessage='FRS ID' />
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>{order.frsId}</GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key'>
                              <FormattedMessage id='order.epaRegion' defaultMessage='EPA Region' />
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>{order.shippingAddressEpaRegion}</GridDataColumn>
                          </>
                        )}
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.shipToAddress' defaultMessage='Ship To Address' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipToAddress}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.contactNumber' defaultMessage='Contact Number' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipToPhone}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.contactEmail' defaultMessage='Contact E-Mail' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipToEmail}</GridDataColumn>
                      </GridData>
                    </GridColumn>
                    <GridColumn>
                      <GridData columns={2}>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.shipDate' defaultMessage='Ship Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.shipDate}</GridDataColumn>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.deliveryDate' defaultMessage='Delivery Date' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.deliveryDate}</GridDataColumn>
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
                          {!order.isTrackingNumberEditable ? (
                            order.shippingTrackingCode
                          ) : toggleTrackingID ? (
                            <>
                              <CustomInput
                                onChange={(e, { value }) => {
                                  setShippingTrackingCode(value)
                                }}
                                type='number'
                                value={shippingTrackingCode}
                              />
                              <CustomButton
                                type='button'
                                onClick={async e => {
                                  e.preventDefault()
                                  try {
                                    await editTrackingCode(order.id, shippingTrackingCode)
                                  } catch (error) {
                                    setShippingTrackingCode(order.shippingTrackingCode)
                                  } finally {
                                    setToggleTrackingID(false)
                                  }
                                }}>
                                <FormattedMessage id='global.save' defaultMessage='Save' />
                              </CustomButton>
                            </>
                          ) : (
                            <Popup
                              content={
                                <FormattedMessage id='order.detail.clickToEdit' defaultMessage='Click to edit' />
                              }
                              trigger={
                                <CustomA onClick={() => setToggleTrackingID(true)}>
                                  {shippingTrackingCode ? (
                                    shippingTrackingCode
                                  ) : (
                                    <FormattedMessage
                                      id='order.detail.addTrackingCode'
                                      defaultMessage='Add tracking code'
                                    />
                                  )}
                                </CustomA>
                              }
                            />
                          )}
                        </GridDataColumnTrackingID>
                        <GridDataColumn width={keyColumn} className='key'>
                          <FormattedMessage id='order.incoterms' defaultMessage='Incoterms' />
                        </GridDataColumn>
                        <GridDataColumn width={valColumn}>{order.incoterms}</GridDataColumn>
                      </GridData>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </AccordionContent>

              <AccordionTitle
                active={activeIndexes[7]}
                index={7}
                onClick={() => handleClick(7)}
                data-test='orders_detail_payment'>
                <Chevron />
                <FormattedMessage id='order.payment' defaultMessage='Payment' />
              </AccordionTitle>
              <AccordionContent active={activeIndexes[7]}>
                <Grid divided='horizontally'>
                  <GridRow columns={1} style={{ padding: '30px 0 0 3px' }}>
                    <GridColumn style={{ padding: '0 30px' }}>
                      <Rectangle style={{ margin: '0' }}>
                        <CustomDivTitle>
                          <InfoIcon size={24} />
                          <CustomDivInTitle>
                            <FormattedMessage
                              id='cart.payment.terms.title'
                              defaultMessage={`Payment Terms Information`}
                            />
                          </CustomDivInTitle>
                        </CustomDivTitle>
                        <CustomDivContent>
                          {order.paymentTerms === 'REGULAR' ? (
                            <FormattedMessage
                              id='cart.payment.netX.content'
                              defaultMessage={`The payment terms of this order are {value}, meaning the payment for this purchase will be transferred {days} from the day it ships.`}
                              values={{
                                value: <b>Net {order.paymentNetDays}</b>,
                                days: <b>{order.paymentNetDays} days</b>
                              }}
                            />
                          ) : order.paymentTerms === 'HALF_UPFRONT' ? (
                            <FormattedMessage
                              id='cart.payment.terms50.content'
                              defaultMessage={`This purchase has payment terms of {value}. Which means, once the order is accepted, {percentage} of the payment will be withdrawn from your account and 50% will be withdrawn {shipmentDate}.`}
                              values={{
                                value: <b>50/50</b>,
                                percentage: <b>50%</b>,
                                shipmentDate: <b>{order.paymentNetDays} days after the shipment date</b>
                              }}
                            />
                          ) : (
                            <FormattedMessage
                              id='cart.payment.terms100.content'
                              defaultMessage={`This purchase has payment terms of {percentage} down. Which means, once the order is accepted, the entire payment will be withdrawn from your account.`}
                              values={{
                                percentage: <b>100%</b>
                              }}
                            />
                          )}
                        </CustomDivContent>
                      </Rectangle>
                    </GridColumn>
                  </GridRow>
                  <GridRow columns={2}>
                    <GridColumn>
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
                      </GridData>
                    </GridColumn>
                    <GridColumn>
                      <GridData columns={2}>
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
                    </GridColumn>
                  </GridRow>
                </Grid>
              </AccordionContent>
              <AccordionTitle
                active={activeIndexes[8]}
                index={8}
                onClick={() => handleClick(8)}
                data-test='orders_detail_notes'>
                <Chevron />
                <FormattedMessage id='order.detailNotes' defaultMessage='NOTES' />
              </AccordionTitle>
              <AccordionContent active={activeIndexes[8]}>
                <GridRow>
                  <GridColumn>{getSafe(() => props.order.note, '')}</GridColumn>
                </GridRow>
              </AccordionContent>
            </OrderAccordion>
          </>
        )}
      </div>
    </div>
  )
}

export default injectIntl(withToastManager(Detail))
