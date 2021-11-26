import moment from 'moment/moment'
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { Icon, Button } from 'semantic-ui-react'
import { ChevronDown, ChevronRight } from 'react-feather'
// Components
import ProdexGrid from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import { ArrayToFirstItem } from '../../../../components/formatted-messages'
// Services
import { getSafe, getMimeType } from '../../../../utils/functions'
import * as OrdersHelper from '../../../../components/helpers/Orders'
import { getLocaleDateFormat } from '../../../../components/date-format'
// Constants
import { currency } from '../../../../constants/index'
// Styles
import {  CustomDivAddDocument, RelatedDocumentsDropdown } from '../../styles'

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

/**
 * get Rows function used in OrdersContainer
 * @category Operations
 * @services
 */
export const getRows = datagrid => datagrid?.rows?.map(r => {
    const isCancelable =
        // Pending, Confirmed, Draft        Empty,Not shipped
        [1,2,4].includes(r.orderStatus) && [0,1].includes(r.shippingStatus)
    return {
        id: r.id,
        clsName: 'tree-table root-row',
        isCancelable,
        root: true,
        treeRoot: true,
        rawData: r,
        globalStatus: r.cfGlobalStatus,
        date: r.orderDate && moment(r.orderDate).format(getLocaleDateFormat()),
        customerName: r.sellerCompanyName,
        orderStatus: OrdersHelper.getOrderStatus(r.orderStatus),
        shippingStatus: OrdersHelper.getShippingStatus(r.shippingStatus),
        reviewStatus: OrdersHelper.getReviewStatus(r.reviewStatus),
        creditStatus: OrdersHelper.getCreditStatus(r.creditReviewStatus),
        paymentStatus: OrdersHelper.getPaymentStatus(r.paymentStatus),
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
        orderItems: r.orderItems
            ? r.orderItems.map(item => {
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
                bl
                }
            })
            : []
    }
})

/**
 * columns used in Orders Component
 * @category Operations
 * @services
 */
export const columns = [
    {
      name: 'orderId',
      title: (
        <FormattedMessage id='order.orderId' defaultMessage='Order ID' />
      ),
      width: 100,
      align: 'right',
      sortPath: 'Order.id',
      allowReordering: false
    },
    {
      name: 'globalStatus',
      title: (
        <FormattedMessage id='order.cfGlobalStatus' defaultMessage='Status' />
      ),
      width: 120,
      sortPath: 'Order.cfGlobalStatus'
    },
    {
      name: 'date',
      title: (
        <FormattedMessage id='order.date' defaultMessage='Order Date' />
      ),
      width: 120,
      sortPath: 'Order.createdAt'
    },
    {
      name: 'customerName',
      title: (
        <FormattedMessage id='order.vendor' defaultMessage='Vendor' />
      ),
      width: 120,
      sortPath: 'Order.sellerCompanyName'
    }, // ! ! ? seller vs purchaser
    {
      name: 'productName',
      title: (
        <FormattedMessage id='order.productName' defaultMessage='Product Name' />
      ),
      width: 160
    },
    {
      name: 'orderStatus',
      title: (
        <FormattedMessage id='order' defaultMessage='Order' />
      ),
      width: 120
    },
    {
      name: 'shippingStatus',
      title: (
        <FormattedMessage id='order.shipping' defaultMessage='Shipping' />
      ),
      width: 120
    },
    {
      name: 'reviewStatus',
      title: (
        <FormattedMessage id='order.review' defaultMessage='Review' />
      ),
      width: 120
    },
    {
      name: 'creditStatus',
      title: (
        <FormattedMessage id='order.credit' defaultMessage='Credit' />
      ),
      width: 120
    },
    {
      name: 'paymentStatus',
      title: (
        <FormattedMessage id='order.payment' defaultMessage='Payment' />
      ),
      width: 120
    },
    {
      name: 'bl',
      title: (
        <FormattedMessage id='order.bl' defaultMessage='B/L' />
      ),
      width: 80,
      align: 'center'
    },
    {
      name: 'sds',
      title: (
        <FormattedMessage id='order.sds' defaultMessage='SDS' />
      ),
      width: 80,
      align: 'center'
    },
    {
      name: 'cofA',
      title: (
        <FormattedMessage id='order.cOfa' defaultMessage='C of A' />
      ),
      width: 80,
      align: 'center'
    },
    {
      name: 'related',
      title: (
        <FormattedMessage id='order.related' defaultMessage='Related' />
      ),
      width: 80,
      align: 'center'
    },
    {
      name: 'orderTotal',
      title: (
        <FormattedMessage id='order.orderTotal' defaultMessage='Order Total' />
      ),
      width: 160,
      align: 'right',
      sortPath: 'Order.cfPriceSubtotal'
    }
]

