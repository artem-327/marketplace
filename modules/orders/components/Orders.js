import React, { Component } from 'react'
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { Modal, Menu, Header, Container, Grid, Icon, Button, Dimmer, Loader, Dropdown } from 'semantic-ui-react'
import styled, { withTheme } from 'styled-components'

import Spinner from '~/src/components/Spinner/Spinner'
import ProdexGrid from '~/components/table'
import { actions } from 'react-redux-form'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { filterPresets } from '~/modules/filter/constants/filter'
import { currency } from '~/constants/index'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import Link from 'next/link'
import { UploadCloud, CheckCircle, PlusCircle } from 'react-feather'
import { handleFiltersValue } from '~/modules/settings/actions'
import { withToastManager } from 'react-toast-notifications'
import { AttachmentManager } from '~/modules/attachments'
import { uniqueArrayByKey } from '~/utils/functions'
import Tutorial from '~/modules/tutorial/Tutorial'
import { debounce } from 'lodash'

const StyledModal = styled(Modal)`
  > .header {
    padding: 21px 30px !important;
    font-size: 14px !important;
    text-transform: uppercase;
  }

  > .content {
    padding: 30px !important;
    //margin: 30px 0;
  }

  > .actions {
    background-color: #ffffff !important;
    padding: 10px 5px !important;
    button {
      margin: 0 5px;
      height: 40px;
    }
  }
`

const StyledHeader = styled.span`
  color: #2599d5;
`

const RelatedDocumentsDropdown = styled(Dropdown)`
  z-index: 601 !important;
`

const CustomDivAddDocument = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Rectangle = styled.div`
  height: 50px;
  border-radius: 4px;
  border: solid 1px #84c225;
  background-color: #ffffff;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
`

const RectangleRed = styled.div`
  height: 50px;
  border-radius: 4px;
  border: solid 1px #db2828;
  background-color: #ffffff;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
`

const CustomCheckCircleRed = styled(CheckCircle)`
  width: 24px;
  height: 20px;
  font-family: feathericon;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.83;
  letter-spacing: normal;
  color: #db2828;
  margin: 0 10px 0 10px;
`

const CustomCheckCircle = styled(CheckCircle)`
  width: 24px;
  height: 20px;
  font-family: feathericon;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.83;
  letter-spacing: normal;
  color: #84c225;
  margin: 0 10px 0 10px;
`

const CustomDivAddedMewDocument = styled.div`
  display: flex;
`

