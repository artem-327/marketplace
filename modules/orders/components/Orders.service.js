import moment from 'moment/moment'
import { ChevronDown, ChevronUp } from 'react-feather'
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { Icon, Button } from 'semantic-ui-react'
import * as Yup from 'yup'
// Components
import ActionCell from '../../../components/table/ActionCell'
import ProdexGrid from '../../../components/table'
import { ArrayToFirstItem } from '../../../components/formatted-messages'
import { AttachmentManager } from '../../../modules/attachments'
import DetailRow from '../../../components/detail-row'
// Constants
import { currency } from '../../../constants/index'
import { HEADER_ATTRIBUTES, CONTENT_ATTRIBUTES } from '../constants'
// Services
import * as OrdersHelper from '../../../components/helpers/Orders'
import { getLocaleDateFormat } from '../../../components/date-format'
import { getSafe, getMimeType } from '../../../utils/functions'
import { uniqueArrayByKey } from '../../../utils/functions'
import { errorMessages, dateValidation } from '../../../constants/yupValidation'
// Styles
import {
  StyledModal,
  StyledHeader,
  RelatedDocumentsDropdown,
  CustomDivAddDocument,
  Rectangle,
  RectangleRed,
  CustomCheckCircleRed,
  CustomCheckCircle,
  CustomDivAddedMewDocument,
  CustomDivTextAddedMewDocument
} from './Orders.styles'


const filterAttachments = (a, type) => {
    if (!a) return []
    let filtered = a.reduce((latest, a) => {
      if (a.documentType && a.documentType.id === type) {
        if (latest) {
          if (latest.id < a.id) {
            latest = a
          }
        } else {
          latest = a
        }
      }
      return latest
    }, null)
    return filtered ? [filtered] : []
}
  
export const getRowsContainer = (datagrid, currentTab) => datagrid.rows.map(r => ({
    id: r.id,
    rawData: r,
    clsName: 'tree-table root-row',
    root: true,
    treeRoot: true,
    globalStatus: r.cfGlobalStatus,
    date: r.orderDate && moment(r.orderDate).format(getLocaleDateFormat()),
    customerName: currentTab === 'sales' ? r.buyerCompanyName : r.sellerCompanyName,
    orderStatus: OrdersHelper.getOrderStatusWithIconCircle(r.orderStatus),
    shippingStatus: OrdersHelper.getShippingStatus(r.shippingStatus),
    reviewStatus: OrdersHelper.getReviewStatus(r.reviewStatus),
    creditStatus: OrdersHelper.getCreditStatus(r.creditReviewStatus),
    paymentStatus: OrdersHelper.getPaymentStatus(r.paymentStatus),
    disputeResolutionStatus: OrdersHelper.getDisputeStatus(r.disputeResolutionStatus),
    bl: '',
    sds: '',
    cofA: '',
    orderTotal: (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
        value={r.cfPriceTotal}
      />
    ),
    accountingDocumentsCount: r.accountingDocumentsCount,
    attachments: r.attachments,
    orderItems: r.orderItems.map(item => {
      let cofA = filterAttachments(item.attachments, 1) // C of A
      let sds = filterAttachments(item.attachments, 3) // SDS
      let bl = filterAttachments(item.attachments, 10) // B/L
      return {
        ...item,
        rawData: item,
        id: r.id + '_' + item.id,
        clsName: 'tree-table nested-row',
        cofA,
        sds,
        bl,
        packaging:
          item.packagingSize && item.packagingType && item.packagingUnit
            ? item.packagingSize + ' ' + item.packagingUnit.name.toLowerCase() + ' ' + item.packagingType.name
            : 'N/A',
        fobPrice: (
          <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            style='currency'
            currency={currency}
            value={item.pricePerUOM}
          />
        ),
        orderTotal: (
          <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            style='currency'
            currency={currency}
            value={item.priceSubtotal}
          />
        )
      }
    })
}))