const columnsAccountingDocuments = [
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

const columnsRelatedOrders = [
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
    }, // ! ! ? seller vs purchaser
    {
    name: 'download',
    title: (
        <FormattedMessage id='global.download' defaultMessage='Download' />
    ),
    width: 100,
    align: 'center'
    }
]

const failedWrapper = value => {
    return <span style={{ color: '#DB2828' }}>{value}</span>
}

/**
 * get Rows function used in Orders Component
 * @category Operations
 * @services
 */
export const getRowss = (props, state, setState) => {
    return props.rows.map(row => ({
    ...row,

    orderId: (
        <ActionCell
        row={row}
        getActions={() => getActions(props, state, setState)}
        content={row.id}
        onContentClick={() => props.openOrderDetail(row.rawData)}
        leftContent={
            state.expandedRowIds.some(el => el === row.id) ? (
            <ChevronDown
                size={20}
                style={{ color: '#2599d5', cursor: 'pointer', marginLeft: '-6px' }}
                onClick={e => {
                e.stopPropagation()
                const expandedRowIds = state.expandedRowIds.filter(id => id !== row.id)
                setState({ ...state, expandedRowIds })
                }}
            />
            ) : (
            <ChevronRight
                size={20}
                style={{ color: '#2599d5', cursor: 'pointer', marginLeft: '-6px' }}
                onClick={e => {
                e.stopPropagation()
                let expandedRowIds = state.expandedRowIds.slice()
                expandedRowIds.push(row.id)
                setState({ ...state, expandedRowIds })
                }}
            />
            )
        }
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
    related:
        row.attachments && row.attachments.length ? (
        <a href='#' onClick={e => openRelatedPopup(e, row.id, row.attachments, 'order', state, setState)}>
            <Icon className='file related' />
        </a>
        ) : (
        <Icon className='file non-related' />
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
        bl:
        item.bl && item.bl.length ? (
            <a href='#' onClick={() => downloadAttachment(item.bl[0].name, item.bl[0].id, props, state)}>
            <Icon name='file' className='positive' />
            </a>
        ) : (
            <Icon name='file' className='unknown' />
        ),
        sds:
        item.sds && item.sds.length ? (
            <a href='#' onClick={() => downloadAttachment(item.sds[0].name, item.sds[0].id, props, state)}>
            <Icon name='file' className='positive' />
            </a>
        ) : (
            <Icon name='file' className='unknown' />
        ),
        cofA:
        item.cofA && item.cofA.length ? (
            <a href='#' onClick={() => downloadAttachment(item.cofA[0].name, item.cofA[0].id, props, state)}>
            <Icon name='file' className='positive' />
            </a>
        ) : (
            <>
            {row.rawData.orderStatus === 2 ? (
                <Icon name='file' className='negative' />
            ) : (
                <Icon name='file' className='unknown' />
            )}
            </>
        ),
        related:
        item.attachments && item.attachments.length ? (
            <a href='#' onClick={e => openRelatedPopup(e, row.id, item.attachments, 'item', state, setState)}>
            <Icon className='file related' />
            </a>
        ) : (
            <Icon className='file non-related' />
        ),
        orderTotal: ''
    }))
    }))
}

const openRelatedPopup = (e, id, attachments, type, state, setState) => {
    e.stopPropagation()
    setState({
        ...state,
        openRelatedPopup: true,
        relatedAttachments: attachments,
        relatedPopupType: type
    })
}

const openAccountingPopup = async (orderId, props, state, setState) => {
    setState({ ...state, openModalAccounting: true })
    await props.getAccountingDocuments(orderId)
}