const CustomDivTextAddedMewDocument = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
`

class Orders extends Component {
  state = {
    columns: [
      {
        name: 'orderId',
        title: (
          <FormattedMessage id='order.orderId' defaultMessage='Order ID'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        align: 'right',
        sortPath: 'Order.id'
      },
      {
        name: 'globalStatus',
        title: (
          <FormattedMessage id='order.cfGlobalStatus' defaultMessage='Status'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Order.cfGlobalStatus'
      },
      {
        name: 'date',
        title: (
          <FormattedMessage id='order.date' defaultMessage='Order Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Order.orderDate'
      },
      {
        name: 'customerName',
        title: (
          <FormattedMessage id='order.vendor' defaultMessage='Vendor'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Order.sellerCompanyName'
      }, // ! ! ? seller vs purchaser
      {
        name: 'productName',
        title: (
          <FormattedMessage id='order.productName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'orderStatus',
        title: (
          <FormattedMessage id='order' defaultMessage='Order'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'shippingStatus',
        title: (
          <FormattedMessage id='order.shipping' defaultMessage='Shipping'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'reviewStatus',
        title: (
          <FormattedMessage id='order.review' defaultMessage='Review'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'creditStatus',
        title: (
          <FormattedMessage id='order.credit' defaultMessage='Credit'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'paymentStatus',
        title: (
          <FormattedMessage id='order.payment' defaultMessage='Payment'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'bl',
        title: (
          <FormattedMessage id='order.bl' defaultMessage='B/L'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80,
        align: 'center'
      },
      {
        name: 'sds',
        title: (
          <FormattedMessage id='order.sds' defaultMessage='SDS'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80,
        align: 'center'
      },
      {
        name: 'cofA',
        title: (
          <FormattedMessage id='order.cOfa' defaultMessage='C of A'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80,
        align: 'center'
      },
      {
        name: 'related',
        title: (
          <FormattedMessage id='order.related' defaultMessage='Related'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80,
        align: 'center'
      },
      {
        name: 'orderTotal',
        title: (
          <FormattedMessage id='order.orderTotal' defaultMessage='Order Total'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        align: 'right',
        sortPath: 'Order.cfPriceSubtotal'
      }
    ],
    sorting: {
      sortDirection: '',
      sortPath: ''
    },

    LastEndpointType: '',

    filters: {
      All: { filters: [] },
      Draft: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Draft`]
          }
        ]
      },
      Pending: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Pending`]
          }
        ]
      },
      'In Transit': {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`In Transit`]
          }
        ]
      },
      Review: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Review`]
          }
        ]
      },
      Credit: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Credit`]
          }
        ]
      },
      Completed: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Completed`]
          }
        ]
      },
      'To Ship': {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`To Ship`]
          }
        ]
      },
      Returned: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Returned`]
          }
        ]
      },
      Declined: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Declined`]
          }
        ]
      },
      Cancelled: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Cancelled`]
          }
        ]
      },
      'To Return': {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`To Return`]
          }
        ]
      },
      Confirmed: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Confirmed`]
          }
        ]
      }
    },
    openModal: false,
    columnsRelatedOrders: [
      {
        name: 'documentNumber',
        title: (
          <FormattedMessage id='order.related.documentNumber' defaultMessage='Document #'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'type',
        title: (
          <FormattedMessage id='order.related.type' defaultMessage='Type'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'issuedAt',
        title: (
          <FormattedMessage id='order.related.issuedAt' defaultMessage='Document Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'issuerCompanyName',
        title: (
          <FormattedMessage id='order.related.issuerCompanyName' defaultMessage='Issuer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'download',
        title: (
          <FormattedMessage id='order.related.download' defaultMessage='Download'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        align: 'center'
      }
    ],
    columnsAccountingDocuments: [
      {
        name: 'documentNumber',
        title: (
          <FormattedMessage id='order.related.documentNumber' defaultMessage='Document #'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'type',
        title: (
          <FormattedMessage id='order.related.type' defaultMessage='Type'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'issuedAt',
        title: (
          <FormattedMessage id='order.related.issuedAt' defaultMessage='Document Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'issuerCompanyName',
        title: (
          <FormattedMessage id='order.related.issuerCompanyName' defaultMessage='Issuer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'cfPriceTotal',
        title: (
          <FormattedMessage id='order.related.cfPriceTotal' defaultMessage='Total'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        align: 'center'
      }
    ],
    documentType: '',
    openUploadAttachment: false,
    relatedDocumentsTypeDropdown: [],
    documentFiles: [],
    isAddedNewDocument: false,
    isOpenManager: false,
    relatedDocumentType: [],
    row: '',
    isUnlinkDocument: false,
    replaceExisting: false,
    replaceRow: '',
    openModalAccounting: false,
    openRelatedPopup: false,
    relatedPopupParams: {},
    expandedRowIds: [],
    filterDocumentType: 0
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

  setDatagridFilter = debounce(filterData => {
    this.props.datagrid.loadData(this.state.filters[filterData.status])
  }, 500)

  loadData(endpointType, filterData) {
    this.props.dispatch(actions.change('forms.filter.status', filterData.status))
    this.setDatagridFilter(filterData)
    this.props.loadData(endpointType, filterData)
  }

  failedWrapper = value => {
    return <span style={{ color: '#DB2828' }}>{value}</span>
  }

  getRows = () => {
    const { queryType } = this.props
    let ordersType = queryType.charAt(0).toUpperCase() + queryType.slice(1)

    return this.props.rows.map(row => ({
      ...row,
      orderId: (
        <Link href={`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`}>
          <a onClick={e => e.stopPropagation()}>{row.id}</a>
        </Link>
      ),
      productName: (
        <ArrayToFirstItem
          values={
            row &&
            row.orderItems &&
            row.orderItems.length &&
            row.orderItems.map(d => (d.echoProductName ? d.echoProductName : 'N/A'))
          }
        />
      ),
      globalStatus: row.globalStatus === 'Failed' ? this.failedWrapper(row.globalStatus) : row.globalStatus,
      paymentStatus: row.paymentStatus === 'Failed' ? this.failedWrapper(row.paymentStatus) : row.paymentStatus,
      bl: '',
      sds: '',
      cofA: '',
      related: (
        <a
          href='#'
          onClick={e =>
            this.openRelatedPopup(e, {
              rowRawData: row.rawData,
              parentId: row.id,
              attachments: row.attachments,
              type: 'order',
              header: (
                <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS'>
                  {text => text}
                </FormattedMessage>
              )
            })
          }>
          {row.attachments.length ? <Icon className='file related' /> : <Icon className='file non-related' />}
        </a>
      ),
      orderItems: row.orderItems.map(item => ({
        ...item,
        orderId: '',
        globalStatus: '',
        date: '',
        customerName: '',
        productName: item.echoProductName ? item.echoProductName : 'N/A',
        orderStatus: '',
        shippingStatus: '',
        reviewStatus: '',
        creditStatus: '',
        paymentStatus: '',
        bl:
          item.bl && item.bl.length ? (
            <a href='#' onClick={() => this.downloadAttachment(item.bl[0].name, item.bl[0].id)}>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <a
              href='#'
              onClick={e =>
                this.openDocumentManager(e, {
                    rowRawData: row.rawData,
                    parentId: item.rawData.id,
                    attachments: item.attachments,
                    type: 'item'
                  },
                  [10]  // B/L
                )
              }
            >
              <Icon name='file' className='unknown' />
            </a>
          ),
        sds:
          item.sds && item.sds.length ? (
            <a href='#' onClick={() => this.downloadAttachment(item.sds[0].name, item.sds[0].id)}>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <a
              href='#'
              onClick={e =>
                this.openDocumentManager(e, {
                    rowRawData: row.rawData,
                    parentId: item.rawData.id,
                    attachments: item.attachments,
                    type: 'item'
                  },
                  [3]  // SDS
                )
              }
            >
              <Icon name='file' className='unknown' />
            </a>
          ),
        cofA:
          item.cofA && item.cofA.length ? (
            <a href='#' onClick={() => this.downloadAttachment(item.cofA[0].name, item.cofA[0].id)}>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <a
              href='#'
              onClick={e =>
                this.openDocumentManager(e, {
                    rowRawData: row.rawData,
                    parentId: item.rawData.id,
                    attachments: item.attachments,
                    type: 'item'
                  },
                  [1]  // C of A
                )
              }
            >
              {
                row.rawData.orderStatus === 2
                ? <Icon name='file' className='negative' />
                : <Icon name='file' className='unknown' />
              }
            </a>
          ),
        related: (
          <a
            href='#'
            onClick={e =>
              this.openRelatedPopup(e, {
                rowRawData: row.rawData,
                parentId: item.rawData.id,
                attachments: item.attachments,
                type: 'item',
                header: (
                  <>
                    <FormattedMessage id='order.relatedDocumentsFor' defaultMessage='RELATED DOCUMENTS FOR '>
                      {text => text}
                    </FormattedMessage>
                    <StyledHeader>{item.echoProductName}</StyledHeader>
                  </>
                )
              })
            }>
            {item.attachments.length ? <Icon className='file related' /> : <Icon className='file non-related' />}
          </a>
        ),
        orderTotal: ''
      }))
    }))
  }

  openRelatedPopup(e, params) {
    e.stopPropagation()
    this.setState({
      openRelatedPopup: true,
      relatedPopupParams: params
    })
  }

  openDocumentManager(e, params, relatedDocumentType) {
    e.stopPropagation()
    this.setState({
      isOpenManager: true,
      relatedPopupParams: params,
      relatedDocumentType
    })
  }

  async openModalWindow(orderId) {
    this.setState({ openModalAccounting: true })
    await this.props.getRelatedOrders(orderId)
  }

  handleFilterApply = payload => {
    // ! ! ????
    let statusFilters = getSafe(() => this.state.filters[this.props.filterData.status].filters, [])
    statusFilters.forEach(f => payload.filters.push(f))

    this.props.datagrid.setFilter(payload)
  }

  componentDidMount() {
    const { endpointType, filterData, getDocumentTypes, listDocumentTypes } = this.props
    this.props.loadData(endpointType, { status: 'All' })
    this.handleFilterClear()
    if (listDocumentTypes && !listDocumentTypes.length) {
      getDocumentTypes()
    }
  }

  componentDidUpdate(prevProps) {
    const { endpointType, datagridFilterUpdate, datagridFilter, datagrid } = this.props
    if (prevProps.endpointType !== this.props.endpointType) {
      this.props.loadData(endpointType, { status: 'All' })
    }

    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter)
    }
  }

  handleFilterClear = () => {
    this.props.applyFilter({ filters: [] })
    this.props.datagrid.setFilter({ filters: [] })
  }

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  prepareLinkToAttachment = async documentId => {
    let downloadedFile = null
    const { openModalAccounting } = this.state
    if (openModalAccounting) {
      downloadedFile = await this.props.downloadAttachmentPdf(documentId)
    } else {
      downloadedFile = await this.props.downloadAttachment(documentId)
    }

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

  closePopup = () => {
    this.setState({
      openModal: false,
      openModalAccounting: false,
      openRelatedPopup: false
    })
    this.props.clearRelatedOrders()
  }

  handleUnlink = async row => {
    const { unlinkAttachmentToOrder, removeLinkAttachmentToOrderItem, datagrid } = this.props
    const { parentId, relatedPopupType } = row

    const {
      relatedPopupParams: { rowRawData }
    } = this.state

    if (relatedPopupType === 'order') {
      const query = {
        attachmentId: row.id,
        orderId: parentId
      }

      try {
        await unlinkAttachmentToOrder(query)
        if (datagrid && datagrid.rows) {
          //This construction is for update all attachments in order
          const attachments =
            rowRawData &&
            rowRawData.attachments &&
            rowRawData.attachments.length &&
            rowRawData.attachments.filter(ro => ro.id !== row.id)

          const newRow = {
            ...rowRawData,
            attachments
          }

          datagrid.updateRow(parentId, () => newRow)

          this.setState(prevState => ({
            relatedPopupParams: {
              ...prevState.relatedPopupParams,
              attachments: attachments,
              rowRawData: newRow
            },
            isAddedNewDocument: false,
            isUnlinkDocument: true
          }))
        }
      } catch (err) {
        console.error(err)
      }
    } else if (relatedPopupType === 'item') {
      const query = {
        attachmentId: row.id,
        orderItemId: parentId
      }

      try {
        removeLinkAttachmentToOrderItem(query)

        //This construction is for update all attachments in order-items
        let orderItems = rowRawData.orderItems
        const selectedItem = orderItems.find(r => r.id === parentId)
        const selectedItemIndex = orderItems.findIndex(r => r.id === parentId)
        const itemAttachments = selectedItem.attachments.filter(r => r.id !== row.id)

        if (selectedItemIndex >= 0) {
          orderItems[selectedItemIndex].attachments = itemAttachments
        }

        const newRow = {
          ...rowRawData,
          orderItems
        }
        datagrid.updateRow(rowRawData.id, () => newRow)

        this.setState(prevState => ({
          relatedPopupParams: {
            ...prevState.relatedPopupParams,
            attachments: itemAttachments,
            rowRawData: newRow
          },
          isAddedNewDocument: false,
          isUnlinkDocument: true
        }))
      } catch (err) {
        console.error(err)
      }
    }
  }

  attachDocumentsManager = async newDocuments => {
    const { linkAttachmentToOrder, linkAttachmentToOrderItem, datagrid } = this.props
    const { replaceExisting, replaceRow } = this.state

    if (replaceExisting && replaceRow) {
      await this.handleUnlink(replaceRow)
      this.setState({ replaceExisting: false, replaceRow: '' })
    }
    const {
      relatedPopupParams: { rowRawData, parentId, attachments, type }
    } = this.state

    const docArray = uniqueArrayByKey(newDocuments, 'id')

    let newAttachments = [...attachments, ...docArray]
    newAttachments = uniqueArrayByKey(newAttachments, 'id')

    if (type === 'order') {
      try {
        if (docArray.length) {
          docArray.forEach(async doc => {
            await linkAttachmentToOrder({ attachmentId: doc.id, orderId: rowRawData.id })
          })
        }
        const newRow = {
          ...rowRawData,
          attachments: newAttachments
        }
        datagrid.updateRow(rowRawData.id, () => newRow)

        this.setState(prevState => ({
          relatedPopupParams: {
            ...prevState.relatedPopupParams,
            attachments: newAttachments,
            rowRawData: newRow
          },
          isAddedNewDocument: true,
          isUnlinkDocument: false,
          isOpenManager: false
        }))
      } catch (error) {
        console.log(error)
      }
    } else if (type === 'item') {
      try {
        if (docArray.length) {
          docArray.forEach(async doc => {
            await linkAttachmentToOrderItem({ attachmentId: doc.id, orderItemId: parentId })
          })
        }

        let orderItems = rowRawData.orderItems
        const selectedItem = orderItems.find(r => r.id === parentId)
        const selectedItemIndex = orderItems.findIndex(r => r.id === parentId)

        if (selectedItemIndex >= 0) {
          orderItems[selectedItemIndex].attachments = newAttachments
        }

        const newRow = {
          ...rowRawData,
          orderItems
        }
        datagrid.updateRow(rowRawData.id, () => newRow)

        this.setState(prevState => ({
          relatedPopupParams: {
            ...prevState.relatedPopupParams,
            attachments: newAttachments,
            rowRawData: newRow
          },
          isAddedNewDocument: true,
          isUnlinkDocument: false,
          isOpenManager: false
        }))
      } catch (error) {
        console.log(error)
      }
    }
  }

  replaceExiting = row => {
    this.setState({ isOpenManager: true, replaceExisting: true, replaceRow: row })
  }

  getContent = () => {
    const { relatedOrders, loadRelatedOrders } = this.props
    const rowsRelatedOrders = relatedOrders.reduce((ordersList, order) => {
      if (order) {
        ordersList.push({
          documentNumber: (
            <Button as='a' onClick={() => this.downloadAttachment(order.documentNumber, order.id)}>
              <Icon name='download' />
              {order.documentNumber}
            </Button>
          ),
          type: order.type,
          issuedAt: getSafe(() => <FormattedDate value={order.issuedAt.split('T')[0]} />, 'N/A'),
          issuerCompanyName: order.issuerCompanyName,
          cfPriceTotal: <FormattedNumber style='currency' currency={currency} value={order.cfPriceTotal} />
        })
      }

      return ordersList
    }, [])
    return (
      <ProdexGrid
        loading={this.state.submitting || loadRelatedOrders}
        hideSettingsIcon={true}
        tableName='related_orders'
        columns={this.state.columnsAccountingDocuments}
        rows={rowsRelatedOrders}
      />
    )
  }

  getRelatedDocumentsContent = () => {
    const {
      intl: { formatMessage },
      listDocumentTypes,
      documentTypesFetching
    } = this.props
    let {
      relatedPopupParams: { rowRawData, parentId, attachments, type },
      isAddedNewDocument,
      isUnlinkDocument,
      filterDocumentType
    } = this.state

    const filteredAttachments =
      filterDocumentType === 0 ? attachments : attachments.filter(a => a.documentType.id === filterDocumentType)

    const rowsRelatedDocuments = filteredAttachments.map(attach => ({
      id: attach.id,
      documentNumber: (
        <Button as='a' onClick={() => this.downloadAttachment(attach.name, attach.id)}>
          <Icon name='download' />
          {attach.name}
        </Button>
      ),
      type: getSafe(() => attach.documentType.name, 'N/A'),
      issuedAt: getSafe(() => <FormattedDate value={attach.issuedAt.split('T')[0]} />, 'N/A'),
      issuerCompanyName: 'N/A',
      download: (
        <a href='#' onClick={() => this.downloadAttachment(attach.name, attach.id)}>
          <Icon name='file' className='positive' />
        </a>
      ),
      rowRawData: rowRawData,
      parentId,
      relatedPopupType: type
    }))

    return (
      <>
        {isAddedNewDocument ? (
          <Rectangle>
            <CustomDivAddedMewDocument>
              <CustomCheckCircle />
              <CustomDivTextAddedMewDocument>
                <FormattedMessage id='related.documents.addedNewDocument' defaultMessage='New document has been added'>
                  {text => text}
                </FormattedMessage>
              </CustomDivTextAddedMewDocument>
            </CustomDivAddedMewDocument>
          </Rectangle>
        ) : null}
        {isUnlinkDocument ? (
          <RectangleRed>
            <CustomDivAddedMewDocument>
              <CustomCheckCircleRed />
              <CustomDivTextAddedMewDocument>
                <FormattedMessage id='related.documents.unlinkDocument' defaultMessage='Document has been unlinked'>
                  {text => text}
                </FormattedMessage>
              </CustomDivTextAddedMewDocument>
            </CustomDivAddedMewDocument>
          </RectangleRed>
        ) : null}
        <CustomDivAddDocument>
          <RelatedDocumentsDropdown
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
            value={this.state.filterDocumentType}
            selection
            loading={documentTypesFetching}
            onChange={(event, { name, value }) => {
              this.setState({ [name]: value })
            }}
            name='filterDocumentType'
            placeholder={formatMessage({
              id: 'order.detail.documents.dropdown',
              defaultMessage: 'Select Type'
            })}
          />
          <div>
            <AttachmentManager
              documentTypeIds={[]}
              isOpenManager={this.state.isOpenManager}
              asModal
              returnSelectedRows={rows => this.attachDocumentsManager(rows)}
              returnCloseAttachmentManager={val => this.setState({ isOpenManager: false })}
            />
          </div>
        </CustomDivAddDocument>
        <ProdexGrid
          loading={this.props.loadingRelatedDocuments}
          tableName='related_orders_documents'
          columns={this.state.columnsRelatedOrders}
          rows={rowsRelatedDocuments}
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
      </>
    )
  }

  render() {
    const {
      endpointType,
      /*match, rows,*/ isFetching,
      activeStatus,
      queryType,
      router,
      datagrid,
      tutorialCompleted,
      intl: { formatMessage }
    } = this.props

    const { columns, row, openModal, isOpenManager, relatedDocumentType, relatedPopupParams } = this.state
    let ordersType = queryType.charAt(0).toUpperCase() + queryType.slice(1)

    return (
      <div id='page' className='flex stretched scrolling'>
        {this.state.openModalAccounting && (
          <StyledModal size='small' closeIcon={false} centered={true} open={true}>
            <Modal.Header>
              <FormattedMessage id='order.related.table' defaultMessage='Related Accounting Documents'>
                {text => text}
              </FormattedMessage>
            </Modal.Header>
            <Modal.Content scrolling>{this.getContent()}</Modal.Content>
            <Modal.Actions>
              <Button basic onClick={() => this.closePopup()}>
                <FormattedMessage id='global.close' defaultMessage='Close'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </Modal.Actions>
          </StyledModal>
        )}

        {this.state.openRelatedPopup && (
          <StyledModal
            size='small'
            closeIcon={false}
            onClose={() => {
              this.setState({
                openRelatedPopup: false,
                isAddedNewDocument: false,
                isUnlinkDocument: false,
                isOpenManager: false
              })
            }}
            centered={true}
            open={true}>
            <Modal.Header>{relatedPopupParams.header}</Modal.Header>
            <Modal.Content scrolling>{this.getRelatedDocumentsContent()}</Modal.Content>
            <Modal.Actions>
              <Button
                basic
                onClick={() => {
                  this.setState({
                    openRelatedPopup: false,
                    isAddedNewDocument: false,
                    isUnlinkDocument: false,
                    isOpenManager: false
                  })
                  this.closePopup()
                }}>
                <FormattedMessage id='global.close' defaultMessage='Close'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </Modal.Actions>
          </StyledModal>
        )}

        {!this.state.openRelatedPopup && this.state.isOpenManager && (
          <AttachmentManager
            documentTypeIds={this.state.relatedDocumentType}
            isOpenManager={this.state.isOpenManager}
            asModal
            singleSelection={true}
            lockedFileTypes={true}
            returnSelectedRows={rows => this.attachDocumentsManager(rows)}
            returnCloseAttachmentManager={val =>
              this.setState({
                isOpenManager: false,
                relatedDocumentType: []
              })}
          />
        )}

        <Container fluid style={{ padding: '0 32px' }}>
          <Menu pointing secondary horizontal>
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.all',
                defaultMessage: 'ALL'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'All'
                })
              }
              active={!activeStatus || activeStatus === 'All'}
              data-test='menu_orders_all'
            />
            {endpointType === 'purchase' && (
              <Menu.Item
                name={formatMessage({
                  id: 'order.menu.draft',
                  defaultMessage: 'Draft'
                })}
                onClick={() =>
                  this.loadData(endpointType, {
                    ...this.props.filterData,
                    status: 'Draft'
                  })
                }
                active={activeStatus === 'Draft'}
                data-test='menu_orders_draft'
              />
            )}
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.pending',
                defaultMessage: 'PENDING'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Pending'
                })
              }
              active={activeStatus === 'Pending'}
              data-test='menu_orders_pending'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.inTransit',
                defaultMessage: 'IN TRANSIT'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'In Transit'
                })
              }
              active={activeStatus === 'In Transit'}
              data-test='menu_orders_inTransit'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.review',
                defaultMessage: 'REVIEW'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Review'
                })
              }
              active={activeStatus === 'Review'}
              data-test='menu_orders_review'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.credit',
                defaultMessage: 'CREDIT'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Credit'
                })
              }
              active={activeStatus === 'Credit'}
              data-test='menu_orders_credit'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.completed',
                defaultMessage: 'COMPLETED'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Completed'
                })
              }
              active={activeStatus === 'Completed'}
              data-test='menu_orders_completed'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.toShip',
                defaultMessage: 'TO SHIP'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'To Ship'
                })
              }
              active={activeStatus === 'To Ship'}
              data-test='menu_orders_ship'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.returned',
                defaultMessage: 'RETURNED'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Returned'
                })
              }
              active={activeStatus === 'Returned'}
              data-test='menu_orders_returned'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.declined',
                defaultMessage: 'DECLINED'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Declined'
                })
              }
              active={activeStatus === 'Declined'}
              data-test='menu_orders_declined'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.cancelled',
                defaultMessage: 'Cancelled'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Cancelled'
                })
              }
              active={activeStatus === 'Cancelled'}
              data-test='menu_orders_cancelled'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.toReturn',
                defaultMessage: 'To Return'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'To Return'
                })
              }
              active={activeStatus === 'To Return'}
              data-test='menu_orders_to_return'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.confirmed',
                defaultMessage: 'Confirmed'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Confirmed'
                })
              }
              active={activeStatus === 'Confirmed'}
              data-test='menu_orders_confirmed'
            />
            <Menu.Item>
              <FilterTags datagrid={datagrid} />
            </Menu.Item>
          </Menu>
        </Container>
        {!tutorialCompleted && <Tutorial marginOrders />}
        <Container fluid style={{ padding: '20px 32px 10px 32px' }} className='flex stretched'>
          {false && (
            <OrderFilter
              ordersType={ordersType.toLowerCase()}
              sortPath={this.state.sorting.sortPath}
              sortDirection={this.state.sorting.sortDirection}
              onApply={payload => this.handleFilterApply(payload)}
            />
          )}
          {isFetching ? (
            <Spinner />
          ) : (
            <ProdexGrid
              tableName='orders_grid'
              columns={columns}
              {...datagrid.tableProps}
              loading={datagrid.loading}
              rows={this.getRows()}
              treeDataType={true}
              tableTreeColumn={'orderId'}
              getChildRows={(row, rootRows) => {
                return row ? row.orderItems : rootRows
              }}
              onRowClick={(_, row) => {
                if (row.root && row.orderItems.length) {
                  let ids = this.state.expandedRowIds.slice()
                  if (ids.includes(row.id)) {
                    //ids.filter(id => id === row.id)
                    this.setState({ expandedRowIds: ids.filter(id => id !== row.id) })
                  } else {
                    ids.push(row.id)
                    this.setState({ expandedRowIds: ids })
                  }
                }
              }}
              expandedRowIds={this.state.expandedRowIds}
              onExpandedRowIdsChange={expandedRowIds => this.setState({ expandedRowIds })}
              // onSortingChange={sorting => sorting.sortPath && this.setState({ sorting })}
              defaultSorting={{ columnName: 'orderId', sortPath: 'Order.id', direction: 'desc' }}
              rowActions={[
                {
                  text: formatMessage({
                    id: 'orders.detail',
                    defaultMessage: 'Detail'
                  }),
                  callback: row => router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`)
                },
                {
                  text: formatMessage({
                    id: 'orders.accountingDocuments',
                    defaultMessage: 'Accounting Documents'
                  }),
                  disabled: row => row.accountingDocumentsCount === 0,
                  callback: row => this.openModalWindow(row.id)
                }
              ]}
              rowChildActions={[]}
            />
          )}
        </Container>
      </div>
    )
  }
}

export default injectIntl(withToastManager(Orders))
