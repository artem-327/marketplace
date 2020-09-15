import React, { Component } from 'react'
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { Modal, Container, Icon, Button, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import Spinner from '~/src/components/Spinner/Spinner'
import ProdexGrid from '~/components/table'
import { actions } from 'react-redux-form'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { filterPresets } from '~/modules/filter/constants/filter'
import { currency } from '~/constants/index'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import { handleFiltersValue } from '~/modules/settings/actions'
import { withToastManager } from 'react-toast-notifications'
import { Datagrid } from '~/modules/datagrid/DatagridProvider'
import { AttachmentManager } from '~/modules/attachments'
import { uniqueArrayByKey } from '~/utils/functions'
import { ChevronDown, ChevronRight } from 'react-feather'

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

class Orders extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
          sortPath: 'Order.id',
          actions: this.getActionsOrdersList()
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
          sortPath: 'Order.createdAt'
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
      attachmentPopup: { attachment: null, order: { id: null } },
      openModal: false,
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
        }, // ! ! ? seller vs purchaser
        {
          name: 'download',
          title: (
            <FormattedMessage id='global.download' defaultMessage='Download'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          align: 'center'
        }
      ],
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
      openModalAccounting: false
    }
  }

  componentDidMount() {
    const { getDocumentTypes, listDocumentTypes } = this.props
    if (listDocumentTypes && !listDocumentTypes.length) {
      getDocumentTypes()
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

  loadData(filterData) {
    this.props.dispatch(actions.change('forms.filter.status', filterData.status))
    this.props.datagrid.loadData(this.state.filters[filterData.status])
    this.props.loadData(filterData)
  }

  failedWrapper = value => {
    return <span style={{ color: '#DB2828' }}>{value}</span>
  }

  getRows = () => {
    return this.props.rows.map(row => ({
      ...row,
      orderId: (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {this.state.expandedRowIds.some(el => el === row.id) ? (
              <ChevronDown
                size={20}
                style={{ color: '#2599d5', cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation()
                  const expandedRowIds = this.state.expandedRowIds.filter(id => id !== row.id)
                  this.setState({ expandedRowIds })
                }}
              />
            ) : (
              <ChevronRight
                size={20}
                style={{ color: '#2599d5', cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation()
                  let expandedRowIds = this.state.expandedRowIds.slice()
                  expandedRowIds.push(row.id)
                  this.setState({ expandedRowIds })
                }}
              />
            )}
          </div>
          <div>{row.id}</div>
        </div>
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
      related:
        row.attachments && row.attachments.length ? (
          <a href='#' onClick={e => this.openRelatedPopup(e, row.id, row.attachments, 'order')}>
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
            <a href='#' onClick={() => this.downloadAttachment(item.bl[0].name, item.bl[0].id)}>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <Icon name='file' className='unknown' />
          ),
        sds:
          item.sds && item.sds.length ? (
            <a href='#' onClick={() => this.downloadAttachment(item.sds[0].name, item.sds[0].id)}>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <Icon name='file' className='unknown' />
          ),
        cofA:
          item.cofA && item.cofA.length ? (
            <a href='#' onClick={() => this.downloadAttachment(item.cofA[0].name, item.cofA[0].id)}>
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
            <a href='#' onClick={e => this.openRelatedPopup(e, row.id, item.attachments, 'item')}>
              <Icon className='file related' />
            </a>
          ) : (
            <Icon className='file non-related' />
          ),
        orderTotal: ''
      }))
    }))
  }

  openRelatedPopup(e, id, attachments, type) {
    e.stopPropagation()
    this.setState({
      openRelatedPopup: true,
      relatedId: id,
      relatedAttachments: attachments,
      relatedPopupType: type
    })
  }

  async openAccountingPopup(orderId) {
    this.setState({ openModalAccounting: true })
    await this.props.getAccountingDocuments(orderId)
  }

  componentDidUpdate(prevProps) {
    const { datagridFilterUpdate, datagridFilter, datagrid } = this.props

    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter)
    }
  }

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  prepareLinkToAttachment = async documentId => {
    let downloadedFile = null
    if (this.state.openModalAccounting) {
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
      attachmentPopup: null,
      openModal: false,
      openRelatedPopup: false,
      openModalAccounting: false
    })
    this.props.clearAccountingDocuments()
  }

  getModalAccountingContent = () => {
    const { orderAccountingDocuments, orderAccountingDocumentsLoading } = this.props
    const docList = orderAccountingDocuments.map(att => ({
      documentNumber: (
        <Button as='a' onClick={() => this.downloadAttachment(att.documentNumber, att.id)}>
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
        columns={this.state.columnsAccountingDocuments}
        rows={docList}
      />
    )
  }

  getRelatedDocumentsContent = () => {
    const {
      intl: { formatMessage },
      listDocumentTypes,
      documentTypesFetching
    } = this.props
    let { relatedAttachments, filterDocumentType } = this.state

    const filteredAttachments =
      filterDocumentType === 0
        ? relatedAttachments
        : relatedAttachments.filter(a => a.documentType.id === filterDocumentType)

    const rowsRelatedDocuments = filteredAttachments.map(att => ({
      id: att.id,
      documentNumber: (
        <Button as='a' onClick={() => this.downloadAttachment(att.name, att.id)}>
          {att.name}
        </Button>
      ),
      type: att.documentType.name,
      issuedAt: getSafe(() => <FormattedDate value={order.issuedAt.split('T')[0]} />, 'N/A'),
      issuerCompanyName: 'N/A',
      download: (
        <a href='#' onClick={() => this.downloadAttachment(att.name, att.id)}>
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
        </CustomDivAddDocument>
        <ProdexGrid
          loading={this.state.submitting}
          tableName='related_orders'
          columns={this.state.columnsRelatedOrders}
          rows={rowsRelatedDocuments}
        />
      </>
    )
  }

  cancelOrder = async id => {
    const { cancelOrder, datagrid } = this.props
    try {
      const response = await cancelOrder(id)
      datagrid.updateRow(id, () => response.value.data)
    } catch (err) {
      console.error(err)
    }
  }

  getActionsOrdersList = () => {
    const {
      intl: { formatMessage }
    } = this.props

    return [
      {
        text: formatMessage({
          id: 'orders.detail',
          defaultMessage: 'Detail'
        }),
        callback: row => this.props.openOrderDetail(row.rawData)
      },
      {
        text: formatMessage({
          id: 'orders.accountingDocuments',
          defaultMessage: 'Accounting Documents'
        }),
        disabled: row => row.accountingDocumentsCount === 0,
        callback: row => this.openAccountingPopup(row.id)
      },
      {
        text: formatMessage({
          id: 'order.cancelOrder',
          defaultMessage: 'Cancel Order'
        }),
        hidden: row => !row.isCancelable,
        callback: row => this.cancelOrder(row.id)
      }
    ]
  }

  render() {
    const {
      isFetching,
      datagrid,
      intl: { formatMessage },
      orderProcessing
    } = this.props

    const { columns } = this.state

    return (
      <div id='page' className='flex stretched scrolling'>
        {this.state.openModalAccounting && (
          <StyledModal size='small' closeIcon={false} centered={true} open={true}>
            <Modal.Header>
              <FormattedMessage id='order.related.table' defaultMessage='Related Accounting Documents'>
                {text => text}
              </FormattedMessage>
            </Modal.Header>
            <Modal.Content scrolling>{this.getModalAccountingContent()}</Modal.Content>
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
            onClose={() => this.setState({ openRelatedPopup: false })}
            centered={true}
            open={true}>
            <Modal.Header>
              <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS'>
                {text => text}
              </FormattedMessage>
            </Modal.Header>
            <Modal.Content scrolling>{this.getRelatedDocumentsContent()}</Modal.Content>
            <Modal.Actions>
              <Button basic onClick={() => this.closePopup()}>
                <FormattedMessage id='global.close' defaultMessage='Close'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </Modal.Actions>
          </StyledModal>
        )}
        <Container fluid className='flex stretched'>
          {isFetching ? (
            <Spinner />
          ) : (
            <ProdexGrid
              tableName='operations_orders_grid'
              columns={columns}
              {...datagrid.tableProps}
              loading={datagrid.loading || orderProcessing}
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
              columnActions='orderId'
              rowChildActions={[]}
            />
          )}
        </Container>
      </div>
    )
  }
}

export default injectIntl(withToastManager(Orders))