const downloadAttachment = async (documentName, documentId, props, state) => {
    const element = await prepareLinkToAttachment(documentId, props, state)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
}

const prepareLinkToAttachment = async (documentId, props, state) => {
    let downloadedFile = null
    if (state.openModalAccounting) {
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

/**
 * close Popup function used in Orders Component
 * @category Operations
 * @services
 */
export const closePopup = (props, state, setState) => {
    setState({
    ...state,
    attachmentPopup: null,
    openModal: false,
    openRelatedPopup: false,
    openModalAccounting: false
    })
    props.clearAccountingDocuments()
}

/**
 * get Modal Accounting Content function used in Orders Component
 * @category Operations
 * @services
 */
export const getModalAccountingContent = (props, state) => {
    const { orderAccountingDocuments, orderAccountingDocumentsLoading } = props
    const docList = orderAccountingDocuments.map(att => ({
    documentNumber: (
        <Button as='a' onClick={() => downloadAttachment(att.documentNumber, att.id, props, state)}>
        <Icon name='download' />
        {att.documentNumber}
        </Button>
    ),
    type: att.type,
    issuedAt: getSafe(() => <FormattedDate value={att.issuedAt.split('T')[0]} />, 'N/A'),
    issuerCompanyName: att.issuerCompanyName,
    cfPriceTotal: (
        <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
        value={att.cfPriceTotal}
        />
    )
    }))
    return (
    <ProdexGrid
        loading={orderAccountingDocumentsLoading}
        hideSettingsIcon={true}
        tableName='related_orders'
        columns={columnsAccountingDocuments}
        rows={docList}
    />
    )
}

/**
 * get Related Documents Content function used in Orders Component
 * @category Operations
 * @services
 */
export const getRelatedDocumentsContent = (props, state, setState) => {
    const {
        intl: { formatMessage },
        listDocumentTypes,
        documentTypesFetching
    } = props
    let { relatedAttachments, filterDocumentType } = state

    const filteredAttachments =
    filterDocumentType === 0
        ? relatedAttachments
        : relatedAttachments.filter(a => a.documentType.id === filterDocumentType)

    const rowsRelatedDocuments = filteredAttachments.map(att => ({
    id: att.id,
    documentNumber: (
        <Button as='a' onClick={() => downloadAttachment(att.name, att.id, props, state)}>
        {att.name}
        </Button>
    ),
    type: att.documentType.name,
    issuedAt: getSafe(() => <FormattedDate value={att.issuedAt.split('T')[0]} />, 'N/A'),
    issuerCompanyName: 'N/A',
    download: (
        <a href='#' onClick={() => downloadAttachment(att.name, att.id, props, state)}>
        <Icon name='file' className='positive' />
        </a>
    )
    }))
    return (
    <>
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
        </CustomDivAddDocument>
        <ProdexGrid
            loading={state.submitting}
            tableName='related_orders'
            columns={columnsRelatedOrders}
            rows={rowsRelatedDocuments}
        />
    </>
    )
}

const cancelOrder = async (id, props) => {
    const { cancelOrder, datagrid } = props
    try {
        const response = await cancelOrder(id)
        datagrid.updateRow(id, () => response.value.data)
    } catch (err) {
        console.error(err)
    }
}

const getActions = (props, state, setState) => {
    const {
    router,
    intl: { formatMessage }
    } = props

    return [
    {
        text: formatMessage({
            id: 'orders.detail',
            defaultMessage: 'Detail'
        }),
        callback: async row => {
        await props.openOrderDetail(row.rawData)
        await router.push(`/operations/orders/detail/${row.id}`)
        }
    },
    {
        text: formatMessage({
            id: 'orders.accountingDocuments',
            defaultMessage: 'Accounting Documents'
        }),
        disabled: row => row.accountingDocumentsCount === 0,
        callback: row => openAccountingPopup(row.id, props, state, setState)
    },
    {
        text: formatMessage({
            id: 'order.cancelOrder',
            defaultMessage: 'Cancel Order'
        }),
        disabled: row => !row.isCancelable,
        callback: row => cancelOrder(row.id, props)
    }
    ]
}
