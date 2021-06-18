import { FormattedMessage } from 'react-intl'
import moment from 'moment/moment'
import { Icon, Button } from 'semantic-ui-react'
// Components
import ProdexGrid from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
//Services
import { getSafe } from '../../../../utils/functions'
import { getMimeType } from '../../../../components/getMimeType'
import { getLocaleDateFormat } from '../../../../components/date-format'
import confirm from '../../../../components/Confirmable/confirm'
// Styles
import { StyledStatusLabel } from '../../styles'

const StatusLabel = val => (
    <StyledStatusLabel className={val ? 'true' : 'false'}>
      {val ? (
        <FormattedMessage id='global.yes' defaultMessage='Yes' />
      ) : (
        <FormattedMessage id='global.no' defaultMessage='No' />
      )}
    </StyledStatusLabel>
)

/**
 * get Rows function used in CompanyGenericProductsTableContainer
 * @category Operations
 * @services
 */
export const getRows = datagrid => datagrid?.rows?.map(d => {
    const requestedByName = getSafe(() => d.requestedBy.name, null)
    const requestedByCompany = getSafe(() => d.requestedBy.company.cfDisplayName, null)

    return {
        id: d.id,
        rawData: d,
        attachments: d.attachments,
        productName: (
            <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.productName}</div>
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
})

/**
 * columns used in CompanyGenericProductsTable Component
 * @category Operations
 * @services
 */
export const columns = [
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


const markRequestAsProcessed = async (row, props) => {
  const { markRequestAsProcessed, datagrid } = props
  try {
    const { value } = await markRequestAsProcessed(row.id)
    datagrid.updateRow(row.id, () => value)
  } catch (err) {
    console.error(err)
  }
}

const denyRequest = async (row, props) => {
  const { denyRequest, datagrid } = props
  try {
    await denyRequest(row.id)
    datagrid.removeRow(row.id)
  } catch (err) {
    console.error(err)
  }
}

const deleteRequest = async (row, props) => {
  const { deleteRequest, datagrid } = props
  try {
    await deleteRequest(row.id)
    datagrid.removeRow(row.id)
  } catch (err) {
    console.error(err)
  }
}

/**
 * get Rows function used in CompanyGenericProductsTable Component
 * @category Operations
 * @services
 */
export const getRowss = (props, state, setState) => {
  return props.rows.map(row => ({
    ...row,
    processed: <ActionCell row={row} getActions={() => getActions(props)} content={row.processed} />,
    attachments:
      row.attachments && row.attachments.length ? (
        <a href='#' onClick={e => openAttachmentsPopup(e, row.attachments, state, setState)}>
          <Icon className='file related' />
        </a>
      ) : (
        <Icon className='file non-related' />
      )
  }))
}

const getActions = (props) => {
  const { intl } = props

  const { formatMessage } = intl
  return [
    {
      text: formatMessage({ id: 'operations.markRequestAsProcessed', defaultMessage: 'Mark Request as Processed' }),
      callback: row => markRequestAsProcessed(row, props),
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
          denyRequest(row, props)
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
          deleteRequest(row, props)
        })
      },
      hidden: row => !row.rawData.processed
    }
  ]
}

const openAttachmentsPopup = (e, attachments, state, setState) => {
  setState({
    ...state,
    openAttachmentsPopup: true,
    attachments
  })
}

/**
 * close Popup function used in CompanyGenericProductsTable Component
 * @category Operations
 * @services
 */
export const closePopup = (state, setState) => {
  setState({
    ...state,
    openAttachmentsPopup: false,
    attachments: []
  })
}

/**
 * get Attachments Content function used in CompanyGenericProductsTable Component
 * @category Operations
 * @services
 */
export const getAttachmentsContent = (props, state) => {
  const rowsAttachments = state.attachments.map(att => ({
    id: att.id,
    documentNumber: (
      <Button as='a' onClick={() => downloadAttachment(att.name, att.id, props, state)}>
        {att.name}
      </Button>
    ),
    type: att.documentType.name,
    issuedAt: att.createdAt && moment(att.createdAt).format(getLocaleDateFormat()),
    issuerCompanyName: 'N/A',
    download: (
      <a href='#' onClick={() => downloadAttachment(att.name, att.id, props, state)}>
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
