import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProdexGrid from '~/components/table'
import confirm from '~/src/components/Confirmable/confirm'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'

import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import { getLocaleDateFormat } from '~/components/date-format'
import moment from 'moment/moment'
import styled from 'styled-components'
import { Label, Icon, Modal, Button } from 'semantic-ui-react'
import { downloadAttachment } from '~/modules/inventory/actions'

import * as Actions from '../../actions'

const StyledStatusLabel = styled(Label)`
  font-size: 12px !important;
  height: 22px !important;
  font-weight: normal !important;
  font-stretch: normal;
  font-style: normal;
  color: #ffffff !important;
  border-radius: 11px !important;

  padding: 0.3333em 1.16667em 0.16667em 1.16667em !important;

  &.false {
    background-color: #f16844 !important;
  }
  &.true {
    background-color: #84c225 !important;
  }
`

const StyledModal = styled(Modal)`
  > .header {
    padding: 21px 30px !important;
    font-size: 14px !important;
  }

  > .content {
    padding: 30px !important;
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

const StatusLabel = val => (
  <StyledStatusLabel className={val ? 'true' : 'false'}>
    {val ? (
      <FormattedMessage id='global.yes' defaultMessage='Yes' />
    ) : (
      <FormattedMessage id='global.no' defaultMessage='No' />
    )}
  </StyledStatusLabel>
)

class CompanyGenericProductsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'processed',
          title: (
            <FormattedMessage id='global.processed' defaultMessage='Processed'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          align: 'center',
          sortPath: 'CompanyGenericProductRequest.processed',
          actions: this.getActions()
        },
        {
          name: 'requestedAt',
          title: (
            <FormattedMessage id='operations.requestedAt' defaultMessage='Requested At'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProductRequest.createdAt'
        },
        {
          name: 'productName',
          title: (
            <FormattedMessage id='global.productName' defaultMessage='Product Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProductRequest.productName'
        },
        {
          name: 'notes',
          title: (
            <FormattedMessage id='global.notes' defaultMessage='Notes'>
              {text => text}
            </FormattedMessage>
          ),
          width: 250
          //sortPath: 'CompanyProduct.intProductCode'
        },
        {
          name: 'processedAt',
          title: (
            <FormattedMessage id='operations.processedAt' defaultMessage='Processed At'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProductRequest.processedDate'
        },
        {
          name: 'requestedBy',
          title: (
            <FormattedMessage id='operations.requestedBy' defaultMessage='Requested by'>
              {text => text}
            </FormattedMessage>
          ),
          width: 250,
          sortPath: 'CompanyGenericProductRequest.requestedBy.name'
        },
        {
          name: 'attachments',
          title: (
            <FormattedMessage id='global.documents' defaultMessage='Documents'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          align: 'center'
        }
      ],
      columnsAttachments: [
        {
          name: 'documentNumber',
          title: (
            <FormattedMessage id='order.related.documentNumber' defaultMessage='Document #'>
              {text => text}
            </FormattedMessage>
          ),
          width: 250
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
          width: 130
        },
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
      openAttachmentsPopup: false,
      attachments: []
    }
  }

  markRequestAsProcessed = async row => {
    const { markRequestAsProcessed, datagrid } = this.props
    try {
      const { value } = await markRequestAsProcessed(row.id)
      datagrid.updateRow(row.id, () => value)
    } catch (err) {
      console.error(err)
    }
  }

  denyRequest = async row => {
    const { denyRequest, datagrid } = this.props
    try {
      await denyRequest(row.id)
      datagrid.removeRow(row.id)
    } catch (err) {
      console.error(err)
    }
  }

  deleteRequest = async row => {
    const { deleteRequest, datagrid } = this.props
    try {
      await deleteRequest(row.id)
      datagrid.removeRow(row.id)
    } catch (err) {
      console.error(err)
    }
  }

  getRows = () => {
    return this.props.rows.map(row => ({
      ...row,
      attachments:
        row.attachments && row.attachments.length ? (
          <a href='#' onClick={e => this.openAttachmentsPopup(e, row.attachments)}>
            <Icon className='file related' />
          </a>
        ) : (
          <Icon className='file non-related' />
        )
    }))
  }

  getActions = () => {
    const { intl } = this.props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'operations.markRequestAsProcessed', defaultMessage: 'Mark Request as Processed' }),
        callback: row => this.markRequestAsProcessed(row),
        hidden: row => row.rawData.processed
      },
      {
        text: formatMessage({ id: 'operations.denyRequest', defaultMessage: 'Deny Request' }),
        callback: row => {
          confirm(
            formatMessage({
              id: 'confirm.operations.denyRequest.title',
              defaultMessage: 'Deny Create Request?'
            }),
            formatMessage(
              {
                id: 'confirm.operations.denyRequest.content',
                defaultMessage: `Do you really want to deny '${row.rawData.productName}' create request?`
              },
              { name: row.rawData.productName }
            )
          ).then(() => {
            this.denyRequest(row)
          })
        },
        hidden: row => row.rawData.processed
      },
      {
        text: formatMessage({ id: 'operations.deleteRequest', defaultMessage: 'Delete Request' }),
        callback: row => {
          confirm(
            formatMessage({
              id: 'confirm.operations.deleteRequest.title',
              defaultMessage: 'Delete Create Request?'
            }),
            formatMessage(
              {
                id: 'confirm.operations.deleteRequest.content',
                defaultMessage: `Do you really want to delete '${row.rawData.productName}' create request?`
              },
              { name: row.rawData.productName }
            )
          ).then(() => {
            this.deleteRequest(row)
          })
        },
        hidden: row => !row.rawData.processed
      }
    ]
  }

  openAttachmentsPopup(e, attachments) {
    this.setState({
      openAttachmentsPopup: true,
      attachments
    })
  }

  closePopup = () => {
    this.setState({
      openAttachmentsPopup: false,
      attachments: []
    })
  }

  getAttachmentsContent = () => {
    const rowsAttachments = this.state.attachments.map(att => ({
      id: att.id,
      documentNumber: (
        <Button as='a' onClick={() => this.downloadAttachment(att.name, att.id)}>
          {att.name}
        </Button>
      ),
      type: att.documentType.name,
      issuedAt: att.createdAt && moment(att.createdAt).format(getLocaleDateFormat()),
      issuerCompanyName: 'N/A',
      download: (
        <a href='#' onClick={() => this.downloadAttachment(att.name, att.id)}>
          <Icon name='file' className='positive' />
        </a>
      )
    }))

    return (
      <>
        <ProdexGrid
          tableName='operations_company_generic_products_attachments'
          columns={this.state.columnsAttachments}
          rows={rowsAttachments}
        />
      </>
    )
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

  render() {
    const { datagrid, filterValue, loading } = this.props

    let { columns } = this.state

    return (
      <React.Fragment>
        {this.state.openAttachmentsPopup && (
          <StyledModal size='small' closeIcon={false} onClose={this.closePopup} centered={true} open={true}>
            <Modal.Header style={{ textTransform: 'uppercase' }}>
              <FormattedMessage id='operations.attachedDocuments' defaultMessage='Attached Documents'>
                {text => text}
              </FormattedMessage>
            </Modal.Header>
            <Modal.Content scrolling>{this.getAttachmentsContent()}</Modal.Content>
            <Modal.Actions>
              <Button basic onClick={() => this.closePopup()}>
                <FormattedMessage id='global.close' defaultMessage='Close'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </Modal.Actions>
          </StyledModal>
        )}
        <ProdexGrid
          tableName='operations_company_generic_products_create_request'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={this.getRows()}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
          columnActions='processed'
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    filterValue: state.operations.filterValue,
    loading: state.operations.loading,
    rows: datagrid.rows.map(d => {
      const requestedByName = getSafe(() => d.requestedBy.name, null)
      const requestedByCompany = getSafe(() => d.requestedBy.company.cfDisplayName, null)

      return {
        id: d.id,
        rawData: d,
        attachments: d.attachments,
        productName: (
          <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.productName}</div>
        ),
        notes: <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.notes}</div>,
        processed: StatusLabel(d.processed),
        processed2: d.processed ? (
          <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
          <FormattedMessage id='global.no' defaultMessage='No' />
        ),
        processedAt: d.processedAt && moment(d.processedAt).format(getLocaleDateFormat()),
        requestedAt: d.requestedAt && moment(d.requestedAt).format(getLocaleDateFormat()),
        requestedBy: requestedByName
          ? requestedByCompany
            ? requestedByName + ', ' + requestedByCompany
            : requestedByName
          : requestedByCompany
          ? requestedByCompany
          : 'N/A'
      }
    }),
    currentTab: state.operations.currentTab
  }
}

const mapDispatchToProps = {
  ...Actions,
  downloadAttachment
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompanyGenericProductsTable)))
