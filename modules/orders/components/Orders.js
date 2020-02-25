import React, { Component } from 'react'
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { Modal, Menu, Header, Container, Grid, Icon, Button, Dimmer, Loader, Dropdown } from 'semantic-ui-react'
import styled, { withTheme } from 'styled-components'

import SubMenu from '~/src/components/SubMenu'
import Spinner from '~/src/components/Spinner/Spinner'
import ProdexGrid from '~/components/table'
import { actions } from 'react-redux-form'
import { getSafe } from '~/utils/functions'
import { filterPresets } from '~/modules/filter/constants/filter'
import { currency } from '~/constants/index'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import DocumentsPopup from '~/modules/settings/components/Documents/DocumentManagerPopup'
import Link from 'next/link'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import { UploadCloud } from 'react-feather'

const ButtonsWrapper = styled(Grid)`
  margin-left: -21px !important;
  margin-right: -21px !important;
  margin-bottom: -21px !important;
  border-top: 1px solid #dee2e6;

  > div {
    padding-top: 10px !important;
    padding-bottom: 10px !important;

    button {
      height: 40px !important;
    }
  }
`

const ButtonsWrapperDocuments = styled(Grid)`
  margin-left: -21px !important;
  margin-right: -21px !important;
  margin-bottom: -21px !important;
  border-top: 1px solid #dee2e6;

  > div {
    padding-top: 10px !important;
    padding-bottom: 10px !important;

    button {
      height: 40px !important;
    }
  }
`

const RelatedDocumentsDropdown = styled(Dropdown)`
  z-index: 601 !important;
`

const CustomDivUploadLot = styled.div`
  margin-bottom: 30px !important;
  margin-top: 20px !important;
`

const CustomDivAddDocument = styled.div`
  display: flex;
  justify-content: space-between;
`

