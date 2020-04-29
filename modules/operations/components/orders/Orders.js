import React, { Component } from 'react'
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { Modal, Menu, Header, Container, Grid, Icon, Button, Dimmer, Loader, Dropdown } from 'semantic-ui-react'
import styled, { withTheme } from 'styled-components'

import SubMenu from '~/src/components/SubMenu'
import Spinner from '~/src/components/Spinner/Spinner'
import ProdexGrid from '~/components/table'
import { actions } from 'react-redux-form'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { filterPresets } from '~/modules/filter/constants/filter'
import { currency } from '~/constants/index'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import DocumentsPopup from '~/modules/settings/components/Documents/DocumentManagerPopup'
import Link from 'next/link'
import { UploadCloud, CheckCircle, PlusCircle } from 'react-feather'
import { handleFiltersValue } from '~/modules/settings/actions'
import { withToastManager } from 'react-toast-notifications'
import { Datagrid } from '~/modules/datagrid/DatagridProvider'
import { AttachmentManager } from '~/modules/attachments'
import { uniqueArrayByKey } from '~/utils/functions'

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
  flex-direction: row-reverse;
  justify-content: space-between;
`

const CustomDivLabelDocumentType = styled.div`
  margin-bottom: 8px;
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

const CustomAddButton = styled(Button)`
  display: flex !important;
  align-items: center !important;
  color: white !important;
  background-color: #2599d5 !important;
  margin-right: 0px !important;
`

const CustomPlusCircle = styled(PlusCircle)`
  margin-right: 10px !important;
  display: flex;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.11;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
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
    attachmentPopup: { attachment: null, order: { id: null } },
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
    expandedRowIds: []
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
        <a
          href='#'
          onClick={() => this.props.openOrderDetail(row.rawData)}
        >
          {row.id}
        </a>
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
        row.attachments && row.attachments.length
          ? (
            <a href='#' onClick={() => this.openRelatedPopup(row.id, row.attachments, 'order')}>
              <Icon className='file related'/>
            </a>
          ) : <Icon className='file non-related' />,
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
        bl: item.bl && item.bl.length
          ? (
            <a
              href='#'
              onClick={() =>
                this.downloadAttachment(item.bl[0].name, item.bl[0].id)
              }>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <Icon name='file' className='unknown' />
        ),
        sds: item.sds && item.sds.length
          ? (
            <a
              href='#'
              onClick={() =>
                this.downloadAttachment(item.sds[0].name, item.sds[0].id)
              }>
              <Icon name='file' className='positive' />
            </a>
          ) : (
            <Icon name='file' className='unknown' />
            ),
        cofA: item.cofA && item.cofA.length
          ? (
            <a
              href='#'
              onClick={() =>
                this.downloadAttachment(item.cofA[0].name, item.cofA[0].id)
              }>
              <Icon name='file' className='negative' />
            </a>
          ) : (
            <Icon name='file' className='unknown' />
            ),
        related: item.attachments && item.attachments.length
          ? (
            <a href='#' onClick={() => this.openRelatedPopup(row.id, item.attachments, 'item')}>
              <Icon className='file related'/>
            </a>
          ) : (
            <Icon className='file non-related' />
            ),
        orderTotal: ''
      }))
    }))
  }

  openRelatedPopup(id, attachments, type) {
    this.setState({
      openRelatedPopup: true,
      relatedId: id,
      relatedAttachments: attachments,
      relatedPopupType: type
    })
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

  closePopup = () => {
    this.setState({ attachmentPopup: null, openModal: false, openRelatedPopup: false })
  }

  handleUnlink = async row => {
    const { unlinkAttachmentToOrder, datagrid } = this.props
    const query = {
      attachmentId: row.id,
      orderId: row.orderId
    }
    try {
      await unlinkAttachmentToOrder(query)
      if (datagrid && datagrid.rows) {
        //This construction is for update all attachments in order
        const rowDatagrid = datagrid.rows.find(r => r.id === row.orderId)
        const attachments =
          rowDatagrid &&
          rowDatagrid.attachments &&
          rowDatagrid.attachments.length &&
          rowDatagrid.attachments.filter(ro => ro.id !== row.id)
        //This construction is for update only in one table. for example in C of A or B/L or SDS
        const attachment =
          rowDatagrid &&
          rowDatagrid.attachments &&
          rowDatagrid.attachments.length &&
          rowDatagrid.attachments.filter(ro => ro.id !== row.id && ro.documentType.name === row.documenType)

        datagrid.updateRow(row && row.orderId, () => ({
          ...rowDatagrid,
          attachments
        }))
        this.setState({
          attachmentPopup: {
            attachment: attachment && attachment.length ? attachment : null,
            order: { id: row.orderId }
          },
          isAddedNewDocument: false,
          isUnlinkDocument: true
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  getRelatedDocumentsContent = () => {
    const {
      intl: { formatMessage }
    } = this.props
    let { relatedId, relatedAttachments, relatedPopupType } = this.state

    const rowsRelatedDocuments = relatedAttachments.map(att => ({
      id: att.id,
      documentNumber: (
        <Button as='a' onClick={() => this.downloadAttachment(att.name, att.id)}>
          {att.name}
        </Button>
      ),
      type: att.documentType.name,
      issuedAt: getSafe(() => <FormattedDate value={order.issuedAt.split('T')[0]} />, 'N/A'),
      issuerCompanyName: 'N/A',
      download:
        <a href='#' onClick={() => this.downloadAttachment(att.name, att.id)}>
          <Icon name='file' className='positive' />
        </a>
    }))
    return (
      <>
        <ProdexGrid
          loading={this.state.submitting}
          tableName='related_orders'
          columns={this.state.columnsRelatedOrders}
          rows={rowsRelatedDocuments}
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

  render() {
    const {
      /*match, rows,*/ isFetching,
      activeStatus,
      router,
      datagrid,
      intl: { formatMessage }
    } = this.props

    const { columns, row, openModal, attachmentPopup, isOpenManager, relatedDocumentType } = this.state

    return (
      <div id='page' className='flex stretched scrolling'>
        {this.state.openRelatedPopup && (
          <Modal
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
          </Modal>
        )}
        <Container fluid className='flex stretched'>
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
              rowActions={[
                {
                  text: formatMessage({
                    id: 'orders.detail',
                    defaultMessage: 'Detail'
                  }),
                  callback: row => this.props.openOrderDetail(row.rawData)
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

export default injectIntl(withToastManager(Orders))
