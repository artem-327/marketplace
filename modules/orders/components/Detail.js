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
  GridRow,
  Dropdown
} from 'semantic-ui-react'
import { ChevronDown, DownloadCloud } from 'react-feather'
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
import SaleAttachingProductOffer from './components/SaleAttachingProductOffer'

import confirm from '~/src/components/Confirmable/confirm'
import moment from 'moment/moment'
import { FormattedPhone } from '~/components/formatted-messages/'
import { withToastManager } from 'react-toast-notifications'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import { injectIntl, FormattedNumber } from 'react-intl'
import { currency } from '~/constants/index'
import { AttachmentManager } from '~/modules/attachments'
import ProdexGrid from '~/components/table'
import { getLocaleDateFormat } from '~/components/date-format'

const OrderSegment = styled(Segment)`
  width: calc(100% - 64px);
  margin-left: 32px !important;
  margin-bottom: 30px !important;

  > .grid {
    padding: 0;

    > .row {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    > .column,
    > .row > .column {
      padding: 20px !important;
    }
  }

  h1.header {
    height: 17px;
    margin: 0 0 10px;
    padding: 0;
    font-size: 14px !important;
    font-weight: 700 !important;
    color: #20273a;
    line-height: 1.2142857;

    ~ a {
      display: inline-block;
      height: 32px;
      border: 1px solid #2599d5;
      border-radius: 3px;
      padding: 5px 14px;
      background-color: #ddf1fc;
      font-size: 13px !important;
      font-weight: 500;
      color: #2599d5;
      line-height: 1.5384615;

      svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
      }
    }
  }
`

const OrderList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: flex-end;

    > .item:nth-child(n) {
      // nth-child to have stronger path
      flex-grow: 1;
      max-width: 150px;
      border-left: 1px solid rgba(34, 36, 38, 0.15) !important;
      padding: 13px 15px !important;

      .header {
        margin: 0;
        padding: 0 0 3px;
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: 1.1666667;
      }

      .description {
        font-size: 14px;
        font-weight: 700;
        color: #20273a;
        line-height: 1.2142857;

        &.green {
          color: #84c225;
        }

        &.red {
          color: #f16844;
        }
      }
    }
  }
