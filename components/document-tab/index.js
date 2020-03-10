import React, { Component } from 'react'
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

import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import ProdexGrid from '~/components/table'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import { AttachmentManager } from '~/modules/attachments'
import confirm from '~/src/components/Confirmable/confirm'
import { UploadCloud, XCircle } from 'react-feather'

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
  width: 428px;
  border-bottom: 1px solid #dee2e6;
  padding-top: 14px;
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
    openUploadLot: false,
    documentType: 1
  }

  attachDocumentsUploadLot = (newDocument, values, setFieldValue, setFieldNameAttachments, changedForm) => {
    const docArray = Array.isArray(newDocument)
      ? uniqueArrayByKey(values.attachments.concat(newDocument), 'id')
      : uniqueArrayByKey(values.attachments.concat([newDocument]), 'id')
    setFieldNameAttachments && setFieldValue(setFieldNameAttachments, docArray)
    if (changedForm) {
      Array.isArray(newDocument) ? changedForm(newDocument) : changedForm([newDocument])
    }
  }

  handleChange = (e, name, value) => {
    this.setState({ openUploadLot: true, documentType: value })
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
      intl: { formatMessage }
    } = this.props

    return (
      <Grid>
        <CustomGridRow>
          <CustomColumnGridDropdown width={8}>
            <FormattedMessage id='global.uploadDocument' defaultMessage='Upload document: '>
              {text => text}
            </FormattedMessage>
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
            <FormattedMessage id='global.existingDocuments' defaultMessage='Existing documents: '>
              {text => text}
            </FormattedMessage>
            <AttachmentManager
              asModal
              returnSelectedRows={rows =>
                this.attachDocumentsUploadLot(rows, values, setFieldValue, setFieldNameAttachments, changedForm)
              }
            />
          </CustomColumnGrid>
          <CustomDivHr />
        </CustomGridRow>
        {this.state.openUploadLot ? (
          <CustomGridRow>
            <GridColumn>
              <UploadLot
                addAttachment={addAttachment}
                loadFile={loadFile}
                header={
                  <DivIcon
                    onClick={() =>
                      this.setState({
                        openUploadLot: false
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
                type={this.state.documentType}
                filesLimit={1}
                fileMaxSize={20}
                onChange={files => {
                  this.attachDocumentsUploadLot(files, values, setFieldValue, setFieldNameAttachments, changedForm)
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
                      <UploadCloud size='40' color={'#f5f5f5'} />
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
                          documentTypeName: row.documentType && row.documentType.name
                        }
                      })
                      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
                  : []
              }
              rowActions={[
                {
                  text: (
                    <FormattedMessage id='global.unlink' defaultMessage='Unlink'>
                      {text => text}
                    </FormattedMessage>
                  ),
                  callback: async row => {
                    try {
                      if (row.linked) {
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

export default withDatagrid(injectIntl(DocumentTab))
