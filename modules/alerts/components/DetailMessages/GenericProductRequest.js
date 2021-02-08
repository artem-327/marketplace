import { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import * as Actions from '../../actions'
import styled from 'styled-components'
import { FileText } from 'react-feather'
import { downloadAttachment, downloadAttachmentPdf } from '~/modules/inventory/actions'

import { DetailMessage, StyledGrid } from '../layout'

import { Grid, GridRow, GridColumn } from 'semantic-ui-react'

export const DocumentRow = styled(GridRow)`
  padding: 11px 20px 10px 15px;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;

  &.row {
    margin: 2px 0 !important;
  }
`

export const AttachmentsGrid = styled(Grid)`
  width: 100%;
  max-width: 580px;

  &.ui.grid {
    margin: 0;
    padding: 0;
  }
`

class GenericProductRequest extends Component {
  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  prepareLinkToAttachment = async documentId => {
    const downloadedFile = await this.props.downloadAttachment(documentId)
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

  render() {
    const { row } = this.props
    const attachments = getSafe(() => row.info.attachments, [])

    return (
      <DetailMessage>
        <StyledGrid>
          <GridRow>
            <GridColumn width={16}>
              <FormattedMessage
                id='alerts.genericProductTmp'
                defaultMessage='{name} from {company} has requested to upload a new Company Generic Product. Please see the document attached. Once uploaded, click {here} to send a notification to the requester that the upload has been completed.'
                values={{
                  name: <b>{getSafe(() => row.info.requestedBy.name, 'N/A')}</b>,
                  company: <b>{getSafe(() => row.info.requestedBy.company.cfDisplayName, 'N/A')}</b>,
                  here: (
                    <span style={{ color: '#2599d5', cursor: 'pointer' }} onClick={() => {}}>
                      <FormattedMessage id='alerts.here' defaultMessage='here' />
                    </span>
                  )
                }}
              />
            </GridColumn>
          </GridRow>
          <GridRow style={{ paddingBottom: '0' }}>
            <GridColumn width={10}>
              <FormattedMessage id='alerts.attachments' defaultMessage='Attachments:' />
            </GridColumn>
          </GridRow>
          <AttachmentsGrid>
            {attachments.map(att => {
              return (
                <DocumentRow>
                  <GridColumn width={8} style={{ display: 'flex', alignItems: 'center' }}>
                    <FileText size='18' color='#20273a' />
                    <span style={{ marginLeft: '10px' }}>{att.name}</span>
                  </GridColumn>
                  <GridColumn width={3}>{/* file size */}</GridColumn>
                  <GridColumn width={5} onClick={() => this.downloadAttachment(att.name, att.id)}>
                    <div style={{ color: '#2599d5', cursor: 'pointer', float: 'right', marginRight: '15px' }}>
                      <FormattedMessage id='global.download' defaultMessage='Download:' />
                    </div>
                  </GridColumn>
                </DocumentRow>
              )
            })}
          </AttachmentsGrid>
        </StyledGrid>
      </DetailMessage>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, { ...Actions, downloadAttachment, downloadAttachmentPdf })(
  injectIntl(withToastManager(GenericProductRequest))
)