export const getActions = (props, state, setState) => {
  return [
    {
      text: (
        <FormattedMessage id='global.replaceExisting' defaultMessage='Replace Existing' />
      ),
      callback: row => replaceExiting(row, state, setState)
    },
    {
      text: (
        <FormattedMessage id='global.unlink' defaultMessage='Unlink' />
      ),
      callback: row => handleUnlink(row, props, state, setState)
    }
  ]
}

export const columnsRelatedOrders = (props, state, setState) => ([
  {
    name: 'documentNumber',
    title: (
      <FormattedMessage id='order.related.documentNumber' defaultMessage='Document #' />
    ),
    width: 150,
    actions: getActions(props, state, setState)
  },
  {
    name: 'type',
    title: (
      <FormattedMessage id='order.related.type' defaultMessage='Type' />
    ),
    width: 150
  },
  {
    name: 'issuedAt',
    title: (
      <FormattedMessage id='order.related.issuedAt' defaultMessage='Document Date' />
    ),
    width: 120
  },
  {
    name: 'issuerCompanyName',
    title: (
      <FormattedMessage id='order.related.issuerCompanyName' defaultMessage='Issuer' />
    ),
    width: 100
  },
  {
    name: 'download',
    title: (
      <FormattedMessage id='order.related.download' defaultMessage='Download' />
    ),
    width: 100,
    align: 'center'
  }
])

export const columnsAccountingDocuments = [
  {
    name: 'documentNumber',
    title: (
      <FormattedMessage id='order.related.documentNumber' defaultMessage='Document #' />
    ),
    width: 150
  },
  {
    name: 'type',
    title: (
      <FormattedMessage id='order.related.type' defaultMessage='Type' />
    ),
    width: 150
  },
  {
    name: 'issuedAt',
    title: (
      <FormattedMessage id='order.related.issuedAt' defaultMessage='Document Date' />
    ),
    width: 120
  },
  {
    name: 'issuerCompanyName',
    title: (
      <FormattedMessage id='order.related.issuerCompanyName' defaultMessage='Issuer' />
    ),
    width: 100
  },
  {
    name: 'cfPriceTotal',
    title: (
      <FormattedMessage id='order.related.cfPriceTotal' defaultMessage='Total' />
    ),
    width: 100,
    align: 'center'
  }
]

export const failedWrapper = value => {
  return <span style={{ color: '#DB2828' }}>{value}</span>
}

export const getColumns = () => {
  return [
    {
      name: 'orderId',
      title: (
        <FormattedMessage id='order.orderId' defaultMessage='Order ID' />
      ),
      width: 200,
      sortPath: 'Order.id',
      allowReordering: false
    },
    {
      name: 'customerName',
      title: (
        <FormattedMessage id='order.vendor' defaultMessage='Vendor' />
      ),
      width: 220,
      sortPath: 'Order.sellerCompanyName'
    }, // ! ! ? seller vs purchaser
    {
      name: 'date',
      title: (
        <FormattedMessage id='order.date' defaultMessage='Order Date' />
      ),
      width: 150,
      sortPath: 'Order.createdAt'
    },
    {
      name: 'shippingStatus',
      title: (
        <FormattedMessage id='orders.deliveryStatus' defaultMessage='Delivery Status' />
      ),
      width: 160
    },
    {
      name: 'orderStatus',
      title: (
        <FormattedMessage id='orders.orderStatus' defaultMessage='Order Status' />
      ),
      width: 170
    },
    {
      name: 'orderTotal',
      title: (
        <FormattedMessage id='order.orderTotal' defaultMessage='Order Total' />
      ),
      width: 150,
      align: 'right',
      sortPath: 'Order.cfPriceSubtotal'
    },
    {
      name: 'expand',
      title: <div></div>,
      caption: (
        <FormattedMessage id='alerts.column.expand' defaultMessage='Expand' />
      ),
      align: 'center',
      width: 50
    }
  ]
}

