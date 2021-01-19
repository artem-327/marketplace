import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import {
  Sidebar,
  Segment,
  Dimmer,
  Loader,
  Tab,
  Menu,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Icon,
  Popup,
  FormField,
  Button as ButtonSemantic
} from 'semantic-ui-react'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'
import { withDatagrid } from '~/modules/datagrid'

import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import ProdexGrid from '~/components/table'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import { AttachmentManager } from '~/modules/attachments'
import confirm from '~/components/Confirmable/confirm'
import { UploadCloud, XCircle } from 'react-feather'
import { downloadAttachment, addAttachment } from '~/modules/inventory/actions'

const CustomColumnGridDropdown = styled(GridColumn)`
  z-index: 610 !important;
  white-space: nowrap !important;
`

const CloseIcon = styled(XCircle)`
  position: absolute;
  top: -10px;
  right: -15px;
`

export const DivIcon = styled.div`
  display: block;
  height: 10px;
  position: relative;
`

export const CustomColumnGrid = styled(GridColumn)`
  padding-left: 0 !important;
`

export const CustomDiv = styled.div`
  padding: 1em;
`

export const CustomA = styled.a`
  font-weight: bold;
  color: #2599d5;
`

export const CustomGridRow = styled(GridRow)`
  padding-top: 0 !important;
  justify-content: center !important;
`

export const CustomDivHr = styled.div`
  border-bottom: 1px solid #dee2e6;
`

export const FieldsDiv = styled.div`
  padding-bottom: 5px;
  text-transform: capitalize;
  color: #404040;
`

const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  },
  {
    name: 'documentTypeName',
    title: (
      <FormattedMessage id='global.docType' defaultMessage='Document Type'>
        {text => text}
      </FormattedMessage>
    ),
    width: 168
  }
]

class DocumentTab extends Component {
  state = {
    openUploadAttachment: false,
    documentType: []
  }

  attachDocumentsUploadAttachment = (newDocument, values, setFieldValue, setFieldNameAttachments, changedForm) => {
    const docArray = Array.isArray(newDocument)
      ? uniqueArrayByKey(values.attachments.concat(newDocument), 'id')
      : uniqueArrayByKey(values.attachments.concat([newDocument]), 'id')
    setFieldNameAttachments && setFieldValue(setFieldNameAttachments, docArray)
    if (changedForm) {
      Array.isArray(newDocument) ? changedForm(newDocument) : changedForm([newDocument])
    }
  }

  handleChange = (e, name, value) => {
    this.setState({ openUploadAttachment: true, documentType: [value] })
  }

