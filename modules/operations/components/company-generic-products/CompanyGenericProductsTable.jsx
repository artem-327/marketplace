import { Fragment, useState } from 'react'
import ProdexGrid from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import confirm from '../../../../components/Confirmable/confirm'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getLocaleDateFormat } from '../../../../components/date-format'
import moment from 'moment/moment'
import styled from 'styled-components'
import { Icon, Modal, Button } from 'semantic-ui-react'


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


const CompanyGenericProductsTable = props => {
  const columns = [
    {
      name: 'processed',
      title: (
        <FormattedMessage id='global.processed' defaultMessage='Processed' />
      ),
      width: 110,
      align: 'center',
      sortPath: 'CompanyGenericProductRequest.processed',
      allowReordering: false
    },
    {
      name: 'requestedAt',
      title: (
        <FormattedMessage id='operations.requestedAt' defaultMessage='Requested At' />
      ),
      width: 150,
      sortPath: 'CompanyGenericProductRequest.createdAt'
    },
    {
      name: 'productName',
      title: (
        <FormattedMessage id='global.productName' defaultMessage='Product Name' />
      ),
      width: 150,
      sortPath: 'CompanyGenericProductRequest.productName'
    },
    {
      name: 'notes',
      title: (
        <FormattedMessage id='global.notes' defaultMessage='Notes' />
      ),
      width: 250
      //sortPath: 'CompanyProduct.intProductCode'
    },
    {
      name: 'processedAt',
      title: (
        <FormattedMessage id='operations.processedAt' defaultMessage='Processed At' />
      ),
      width: 150,
      sortPath: 'CompanyGenericProductRequest.processedDate'
    },
    {
      name: 'requestedBy',
      title: (
        <FormattedMessage id='operations.requestedBy' defaultMessage='Requested by' />
      ),
      width: 250,
      sortPath: 'CompanyGenericProductRequest.requestedBy.name'
    },
    {
      name: 'attachments',
      title: (
        <FormattedMessage id='global.documents' defaultMessage='Documents' /> 
      ),
      width: 100,
      align: 'center'
    }
  ]

  const columnsAttachments = [
    {
      name: 'documentNumber',
      title: (
        <FormattedMessage id='order.related.documentNumber' defaultMessage='Document #' />
      ),
      width: 250
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
      width: 130
    },
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
    openAttachmentsPopup: false,
    attachments: [],
    openModalAccounting: false
  })

  const markRequestAsProcessed = async row => {
    const { markRequestAsProcessed, datagrid } = props
    try {
      const { value } = await markRequestAsProcessed(row.id)
      datagrid.updateRow(row.id, () => value)
    } catch (err) {
      console.error(err)
    }
  }

  const denyRequest = async row => {
    const { denyRequest, datagrid } = props
    try {
      await denyRequest(row.id)
      datagrid.removeRow(row.id)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteRequest = async row => {
    const { deleteRequest, datagrid } = props
    try {
      await deleteRequest(row.id)
      datagrid.removeRow(row.id)
    } catch (err) {
      console.error(err)
    }
  }

  const getRows = () => {
    return props.rows.map(row => ({
      ...row,
      processed: <ActionCell row={row} getActions={getActions} content={row.processed} />,
      attachments:
        row.attachments && row.attachments.length ? (
          <a href='#' onClick={e => openAttachmentsPopup(e, row.attachments)}>
            <Icon className='file related' />
          </a>
        ) : (
          <Icon className='file non-related' />
        )
    }))
  }

  const getActions = () => {
    const { intl } = props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'operations.markRequestAsProcessed', defaultMessage: 'Mark Request as Processed' }),
        callback: row => markRequestAsProcessed(row),
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
            denyRequest(row)
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
            deleteRequest(row)
          })
        },
        hidden: row => !row.rawData.processed
      }
    ]
  }

  const openAttachmentsPopup = (e, attachments) => {
    setState({
      ...state,
      openAttachmentsPopup: true,
      attachments
    })
  }

  const closePopup = () => {
    setState({
      ...state,
      openAttachmentsPopup: false,
      attachments: []
    })
  }

  const getAttachmentsContent = () => {
    const rowsAttachments = state.attachments.map(att => ({
      id: att.id,
      documentNumber: (
        <Button as='a' onClick={() => downloadAttachment(att.name, att.id)}>
          {att.name}
        </Button>
      ),
      type: att.documentType.name,
      issuedAt: att.createdAt && moment(att.createdAt).format(getLocaleDateFormat()),
      issuerCompanyName: 'N/A',
      download: (
        <a href='#' onClick={() => downloadAttachment(att.name, att.id)}>
          <Icon name='file' className='positive' />
        </a>
      )
    }))

    return (
      <>
        <ProdexGrid
          tableName='operations_company_generic_products_attachments'
          columns={columnsAttachments}
          rows={rowsAttachments}
        />
      </>
    )
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

  const { datagrid, filterValue, loading } = props

  return (
    <Fragment>
      {state.openAttachmentsPopup && (
        <StyledModal size='small' closeIcon={false} onClose={closePopup} centered={true} open={true}>
          <Modal.Header style={{ textTransform: 'uppercase' }}>
            <FormattedMessage id='operations.attachedDocuments' defaultMessage='Attached Documents' />
          </Modal.Header>
          <Modal.Content scrolling>{getAttachmentsContent()}</Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => closePopup()}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}
      <div className='flex stretched listings-wrapper'>
        <ProdexGrid
          tableName='operations_company_generic_products_create_request'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={getRows()}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
        />
      </div>
    </Fragment>
  )
}

export default injectIntl(CompanyGenericProductsTable)
