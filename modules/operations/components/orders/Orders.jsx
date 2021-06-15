import { useEffect, useState } from 'react'
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { Modal, Container, Icon, Button, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import Spinner from '../../../../components/Spinner/Spinner'
import ProdexGrid from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import { getSafe } from '../../../../utils/functions'
import { currency } from '../../../../constants/index'
import { ArrayToFirstItem } from '../../../../components/formatted-messages'
import { withToastManager } from 'react-toast-notifications'

import { ChevronDown, ChevronRight } from 'react-feather'
//Hooks
import { usePrevious } from '../../../../hooks'

const StyledModal = styled(Modal)`
  > .header {
    padding: 21px 30px !important;
    font-size: 14px !important;
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

const CustomDivAddDocument = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const RelatedDocumentsDropdown = styled(Dropdown)`
  z-index: 601 !important;
`

const Orders = props => {
  const columns = [
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
  
  const [state, setState] = useState({
    sorting: {
      sortDirection: '',
      sortPath: ''
    },
    attachmentPopup: { attachment: null, order: { id: null } },
    openModal: false,
    relatedDocumentsDropdown: '',
    documentType: '',
    openUploadLot: false,
    relatedDocumentsTypeDropdown: [],
    documentFiles: [],
    isAddedNewDocument: false,
    isOpenManager: false,
    relatedDocumentType: '',
    row: '',
    isUnlinkDocument: false,
    replaceExisting: false,
    replaceRow: '',
    openRelatedPopup: false,
    relatedPopupType: '',
    relatedAttachments: [],
    expandedRowIds: [],
    filterDocumentType: 0,
    openModalAccounting: false,
    submitting: false
  })

  useEffect(() => {
    const { getDocumentTypes, listDocumentTypes } = props
    if (listDocumentTypes && !listDocumentTypes.length) {
      getDocumentTypes()
    }
  }, [])

  const prevDatagridFilterUpdate = usePrevious(props.datagridFilterUpdate)

  useEffect(() => {
    const { datagridFilter, datagrid } = props

    if (typeof prevDatagridFilterUpdate !== 'undefined') {  // To avoid call on 'componentDidMount'
      datagrid.setFilter(datagridFilter)
    }
  }, [props.datagridFilterUpdate])

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

  const failedWrapper = value => {
    return <span style={{ color: '#DB2828' }}>{value}</span>
  }

  const getRows = () => {
    return props.rows.map(row => ({
      ...row,

      orderId: (
        <ActionCell
          row={row}
          getActions={getActions}
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
            row.orderItems.map(d => (d.echoProductName ? d.echoProductName : 'N/A'))
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
          <a href='#' onClick={e => openRelatedPopup(e, row.id, row.attachments, 'order')}>
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
        productName: item.echoProductName ? item.echoProductName : 'N/A',
        orderStatus: '',
        shippingStatus: '',
        reviewStatus: '',
        creditStatus: '',
        paymentStatus: '',
        bl:
          item.bl && item.bl.length ? (
            <a href='#' onClick={() => downloadAttachment(item.bl[0].name, item.bl[0].id)}>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <Icon name='file' className='unknown' />
          ),
        sds:
          item.sds && item.sds.length ? (
            <a href='#' onClick={() => downloadAttachment(item.sds[0].name, item.sds[0].id)}>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <Icon name='file' className='unknown' />
          ),
        cofA:
          item.cofA && item.cofA.length ? (
            <a href='#' onClick={() => downloadAttachment(item.cofA[0].name, item.cofA[0].id)}>
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
            <a href='#' onClick={e => openRelatedPopup(e, row.id, item.attachments, 'item')}>
              <Icon className='file related' />
            </a>
          ) : (
            <Icon className='file non-related' />
          ),
        orderTotal: ''
      }))
    }))
  }

  const openRelatedPopup = (e, id, attachments, type) => {
    e.stopPropagation()
    setState({
      ...state,
      openRelatedPopup: true,
      relatedAttachments: attachments,
      relatedPopupType: type
    })
  }

  const openAccountingPopup = async (orderId) => {
    setState({ ...state, openModalAccounting: true })
    await props.getAccountingDocuments(orderId)
  }

  const downloadAttachment = async (documentName, documentId) => {
    const element = await prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const prepareLinkToAttachment = async documentId => {
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

  const closePopup = () => {
    setState({
      ...state,
      attachmentPopup: null,
      openModal: false,
      openRelatedPopup: false,
      openModalAccounting: false
    })
    props.clearAccountingDocuments()
  }

  const getModalAccountingContent = () => {
    const { orderAccountingDocuments, orderAccountingDocumentsLoading } = props
    const docList = orderAccountingDocuments.map(att => ({
      documentNumber: (
        <Button as='a' onClick={() => downloadAttachment(att.documentNumber, att.id)}>
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

  const getRelatedDocumentsContent = () => {
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
        <Button as='a' onClick={() => downloadAttachment(att.name, att.id)}>
          {att.name}
        </Button>
      ),
      type: att.documentType.name,
      issuedAt: getSafe(() => <FormattedDate value={att.issuedAt.split('T')[0]} />, 'N/A'),
      issuerCompanyName: 'N/A',
      download: (
        <a href='#' onClick={() => downloadAttachment(att.name, att.id)}>
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

  const cancelOrder = async id => {
    const { cancelOrder, datagrid } = props
    try {
      const response = await cancelOrder(id)
      datagrid.updateRow(id, () => response.value.data)
    } catch (err) {
      console.error(err)
    }
  }

  const getActions = () => {
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
        callback: row => openAccountingPopup(row.id)
      },
      {
        text: formatMessage({
          id: 'order.cancelOrder',
          defaultMessage: 'Cancel Order'
        }),
        hidden: row => !row.isCancelable,
        callback: row => cancelOrder(row.id)
      }
    ]
  }

  const {
    isFetching,
    datagrid,
    intl: { formatMessage },
    orderProcessing
  } = props

  return (
    <div id='page' className='flex stretched scrolling'>
      {state.openModalAccounting && (
        <StyledModal size='small' closeIcon={false} centered={true} open={true}>
          <Modal.Header>
            <FormattedMessage id='order.related.table' defaultMessage='Related Accounting Documents' />
          </Modal.Header>
          <Modal.Content scrolling>{getModalAccountingContent()}</Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => closePopup()}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}
      {state.openRelatedPopup && (
        <StyledModal
          size='small'
          closeIcon={false}
          onClose={() => setState({ ...state, openRelatedPopup: false })}
          centered={true}
          open={true}>
          <Modal.Header>
            <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS' />
          </Modal.Header>
          <Modal.Content scrolling>{getRelatedDocumentsContent()}</Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => closePopup()}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}
      <Container fluid className='flex stretched'>
        {isFetching ? (
          <Spinner />
        ) : (
          <div className='flex stretched tree-wrapper'>
            <ProdexGrid
              tableName='operations_orders_grid'
              columns={columns}
              {...datagrid.tableProps}
              loading={datagrid.loading || orderProcessing}
              rows={getRows()}
              treeDataType={true}
              tableTreeColumn={'orderId'}
              getChildRows={(row, rootRows) => {
                return row ? row.orderItems : rootRows
              }}
              onRowClick={(_, row) => {
                if (row.root && row.orderItems.length) {
                  let ids = state.expandedRowIds.slice()
                  if (ids.includes(row.id)) {
                    //ids.filter(id => id === row.id)
                    setState({ ...state, expandedRowIds: ids.filter(id => id !== row.id) })
                  } else {
                    ids.push(row.id)
                    setState({ ...state, expandedRowIds: ids })
                  }
                }
              }}
              expandedRowIds={state.expandedRowIds}
              onExpandedRowIdsChange={expandedRowIds => setState({ ...state, expandedRowIds })}
              rowChildActions={[]}
            />
          </div>
        )}
      </Container>
    </div>
  )
}

export default injectIntl(withToastManager(Orders))