  componentDidMount() {
    if (this.props.documentTypeIds) this.setState({ documentType: this.props.documentTypeIds })
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

  render() {
    const {
      listDocumentTypes,
      onChangeDropdown,
      values,
      setFieldValue,
      setFieldNameAttachments,
      changedForm,
      idForm,
      removeAttachmentLink,
      removeAttachment,
      addAttachment,
      loadFile,
      dropdownName,
      attachmentFiles,
      removeAttachmentFromUpload,
      intl: { formatMessage },
      lockedFileTypes
    } = this.props

    return (
      <Grid>
        <CustomGridRow>
          <CustomColumnGridDropdown width={8}>
            <FieldsDiv>
              <FormattedMessage id='global.uploadDocument' defaultMessage='Upload document: '>
                {text => text}
              </FormattedMessage>
            </FieldsDiv>
            <Dropdown
              name={dropdownName}
              closeOnChange
              options={listDocumentTypes}
              inputProps={{
                placeholder: <FormattedMessage id='global.documentType.choose' defaultMessage='Choose document type' />,
                onChange: (e, { name, value }) => {
                  this.handleChange(e, name, value)
                }
              }}
            />
          </CustomColumnGridDropdown>

          <CustomColumnGrid width={8}>
            <FieldsDiv>
              <FormattedMessage id='global.existingDocuments' defaultMessage='Existing documents: '>
                {text => text}
              </FormattedMessage>
            </FieldsDiv>
            <AttachmentManager
              documentTypeIds={this.state.documentType}
              lockedFileTypes={lockedFileTypes}
              asModal
              returnSelectedRows={rows =>
                this.attachDocumentsUploadAttachment(rows, values, setFieldValue, setFieldNameAttachments, changedForm)
              }
            />
          </CustomColumnGrid>
        </CustomGridRow>

        <CustomGridRow>
          <GridColumn style={{ paddingTop: '0', paddingBottom: '0' }}>
            <CustomDivHr />
          </GridColumn>
        </CustomGridRow>

        {this.state.openUploadAttachment ? (
          <CustomGridRow>
            <GridColumn>
              <UploadAttachment
                addAttachment={addAttachment}
                loadFile={loadFile}
                header={
                  <DivIcon
                    onClick={() =>
                      this.setState({
                        openUploadAttachment: false
                      })
                    }>
                    <CloseIcon size='16' name='close' color='#dee2e6' />
                  </DivIcon>
                }
                id={'field_input_documents.documentType'}
                hideAttachments
                edit={getSafe(() => idForm, 0)} //sidebarValues.id
                attachments={attachmentFiles}
                name={setFieldNameAttachments}
                type={
                  this.state.documentType.length ? '' + this.state.documentType[0] : '1' /* // ! ! tady ma byt string?*/
                }
                filesLimit={1}
                fileMaxSize={20}
                onChange={files => {
                  this.attachDocumentsUploadAttachment(
                    files,
                    values,
                    setFieldValue,
                    setFieldNameAttachments,
                    changedForm
                  )
                }}
                data-test='new_inventory_attachments_drop'
                emptyContent={
                  <CustomDiv>
                    <div>
                      <UploadCloud size='40' color='#dee2e6' />
                    </div>

                    {formatMessage({ id: 'addInventory.dragDrop' })}
                    <br />

                    <FormattedMessage
                      id='addInventory.dragDropOr'
                      defaultMessage={'or {link} to select from computer'}
                      values={{
                        link: (
                          <CustomA>
                            <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                          </CustomA>
                        )
                      }}
                    />
                  </CustomDiv>
                }
                uploadedContent={
                  <CustomDiv>
                    <div>
                      <UploadCloud size='40' color='#dee2e6' />
                    </div>
                    <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                    <br />
                    <FormattedMessage
                      id='addInventory.dragDropOr'
                      defaultMessage={'or {link} to select from computer'}
                      values={{
                        link: (
                          <CustomA>
                            <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                          </CustomA>
                        )
                      }}
                    />
                  </CustomDiv>
                }
              />
            </GridColumn>
          </CustomGridRow>
        ) : null}
        <CustomGridRow>
          <GridColumn>
            <ProdexGrid
              virtual={false}
              tableName='attachment_documents'
              onTableReady={() => {}}
              columns={columns}
              normalWidth={false}
              rows={
                getSafe(() => values.attachments.length, false)
                  ? values.attachments
                      .map(row => {
                        return {
                          ...row,
                          filename: row.name,
                          name: (
                            <a href='#' onClick={() => this.downloadAttachment(row.name, row.id)}>
                              {row.name}
                            </a>
                          ),
                          documentTypeName: row.documentType && row.documentType.name
                        }
                      })
                      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
                  : []
              }
              rowActions={[
                {
                  text: (
                    <FormattedMessage id='global.download' defaultMessage='Download'>
                      {text => text}
                    </FormattedMessage>
                  ),
                  callback: row => this.downloadAttachment(row.filename, row.id)
                },
                {
                  text: (
                    <FormattedMessage id='global.unlink' defaultMessage='Unlink'>
                      {text => text}
                    </FormattedMessage>
                  ),
                  callback: async row => {
                    try {
                      const unlinkResponse = await removeAttachmentLink(row.id, idForm)
                      if (unlinkResponse.value.data.lastLink) {
                        confirm(
                          formatMessage({
                            id: 'confirm.attachments.delete.title',
                            defaultMessage: 'Delete Attachment'
                          }),
                          formatMessage(
                            {
                              id: 'confirm.attachments.delete.content',
                              defaultMessage: `Do you want to delete file ${row.name}?`
                            },
                            { fileName: row.name }
                          )
                        ).then(
                          async () => {
                            // confirm
                            try {
                              await removeAttachment(row.id)
                            } catch (e) {
                              console.error(e)
                            }
                          },
                          () => {
                            // cancel
                          }
                        )
                      }

                      setFieldValue(
                        setFieldNameAttachments,
                        values.attachments.filter(o => o.id !== row.id)
                      )
                      removeAttachmentFromUpload(row.id)
                    } catch (e) {
                      console.error(e)
                    }
                  }
                }
              ]}
            />
          </GridColumn>
        </CustomGridRow>
      </Grid>
    )
  }
}

export default withDatagrid(connect(null, { downloadAttachment })(injectIntl(DocumentTab)))