`

const OrderAccordion = styled(Accordion)`
  box-shadow: 0 0 0 0 transparent !important;
  background: transparent !important;

  > .title {
    border: solid 1px #dee2e6 !important;
    border-radius: 4px;
    background-color: #f8f9fb !important;

    &.active {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  > .content {
    border: 1px solid #dee2e6;
    border-top: 0 none !important;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 15px 1em !important;
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);

    + .title {
      margin-top: 10px !important;
    }

    .table-responsive {
      .ui.table {
        width: calc(100% - 32px);
        margin: 16px;
        border: 0 none;

        th.p-0,
        td.p-0 {
          width: 0 !important;
          padding: 0 !important;
        }

        span.product-name {
          font-weight: 500;
        }
      }
    }
  }
`

const AccordionTitle = styled(Accordion.Title)`
  padding-left: 9px !important;
  text-transform: uppercase;
  font-size: 1rem !important;
  color: #20273a !important;
  line-height: 1.9285714;

  svg {
    transform: rotate(-90deg);
    color: #2599d5 !important;
  }

  &.active {
    color: #20273a !important;

    svg {
      transform: rotate(0deg);
      color: #2599d5 !important;
    }
  }
`

const Chevron = styled(ChevronDown)`
  width: 20px;
  height: 20px;
  margin: 3px 6px 4px;
  vertical-align: top;
  font-size: 20px;
  color: #2599d5 !important;
`

const GridData = styled(Grid)`
  padding-top: 1em !important;
  padding-bottom: 1em !important;

  > .column:not(.row),
  > .row > .column,
  &.column > .column:not(.row),
  &.column > .row > .column {
    &[class*='key'] {
      width: 181px !important;

      + * {
        width: calc(100% - 211px) !important;
      }
    }
  }
`

const GridDataColumn = styled(Grid.Column)`
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  font-size: 14px !important;
  line-height: 1.4285714 !important;

  &.key {
    padding-left: 30px !important;
    padding-right: 0 !important;
    font-size: 14px;
    font-weight: 400;
    color: #848893;
    line-height: 2.86;
  }
`

const StyledTable = styled(Table)`
  width: 100% !important;
  margin: -10px 0 !important;
  padding: 0 !important;

  thead,
  tbody,
  tfoot {
    tr {
      th,
      td {
        border: 0 none !important;
        padding: 10px 0 10px 30px !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        color: #848893 !important;
        line-height: 1.4285714 !important;

        &:first-child {
          padding-left: 16px !important;
        }

        &:last-child {
          padding-right: 16px !important;
          color: #20273a !important;
        }
      }
    }
  }
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

const DocumentsDropdown = styled(Dropdown)`
  z-index: 601 !important;
  margin-left: 16px;
`

class Detail extends Component {
  state = {
    activeIndexes: [true, true, true, false, false, false, false, false],
    columnsRelatedOrdersDetailDocuments: [
      {
        name: 'documentName',
        title: (
          <FormattedMessage id='order.detail.documents.name' defaultMessage='Document #'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'documenType',
        title: (
          <FormattedMessage id='order.detail.documents.type' defaultMessage='Type'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'documenDate',
        title: (
          <FormattedMessage id='order.detail.documents.date' defaultMessage='Document Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'documenIssuer',
        title: (
          <FormattedMessage id='order.detail.documents.issuer' defaultMessage='Issuer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      }
    ],
    isOpenManager: false,
    replaceRow: '',
    listDocumentTypes: '',
    attachmentRows: []
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { listDocumentTypes } = this.props
    let endpointType = this.props.router.query.type === 'sales' ? 'sale' : this.props.router.query.type
    this.props.loadDetail(endpointType, this.props.router.query.id)

    if (listDocumentTypes && !listDocumentTypes.length) this.props.getDocumentTypes()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { order } = this.props
    let endpointType = this.props.router.query.type === 'sales' ? 'sale' : this.props.router.query.type
    let dataCells = document.querySelectorAll('.data-list dd')
    for (let i = 0; i < dataCells.length; i++) {
      if (dataCells[i].textContent === 'N/A') {
        dataCells[i].className = 'na'
      } else {
        dataCells[i].className = ''
      }
    }

    if (
      !getSafe(() => prevState.attachmentRows.length, false) &&
      !getSafe(() => this.state.attachmentRows.length, false) &&
      !getSafe(() => prevProps.order.attachments.length, false) &&
      getSafe(() => order.attachments.length, false)
    ) {
      this.setState({
        attachmentRows: this.getRows(order.attachments)
      })
    }
  }

  componentWillUnmount() {
    this.props.clearOrderDetail()
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

  attachDocumentsManager = async newDocuments => {
    const { linkAttachmentToOrder, order, getPurchaseOrder, getSaleOrder } = this.props
    if (this.state.replaceRow) {
      await this.handleUnlink(this.state.replaceRow)
      this.setState({ replaceRow: '' })
    }
    const docArray = uniqueArrayByKey(newDocuments, 'id')

    try {
      if (docArray.length) {
        await docArray.forEach(doc => {
          linkAttachmentToOrder({ attachmentId: doc.id, orderId: order.id })
        })
      }
      let response = ''
      if (getSafe(() => this.props.router.query.type, false) === 'sales') {
        response = await getSaleOrder(order.id)
      } else {
        response = await getPurchaseOrder(order.id)
      }

      const attachmentRows = this.getRows(getSafe(() => response.value.data.attachments, []))

      this.setState({ isOpenManager: false, attachmentRows })
    } catch (error) {
      console.log(error)
    }
  }

  replaceExiting = row => {
    this.setState({ isOpenManager: true, replaceRow: row })
  }

  handleUnlink = async row => {
    const { unlinkAttachmentToOrder, order, getSaleOrder, getPurchaseOrder } = this.props
    const query = {
      attachmentId: row.id,
      orderId: order.id
    }
    try {
      await unlinkAttachmentToOrder(query)
      let response = ''
      if (getSafe(() => this.props.router.query.type, false) === 'sales') {
        response = await getSaleOrder(order.id)
      } else {
        response = await getPurchaseOrder(order.id)
      }

      const attachmentRows = this.getRows(getSafe(() => response.value.data.attachments, []))
      this.setState({ attachmentRows })
    } catch (err) {
      console.error(err)
    }
  }

  getMimeType = documentName => {
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

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  prepareLinkToAttachment = async documentId => {
    let downloadedFile = await this.props.downloadAttachment(documentId)
    const fileName = this.extractFileName(downloadedFile.value.headers['content-disposition'])
    const mimeType = fileName && this.getMimeType(fileName)
    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)
    element.href = fileURL

    return element
  }

  extractFileName = contentDispositionValue => {
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

  getRows = attachments => {
    if (attachments && attachments.length) {
      return attachments.map(row => {
        return {
          id: row.id,
          documentTypeId: getSafe(() => row.documentType.id, 'N/A'),
          documentName: (
            <Button as='a' onClick={() => this.downloadAttachment(row.name, row.id)}>
              <Icon name='download' />
              {row.name}
            </Button>
          ),
          documenType: getSafe(() => row.documentType.name, 'N/A'),
          documenDate: row.expirationDate
            ? getSafe(() => moment(row.expirationDate).format(getLocaleDateFormat()), 'N/A')
            : 'N/A',
          documenIssuer: getSafe(() => row.issuer, 'N/A')
        }
      })
    } else {
      return []
    }
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
      isPaymentCancellable,
      opendSaleAttachingProductOffer,
      listDocumentTypes,
      loadingRelatedDocuments,
      intl: { formatMessage }
    } = this.props
    const { activeIndexes } = this.state
    let ordersType = router.query.type.charAt(0).toUpperCase() + router.query.type.slice(1)

    let orderDate = moment(order.orderDate, 'MMM Do, YYYY h:mm:ss A')

    const keyColumn = 5
    const valColumn = 16 - keyColumn

    return (
      <div id='page' className='auto-scrolling'>
        <div class='scroll-area'>
          <Divider hidden />
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
                      {ordersType} <FormattedMessage id='order' defaultMessage='Order' />
                      {isDetailFetching ? '' : '# ' + order.id}
                    </Header>
                    <a
                      onClick={() => this.downloadOrder()}
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
                          <FormattedMessage id='order.shippingStatus' defaultMessage='Shipping Status' />
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
                    {order.creditStatus && (
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
                </Grid.Column>
              </GridRow>
            </Grid>
          </OrderSegment>
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
              {opendSaleAttachingProductOffer ? <SaleAttachingProductOffer /> : null}

              <Divider hidden />
              <OrderAccordion
                defaultActiveIndex={[0, 1]}
                styled
                fluid
                style={{ width: 'calc(100% - 64px)', margin: '0 32px' }}>
                <AccordionTitle
                  active={activeIndexes[0]}
                  index={0}
                  onClick={this.handleClick}
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
                                        <FormattedMessage id='order.echoFees' defaultMessage='Echo Fees' />
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
                  onClick={this.handleClick}
                  data-test='orders_detail_product_info'>
                  <Chevron />
                  <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[1]}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={10}>
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
                          ].concat(listDocumentTypes)}
                          value={this.state.listDocumentTypes}
                          selection
                          onChange={(event, { name, value }) => {
                            const rows = this.getRows(order.attachments)
                            const attachmentRows = value === 0 ? rows : rows.filter(row => row.documentTypeId === value)
                            this.setState({
                              [name]: value,
                              attachmentRows
                            })
                          }}
                          name='listDocumentTypes'
                          placeholder={formatMessage({
                            id: 'order.detail.documents.dropdown',
                            defaultMessage: 'Select Type'
                          })}
                        />
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <AttachmentManager
                          isOpenManager={this.state.isOpenManager}
                          asModal
                          returnSelectedRows={rows => this.attachDocumentsManager(rows)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column style={{ paddingLeft: '30px' }}>
                        <ProdexGrid
                          removeFlexClass={true}
                          loading={loadingRelatedDocuments}
                          tableName='related_orders_detail_documents'
                          columns={this.state.columnsRelatedOrdersDetailDocuments}
                          rows={this.state.attachmentRows}
                          hideCheckboxes
                          rowActions={[
                            {
                              text: formatMessage({
                                id: 'global.replaceExisting',
                                defaultMessage: 'Replace Existing'
                              }),
                              callback: row => this.replaceExiting(row)
                            },
                            {
                              text: formatMessage({
                                id: 'global.unlink',
                                defaultMessage: 'Unlink'
                              }),
                              callback: row => this.handleUnlink(row)
                            }
                          ]}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Accordion.Content>

                <AccordionTitle
                  active={activeIndexes[2]}
                  index={2}
                  onClick={this.handleClick}
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
                          {ordersType === 'Sales' && (
                            <>
                              <Table.HeaderCell>
                                <FormattedMessage id='order.unitCost' defaultMessage='Unit Cost' />
                              </Table.HeaderCell>
                            </>
                          )}
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
                  onClick={this.handleClick}
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
                            <FormattedMessage id='order.shippingContact' defaultMessage='Shipping Contact' />
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{order.shippingContact}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.contactNumber' defaultMessage='Contact Number' />
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{order.contactNumber}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.contactEmail' defaultMessage='Contact E-Mail' />
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{order.contactEmail}</GridDataColumn>
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
                      onClick={this.handleClick}
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
                  onClick={this.handleClick}
                  data-test='orders_detail_shipping'>
                  <Chevron />
                  <FormattedMessage id='order.shipping' defaultMessage='Shipping' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[5]}>
                  <Grid divided='horizontally'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <GridData columns={2}>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.shippingStatus' defaultMessage='Shipping Status' />
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
                          <GridDataColumn width={valColumn}>{order.shippingTrackingCode}</GridDataColumn>
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
                  onClick={this.handleClick}
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
                  onClick={this.handleClick}
                  data-test='orders_detail_notes'>
                  <Chevron />
                  <FormattedMessage id='order.detailNotes' defaultMessage='NOTES' />
                </AccordionTitle>
                <Accordion.Content active={activeIndexes[7]}>
                  <Grid.Row>
                    <Grid.Column>{getSafe(() => this.props.order.note, '')}</Grid.Column>
                  </Grid.Row>
                </Accordion.Content>
              </OrderAccordion>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default injectIntl(withToastManager(Detail))