export const getRows = (props, state, setState) => {
  const { currentTab, router } = props
  let ordersType = currentTab.charAt(0).toUpperCase() + currentTab.slice(1)

  return props.rows.map(row => ({
    ...row,
    orderId: (
      <ActionCell
        row={row}
        getActions={() => getActionsByRow(props, state, setState)}
        content={row.id}
        onContentClick={e => {
          e.stopPropagation()
          e.preventDefault()
          router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`)
        }}
      />
    ),
    productName: (
      <ArrayToFirstItem
        values={
          row &&
          row.orderItems &&
          row.orderItems.length &&
          row.orderItems.map(d => (d.companyGenericProductName ? d.companyGenericProductName : 'N/A'))
        }
      />
    ),
    globalStatus: row.globalStatus === 'Failed' ? failedWrapper(row.globalStatus) : row.globalStatus,
    paymentStatus: row.paymentStatus === 'Failed' ? failedWrapper(row.paymentStatus) : row.paymentStatus,
    bl: '',
    sds: '',
    cofA: '',
    related: (
      <a
        href='#'
        onClick={e =>
          openRelatedPopup(e, {
            rowRawData: row.rawData,
            parentId: row.id,
            attachments: row.attachments,
            type: 'order',
            header: (
              <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS' />
            )
          }, state, setState)
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
      productName: item.companyGenericProductName ? item.companyGenericProductName : 'N/A',
      orderStatus: '',
      shippingStatus: '',
      reviewStatus: '',
      creditStatus: '',
      paymentStatus: '',
      disputeResolutionStatus: '',
      bl:
        item.bl && item.bl.length ? (
          <a href='#' onClick={() => downloadAttachment(item.bl[0].name, item.bl[0].id, props, state)}>
            <Icon name='file' className='positive' />
          </a>
        ) : (
          <a
            href='#'
            onClick={e =>
              openDocumentManager(
                e,
                {
                  rowRawData: row.rawData,
                  parentId: item.rawData.id,
                  attachments: item.attachments,
                  type: 'item'
                },
                [10], 
                state, 
                setState
              )
            }>
            <Icon name='file' className='unknown' />
          </a>
        ),
      sds:
        item.sds && item.sds.length ? (
          <a href='#' onClick={() => downloadAttachment(item.sds[0].name, item.sds[0].id, props, state)}>
            <Icon name='file' className='positive' />
          </a>
        ) : (
          <a
            href='#'
            onClick={e =>
              openDocumentManager(
                e,
                {
                  rowRawData: row.rawData,
                  parentId: item.rawData.id,
                  attachments: item.attachments,
                  type: 'item'
                },
                [3], 
                state, 
                setState
              )
            }>
            <Icon name='file' className='unknown' />
          </a>
        ),
      cofA:
        item.cofA && item.cofA.length ? (
          <a href='#' onClick={() => downloadAttachment(item.cofA[0].name, item.cofA[0].id, props, state)}>
            <Icon name='file' className='positive' />
          </a>
        ) : (
          <a
            href='#'
            onClick={e =>
              openDocumentManager(
                e,
                {
                  rowRawData: row.rawData,
                  parentId: item.rawData.id,
                  attachments: item.attachments,
                  type: 'item'
                },
                [1], 
                state, 
                setState
              )
            }>
            {row.rawData.orderStatus === 2 ? (
              <Icon name='file' className='negative' />
            ) : (
              <Icon name='file' className='unknown' />
            )}
          </a>
        ),
      related: (
        <a
          href='#'
          onClick={e =>
            openRelatedPopup(e, {
              rowRawData: row.rawData,
              parentId: item.rawData.id,
              attachments: item.attachments,
              type: 'item',
              header: (
                <>
                  <FormattedMessage id='order.relatedDocumentsFor' defaultMessage='RELATED DOCUMENTS FOR ' />
                  <StyledHeader>{item.companyGenericProductName}</StyledHeader>
                </>
              )
            }, state, setState)
          }>
          {item.attachments.length ? <Icon className='file related' /> : <Icon className='file non-related' />}
        </a>
      )
    })),
    expand: state.expandedRowIds.some(id => id === row.id) ? (
      <ChevronUp size={16} style={{ cursor: 'pointer' }} />
    ) : (
      <ChevronDown size={16} style={{ cursor: 'pointer' }} />
    ),
    clsName: state.expandedRowIds.some(id => id === row.id) ? ' open' : ''
  }))
}

export const openRelatedPopup = (e, params, state, setState) => {
  e.stopPropagation()
  setState({
    ...state,
    openRelatedPopup: true,
    relatedPopupParams: params
  })
}

export const openDocumentManager = (e, params, relatedDocumentType, state, setState) => {
  e.stopPropagation()
  setState({
    ...state,
    isOpenManager: true,
    relatedPopupParams: params,
    relatedDocumentType
  })
}

export const openModalWindow = async (orderId, props, state, setState) => {
  setState({ ...state, openModalAccounting: true })
  await props.getRelatedOrders(orderId)
}

export const downloadAttachment = async (documentName, documentId, props, state) => {
  const element = await prepareLinkToAttachment(documentId, props, state)

  element.download = documentName
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}

export const prepareLinkToAttachment = async (documentId, props, state) => {
  let downloadedFile = null
  const { openModalAccounting } = state
  if (openModalAccounting) {
    downloadedFile = await props.downloadAttachmentPdf(documentId)
  } else {
    downloadedFile = await props.downloadAttachment(documentId)
  }

  const fileName = extractFileName(downloadedFile.value.headers['content-disposition'])
  const mimeType = fileName && getMimeType(fileName)
  const element = document.createElement('a')
  const file = new Blob([downloadedFile.value.data], { type: mimeType })
  let fileURL = URL.createObjectURL(file)
  element.href = fileURL

  return element
}

export const extractFileName = contentDispositionValue => {
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

export const closePopup = (props, state, setState) => {
  setState({
    ...state,
    openModal: false,
    openModalAccounting: false,
    openRelatedPopup: false
  })
  props.clearRelatedOrders()
}

export const handleUnlink = async (row, props, state, setState) => {
  const { unlinkAttachmentToOrder, removeLinkAttachmentToOrderItem, datagrid } = props
  const { parentId, relatedPopupType } = row

  const {
    relatedPopupParams: { rowRawData }
  } = state

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

        setState(prevState => ({
          ...state,
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

      setState(prevState => ({
        ...state,
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

export const attachDocumentsManager = async (newDocuments, props, state, setState) => {
  const { linkAttachmentToOrder, linkAttachmentToOrderItem, datagrid } = props
  const { replaceExisting, replaceRow } = state

  if (replaceExisting && replaceRow) {
    await handleUnlink(replaceRow, props, state, setState)
    setState({ ...state, replaceExisting: false, replaceRow: '' })
  }
  const {
    relatedPopupParams: { rowRawData, parentId, attachments, type }
  } = state

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

      setState(prevState => ({
        ...state,
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
      console.error(error)
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

      setState(prevState => ({
        ...state,
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
      console.error(error)
    }
  }
}

export const replaceExiting = (row, state, setState) => {
  setState({ ...state, isOpenManager: true, replaceExisting: true, replaceRow: row })
}

export const getContent = (props, state) => {
  const { relatedOrders, loadRelatedOrders } = props
  const rowsRelatedOrders = relatedOrders.reduce((ordersList, order) => {
    if (order) {
      ordersList.push({
        documentNumber: (
          <Button as='a' onClick={() => downloadAttachment(order.documentNumber, order.id, props, state)}>
            <Icon name='download' />
            {order.documentNumber}
          </Button>
        ),
        type: order.type,
        issuedAt: getSafe(() => <FormattedDate value={order.issuedAt.split('T')[0]} />, 'N/A'),
        issuerCompanyName: order.issuerCompanyName,
        cfPriceTotal: (
          <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            style='currency'
            currency={currency}
            value={order.cfPriceTotal}
          />
        )
      })
    }

    return ordersList
  }, [])
  return (
    <ProdexGrid
      loading={loadRelatedOrders}
      hideSettingsIcon={true}
      tableName='related_orders'
      columns={columnsAccountingDocuments}
      rows={rowsRelatedOrders}
    />
  )
}

export const getActionsByRow = (props, state, setState) => {
  const {
    currentTab,
    router,
    intl: { formatMessage }
  } = props

  let ordersType = currentTab.charAt(0).toUpperCase() + currentTab.slice(1)

  return [
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
      callback: row => openModalWindow(row.id, props, state, setState)
    }
  ]
}

export const getRelatedDocumentsContent = (props, state, setState) => {
  const {
    intl: { formatMessage },
    listDocumentTypes,
    documentTypesFetching
  } = props
  let {
    relatedPopupParams: { rowRawData, parentId, attachments, type },
    isAddedNewDocument,
    isUnlinkDocument,
    filterDocumentType
  } = state

  const filteredAttachments =
    filterDocumentType === 0 ? attachments : attachments.filter(a => a.documentType.id === filterDocumentType)

  const rowsRelatedDocuments = filteredAttachments.map(attach => ({
    id: attach.id,
    documentNumber: attach.name,
    type: getSafe(() => attach.documentType.name, 'N/A'),
    issuedAt: getSafe(() => <FormattedDate value={attach.issuedAt.split('T')[0]} />, 'N/A'),
    issuerCompanyName: 'N/A',
    download: (
      <a href='#' onClick={() => downloadAttachment(attach.name, attach.id, props, state)}>
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
              <FormattedMessage id='related.documents.addedNewDocument' defaultMessage='New document has been added' />
            </CustomDivTextAddedMewDocument>
          </CustomDivAddedMewDocument>
        </Rectangle>
      ) : null}
      {isUnlinkDocument ? (
        <RectangleRed>
          <CustomDivAddedMewDocument>
            <CustomCheckCircleRed />
            <CustomDivTextAddedMewDocument>
              <FormattedMessage id='related.documents.unlinkDocument' defaultMessage='Document has been unlinked' />
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
          value={state.filterDocumentType}
          selection
          loading={documentTypesFetching}
          onChange={(event, { name, value }) => {
            setState({ ...state, [name]: value })
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
            isOpenManager={state.isOpenManager}
            asModal
            returnSelectedRows={rows => attachDocumentsManager(rows, props, state, setState)}
            returnCloseAttachmentManager={val => setState({ ...state, isOpenManager: false })}
          />
        </div>
      </CustomDivAddDocument>
      <ProdexGrid
        loading={props.loadingRelatedDocuments}
        tableName='related_orders_documents'
        columns={columnsRelatedOrders(props, state, setState)}
        rows={rowsRelatedDocuments}
        columnActions='documentNumber'
      />
    </>
  )
}

export const getRowDetail = ({ row }) => {
  return (
    <DetailRow
      row={row}
      items={row.orderItems}
      headerAttributes={HEADER_ATTRIBUTES}
      contentAttributes={CONTENT_ATTRIBUTES}
    />
  )
}

export const validationSchema = Yup.lazy(values => {
  let validationObject = {
    dateFrom:
      values.dateFrom &&
      values.dateTo &&
      dateValidation(false).concat(
        Yup.string().test(
          'is-before',
          <FormattedMessage
            id='orders.dateMustBeSameOrBefore'
            defaultMessage={`Date must be same or before ${values.dateTo}`}
            values={{ date: values.dateTo }}
          />,
          function () {
            let parsedDate = moment(this.parent['dateFrom'], getLocaleDateFormat())
            let parsedBeforeDate = moment(this.parent['dateTo'], getLocaleDateFormat())
            return !parsedBeforeDate.isValid() || parsedDate.isSameOrBefore(parsedBeforeDate)
          }
        )
      ),
    orderId:
      values.orderId &&
      Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .test('int', errorMessages.integer, val => {
          return val % 1 === 0
        })
        .positive(errorMessages.positive)
        .test('numbers', errorMessages.mustBeNumber, value => /^[0-9]*$/.test(value))
  }
  return Yup.object().shape({ ...validationObject })
})