const CustomDivLabelDocumentType = styled.div`
  margin-bottom: 8px;
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
        align: 'right'
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
      }
    },
    attachmentPopup: null,
    openModal: false,
    columnsRelatedOrders: [
      {
        name: 'documentNumber',
        title: (
          <FormattedMessage id='order.related.documentNumber' defaultMessage='Document #'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'type',
        title: (
          <FormattedMessage id='order.related.type' defaultMessage='Type'>
            {text => text}
          </FormattedMessage>
        ),
        width: 90
      },
      {
        name: 'issuedAt',
        title: (
          <FormattedMessage id='order.related.issuedAt' defaultMessage='Document Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130
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
        name: 'cfPriceTotal',
        title: (
          <FormattedMessage id='order.related.cfPriceTotal' defaultMessage='Total'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        align: 'right'
      }
    ],
    columnsRelatedOrdersDocuments: [
      {
        name: 'documentName',
        title: (
          <FormattedMessage id='order.related.documents.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200
      },
      {
        name: 'documenType',
        title: (
          <FormattedMessage id='order.related.documents.type' defaultMessage='Type'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200
      },
      {
        name: 'documenDescription',
        title: (
          <FormattedMessage id='order.related.documents.description' defaultMessage='Document Description'>
            {text => text}
          </FormattedMessage>
        ),
        width: 250
      }
    ],
    relatedDocumentsDropdown: '',
    isOpenDocumentsPopup: false,
    documentType: '',
    openUploadLot: false,
    relatedDocumentsTypeDropdown: [],
    documentFiles: []
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

  loadData(endpointType, filterData) {
    this.props.dispatch(actions.change('forms.filter.status', filterData.status))
    this.props.datagrid.loadData(this.state.filters[filterData.status])
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
          <a>{row.id}</a>
        </Link>
      ),
      productName: (
        <ArrayToFirstItem values={row.orderItems.map(d => (d.echoProductName ? d.echoProductName : 'N/A'))} />
      ),
      globalStatus: row.globalStatus === 'Failed' ? this.failedWrapper(row.globalStatus) : row.globalStatus,
      paymentStatus: row.paymentStatus === 'Failed' ? this.failedWrapper(row.paymentStatus) : row.paymentStatus,
      bl: row.bl ? ( // unknown / positive / negative
        <span onClick={() => this.openOverviewWindow(row.bl, { id: row.id })}>
          <Icon name='file' className='positive' />
        </span>
      ) : (
        <Icon name='file' className='unknown' />
      ),
      sds: row.sds ? (
        <span onClick={() => this.openOverviewWindow(row.sds, { id: row.id })}>
          <Icon name='file' className='positive' />
        </span>
      ) : (
        <Icon name='file' className='unknown' />
      ),
      cofA: row.cofA ? (
        <span onClick={() => this.openOverviewWindow(row.cofA, { id: row.id })}>
          <Icon name='file' className='positive' />
        </span>
      ) : (
        <Icon name='file' className='unknown' />
      ),
      related:
        row.accountingDocumentsCount > 0 ? (
          <span onClick={() => this.openModalWindow(row.id)}>
            <Icon className='file related' />
          </span>
        ) : (
          <Icon className='file non-related' />
        )
    }))
  }

  async openModalWindow(orderId) {
    this.setState({ openModal: true })
    await this.props.getRelatedOrders(orderId)
  }

  openOverviewWindow(attachment, order) {
    this.setState({ openModal: true, attachmentPopup: { attachment, order } })
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
    let downloadedFile = await this.props.downloadAttachmentPdf(documentId)
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
    this.setState({ attachmentPopup: null, openModal: false })
    this.props.clearRelatedOrders()
  }

  replaceExiting = row => {
    console.log('replaceExiting')
  }

  handleDelete = row => {
    console.log('handleDelete')
  }
  //TODO
  getAttachmentContent = () => {
    const {
      attachmentPopup: { attachment, order }
    } = this.state
    const {
      intl: { formatMessage }
    } = this.props

    const attachments = attachment && attachment.length ? attachment : [attachment]
    console.log('attachments====================================')
    console.log(attachments)
    console.log('====================================')
    const rowsRelatedOrdersDocuments = attachments.reduce((ordersList, attachment) => {
      if (attachment) {
        ordersList.push({
          documentName: (
            <Button as='a' onClick={() => this.downloadAttachment(attachment.name, attachment.id)}>
              <Icon name='download' />
              {attachment.name}
            </Button>
          ),
          documenType: getSafe(() => attachment.documentType.name, 'N/A'),
          documenDescription: getSafe(() => attachment.description, 'N/A')
        })
      }

      return ordersList
    }, [])
    return (
      <>
        <CustomDivAddDocument>
          <RelatedDocumentsDropdown
            options={[
              {
                key: 1,
                value: 'My TYpe',
                text: 'My Type'
              },
              {
                key: 2,
                value: 'Your Type',
                text: 'Your Type'
              }
            ]}
            value={this.state.relatedDocumentsDropdown}
            selection
            onChange={(event, { name, value }) => {
              this.setState({ [name]: value })
            }}
            name='relatedDocumentsDropdown'
            placeholder={formatMessage({ id: 'related.documents.selectType', defaultMessage: 'Select type' })}
          />
          <Button
            style={{ color: 'white', backgroundColor: '#2599d5', marginRight: '1.6vw' }}
            onClick={() => this.setState({ isOpenDocumentsPopup: true })}
            data-test='related_documents_add_document_btn'>
            <FormattedMessage id='related.documents.addDocument' defaultMessage='Add Document'>
              {text => text}
            </FormattedMessage>
          </Button>
        </CustomDivAddDocument>
        <ProdexGrid
          tableName='related_orders_documents'
          columns={this.state.columnsRelatedOrdersDocuments}
          rows={rowsRelatedOrdersDocuments}
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
                id: 'global.delete',
                defaultMessage: 'Delete'
              }),
              callback: row => this.handleDelete(row)
            }
          ]}
        />
        <ButtonsWrapper>
          <Grid.Column textAlign='right'>
            <Button basic onClick={() => this.closePopup()}>
              <FormattedMessage id='global.close' defaultMessage='Close'>
                {text => text}
              </FormattedMessage>
            </Button>
          </Grid.Column>
        </ButtonsWrapper>
      </>
    )
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
      <>
        <ProdexGrid
          loading={this.state.submitting || loadRelatedOrders}
          hideSettingsIcon={true}
          tableName='related_orders'
          columns={this.state.columnsRelatedOrders}
          rows={rowsRelatedOrders}
        />
        <ButtonsWrapper>
          <Grid.Column textAlign='right'>
            <Button basic onClick={() => this.closePopup()}>
              <FormattedMessage id='global.close' defaultMessage='Close'>
                {text => text}
              </FormattedMessage>
            </Button>
          </Grid.Column>
        </ButtonsWrapper>
      </>
    )
  }
  //TODO
  getDocumentsContent = () => {
    const {
      listDocumentTypes,
      intl: { formatMessage }
    } = this.props
    console.log('listDocumentTypes====================================')
    console.log(listDocumentTypes)
    console.log('====================================')
    return (
      <>
        <CustomDivLabelDocumentType>
          <FormattedMessage id='related.documents.documentType' defaultMessage={'Document Type'} />
        </CustomDivLabelDocumentType>
        <RelatedDocumentsDropdown
          name='documentType'
          closeOnChange
          options={listDocumentTypes}
          value={this.state.documentType}
          selection
          onChange={(event, { name, value }) => {
            this.setState({ [name]: value })
          }}
          placeholder={formatMessage({ id: 'related.documents.selectType', defaultMessage: 'Select type' })}
        />
        <CustomDivUploadLot>
          <UploadLot
            {...this.props}
            edit={getSafe(() => sidebarValues.id, 0)}
            name='documents.attachments'
            type={this.state.documentType}
            attachments={this.state.documentFiles}
            onChange={files => {
              this.setState({ documentFiles: files })
            }}
            fileMaxSize={20}
            data-test='related_document_attachments_drop'
            emptyContent={
              <>
                <UploadCloud size={48} />
                <br />
                {formatMessage({ id: 'addInventory.dragDrop' })}
                <br />
                <FormattedMessage
                  id='addInventory.dragDropOr'
                  defaultMessage={'or {link} to select from computer'}
                  values={{
                    link: (
                      <a>
                        <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                      </a>
                    )
                  }}
                />
              </>
            }
            uploadedContent={
              <label>
                <UploadCloud size={48} />
                <br />
                <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                <br />
                <FormattedMessage
                  id='addInventory.dragDropOr'
                  defaultMessage={'or {link} to select from computer'}
                  values={{
                    link: (
                      <a>
                        <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                      </a>
                    )
                  }}
                />
              </label>
            }
          />
        </CustomDivUploadLot>
        <ButtonsWrapperDocuments>
          <Grid.Column textAlign='right'>
            <Button basic onClick={() => this.setState({ isOpenDocumentsPopup: false })}>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                {text => text}
              </FormattedMessage>
            </Button>
            <Button
              primary
              onClick={() => this.saveRelatedDocuments()}
              style={{ color: 'white', backgroundColor: '#2599d5' }}>
              <FormattedMessage id='global.save' defaultMessage='Save'>
                {text => text}
              </FormattedMessage>
            </Button>
          </Grid.Column>
        </ButtonsWrapperDocuments>
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
      loadRelatedOrders,
      intl: { formatMessage }
    } = this.props

    const { columns, isOpenDocumentsPopup } = this.state
    let ordersType = queryType.charAt(0).toUpperCase() + queryType.slice(1)

    const { attachmentPopup, openModal } = this.state

    return (
      <div id='page' className='flex stretched scrolling'>
        {isOpenDocumentsPopup && (
          <Modal
            size='small'
            closeIcon={false}
            onClose={() => this.setState({ isOpenDocumentsPopup: false })}
            centered={true}
            open={this.state.isOpenDocumentsPopup}>
            <Modal.Header>
              <FormattedMessage id='order.related.documents.add' defaultMessage='ADD DOCUMENTS'>
                {text => text}
              </FormattedMessage>
            </Modal.Header>
            <Modal.Content scrolling>{this.getDocumentsContent()}</Modal.Content>
          </Modal>
        )}
        {openModal && (
          <Modal
            size='small'
            closeIcon={false}
            onClose={() => this.setState({ openModal: false })}
            centered={true}
            open={this.state.openModal}>
            <Modal.Header>
              <FormattedMessage id='order.related.documents.table' defaultMessage='RELATED DOCUMENTS'>
                {text => text}
              </FormattedMessage>
            </Modal.Header>
            <Modal.Content scrolling>{this.getAttachmentContent()}</Modal.Content>
          </Modal>
        )}
        {false && this.props && this.props.relatedOrders && this.props.relatedOrders.length > 0 && (
          <Modal
            size='small'
            closeIcon={false}
            onClose={() => this.setState({ openModal: false })}
            centered={true}
            open={this.state.openModal}>
            <Modal.Header>
              <FormattedMessage id='order.related.table' defaultMessage='Related Accounting Documents'>
                {text => text}
              </FormattedMessage>
            </Modal.Header>
            <Modal.Content scrolling>{this.getContent()}</Modal.Content>
          </Modal>
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
            <Menu.Item>
              <FilterTags datagrid={datagrid} />
            </Menu.Item>
          </Menu>
        </Container>
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
              // onSortingChange={sorting => sorting.sortPath && this.setState({ sorting })}
              rowActions={[
                {
                  text: formatMessage({
                    id: 'orders.detail',
                    defaultMessage: 'Detail'
                  }),
                  callback: row => router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`)
                }
              ]}
              /* COMMENTED #30916
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label' && targetTag !== 'i') {
                router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`)
              }
            }}*/
            />
          )}
        </Container>
      </div>
    )
  }
}

// FilterTags.propTypes = {
//   filter: array,
//   onClick: func,
//   filters: arrayOf(
//     shape({
//       description: string,
//       indexes: arrayOf(number),
//       tagDescription: arrayOf(string),
//       valuesDescription: arrayOf(string)
//     })
//   )
// }

export default injectIntl(Orders)
